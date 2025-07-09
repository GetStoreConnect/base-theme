import {
  init,
  formFieldElement,
  showError,
  submitData,
  extractAdditionalFormPayload,
} from './common'
import { apiKey, currency, showWallets, totalPayable } from './form'
import {
  onlyExpressCheckout,
  storeName,
  offerShipping,
  allowedShippingCountries,
  fetchShippingRates,
  formAuthentityToken,
  setShippingRate,
  loadingShippingRates,
  prepareProductCartWithAddToCartData,
  removeWalletsContainer,
  walletsElementExists,
  walletsElementId,
  showWalletsError,
} from './wallets'
import { loadStripe } from '@stripe/stripe-js/pure'
import storePathUrl from '../../theme/store-path-url'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Stripe"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initStripe({ form })
    }
  })
})

function initStripe({ form }) {
  init(form, stripeCreateToken)

  let dedicatedCartProductId = form.dataset.dedicatedCartProductId

  let cardNumberElement
  let stripe
  let elements

  function paymentsUrl() {
    const payload = extractAdditionalFormPayload()

    const url = new URL(form.dataset.paymentsUrl, window.location.origin)
    Object.entries(payload).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
    return url.toString()
  }

  function intentsUrl() {
    return form.dataset.intentsUrl
  }

  function stripeCreateToken(_form) {
    // We're bypassing the form here because we're using Stripe Elements
    stripe
      .createToken(cardNumberElement, { name: formFieldElement('card_name').value })
      .then(stripeResponseHandler)
  }

  function stripeResponseHandler(response) {
    if (response.error) {
      showError(response.error.message)
    } else {
      const token = response.token
      const payload = {
        payment_source: {
          tok_id: token.id,
          last_digits: token.card.last4,
          month: token.card.exp_month,
          year: token.card.exp_year,
        },
      }
      submitData({ payload })
    }
  }

  // If CC form present, initialize Stripe Elements
  async function stripeInitializeElements() {
    if (formFieldElement('card_number')) {
      elements = stripe.elements()

      const root = document.querySelector(':root')
      const computedStyles = getComputedStyle(root)

      const fontSize = computedStyles.getPropertyValue('--sc-font-base').trim()
      const fontFamily = computedStyles.getPropertyValue('--sc-font-family').trim()
      const style = { base: { fontSize, fontFamily } }

      cardNumberElement = elements.create('cardNumber', {
        placeholder: formFieldElement('card_number').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe sc-expand' },
        style,
        disableLink: true,
      })

      cardNumberElement.mount(`#${formFieldElement('card_number').id}`)
      const cardExpiryElement = elements.create('cardExpiry', {
        placeholder: formFieldElement('card_expiry').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe' },
        style,
      })
      cardExpiryElement.mount(`#${formFieldElement('card_expiry').id}`)

      const cardCvcElement = elements.create('cardCvc', {
        placeholder: formFieldElement('card_verification').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe' },
        style,
      })
      cardCvcElement.mount(`#${formFieldElement('card_verification').id}`)
    }
  }

  function handleWalletError({ error, event }) {
    if (error) {
      if (error.message) {
        showWalletsError(error.message)
      } else {
        showWalletsError(JSON.stringify(error))
      }
    }
    if (event) {
      event.reject()
    }
  }

  function stripeInitializeWallets() {
    if (!walletsElementExists()) {
      return
    }

    // Passing StripeElementsOptions; returns StripeElements
    const elements = stripe.elements({
      mode: 'payment',
      amount: Math.round(totalPayable() * 100),
      currency: currency().toLowerCase(),
    })

    const expressCheckoutElement = elements.create('expressCheckout', {
      paymentMethods: {
        applePay: 'auto',
        googlePay: 'always',
        amazonPay: 'auto',
        paypal: 'auto',
        link: 'auto',
      },
      buttonType: {
        applePay: 'check-out',
        googlePay: 'checkout',
      },
      paymentMethodOrder: ['applePay', 'googlePay', 'amazonPay', 'link', 'paypal'],
    })

    expressCheckoutElement.mount(`#${walletsElementId()}`)

    // When user starts wallet process by clicking Buy with Apple Pay or Google Pay button
    //
    // https://docs.stripe.com/js/element/events/on_click?type=expressCheckoutElement
    expressCheckoutElement.on('click', async (event) => {
      const options = {
        business: {
          name: storeName(),
        },
      }

      if (onlyExpressCheckout()) {
        // Collect email address for receipt / default for account creation
        options.emailRequired = true
        options.billingAddressRequired = true

        if (offerShipping()) {
          options.phoneNumberRequired = true
          options.shippingAddressRequired = true

          // Wallet can indicate to customer their country is not valid
          options.allowedShippingCountries = allowedShippingCountries()

          // If shippingAddressRequired is true, then shippingRates is required
          // Show something to indicate we're loading them
          options.shippingRates = loadingShippingRates()
        }

        if (dedicatedCartProductId) {
          const { amount, error } =
            await prepareProductCartWithAddToCartData(dedicatedCartProductId)
          if (error) {
            handleWalletError({ error, event })
            return
          }
          elements.update({ amount })
        }
      }

      event.resolve(options)
    })

    // https://docs.stripe.com/js/elements_object/express_checkout_element_shippingaddresschange_event#express_checkout_element_on_shipping_address_change
    expressCheckoutElement.on('shippingaddresschange', async (event) => {
      const { address } = event
      const { amount, shippingRates, error } = await fetchShippingRates(address)
      if (error) {
        handleWalletError({ error, event })
        return
      }

      // Price might have changed if we adjusted tax applicability
      elements.update({ amount })

      event.resolve({ shippingRates })
    })

    // https://docs.stripe.com/js/elements_object/express_checkout_element_shippingratechange_event
    expressCheckoutElement.on('shippingratechange', async (event) => {
      const { amount, error } = await setShippingRate(event.shippingRate)
      if (error) {
        handleWalletError({ error, event })
        return
      }
      elements.update({ amount })
      event.resolve({})
    })

    // When user finally confirms the wallet payment
    //
    // https://docs.stripe.com/js/elements_object/express_checkout_element_confirm_event
    expressCheckoutElement.on('confirm', async (event) => {
      if (onlyExpressCheckout()) {
        const res = await fetch(storePathUrl(`/express_checkout/carts`), {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            billing_details: event.billingDetails,
            shipping_address: event.shippingAddress,
            shipping_rate: event.shippingRate, // shouldn't have changed since last shippingratechange
            authenticity_token: formAuthentityToken(),
            dedicated_cart_product_id: dedicatedCartProductId,
          }),
        })

        if (!res.ok) {
          const { error } = await res.json()
          if (error) {
            handleWalletError({ error })
            event.paymentFailed({ reason: 'fail' }) // NOTE: there's also 'invalid_shipping_address' but we're not using it
            return
          }
        }
      }

      const clientSecret = await fetchClientSecret()

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // https://docs.stripe.com/js/payment_intents/confirm_payment#confirm_payment_intent-options-confirmParams-return_url
          return_url: paymentsUrl(),
        },
      })

      if (error) {
        handleWalletError({ error })
      } else {
        // Customer is redirected to the callback URL
      }
    })
  }

  // Creates Stripe PaymentIntent and returns client_secret
  async function fetchClientSecret() {
    const res = await fetch(intentsUrl(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })

    const { client_secret: clientSecret } = await res.json()

    return clientSecret
  }

  async function initializeStripe() {
    stripe = await loadStripe(apiKey())

    const tasks = [stripeInitializeElements()]
    if (showWallets()) {
      tasks.push(stripeInitializeWallets())
    }

    await Promise.allSettled(tasks)

    if (!showWallets()) {
      removeWalletsContainer()
    }
  }

  initializeStripe()

  if (window.StoreConnectTestMode === 'enabled') {
    window.testStripeExpressCheckout = async ({ dedicatedProductId, shippingRateId }) => {
      handleWalletError({ error: { message: `put your left foot in` } })
      if (dedicatedProductId) {
        dedicatedCartProductId = dedicatedProductId // shared into common.js

        handleWalletError({
          error: { message: `using dedicated cart product id: ${dedicatedCartProductId}` },
        })

        // On wallet click, we send the 'add-to-cart' form data to the server
        // to create a dedicated cart for the product
        const { amount, error } = await prepareProductCartWithAddToCartData(dedicatedProductId)
        if (error) {
          handleWalletError({ error })
          return
        }
      }

      // Disable the /cart form as it can be accidentally submitted
      document.querySelectorAll('form[action="/cart"]').forEach((form) => {
        form.removeAttribute('action')
      })

      // Simulate shippingaddresschange event
      const address = {
        line1: '123 Test St',
        country: 'AU',
        state: 'QLD',
        postal_code: '4000',
        city: 'Milton',
      }

      handleWalletError({ error: { message: 'starting...' } })

      const { shippingRates, error: error1 } = await fetchShippingRates(address)
      handleWalletError({ error: { message: 'fetched rates' } })
      if (error1) {
        handleWalletError({ error: error1 })
        return
      }

      // Simulate shippingratechange event
      const shippingRate = shippingRateId
        ? shippingRates.find((rate) => rate.id === shippingRateId)
        : shippingRates[0]
      const { amount, error: error2 } = await setShippingRate(shippingRate)
      if (error2) {
        handleWalletError({ error: error2 })
        return
      }

      // Simulate confirm event (payment)
      // https://docs.stripe.com/js/elements_object/express_checkout_element_confirm_event
      const res = await fetch(storePathUrl(`/express_checkout/carts`), {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          authenticity_token: formAuthentityToken(),
          billing_details: {
            name: 'Test User',
            email: 'drnic@getstoreconnect.com',
            address,
          },
          shipping_address: {
            name: 'Test User',
            address,
          },
          shipping_rate: shippingRate,
          dedicated_cart_product_id: dedicatedCartProductId,
        }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        handleWalletError({ error })
        return
      }

      await window.testStripeWalletCallback()
    }

    window.testStripeWalletCallback = async () => {
      const clientSecret = await fetchClientSecret()

      const url = new URL(paymentsUrl())
      url.searchParams.set('payment_intent', clientSecret)
      window.location = url
    }
  }
}
