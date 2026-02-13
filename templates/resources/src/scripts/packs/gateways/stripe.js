import { PaymentForm } from './payment-form'
import { Wallet } from './wallet'
import { loadStripe } from '@stripe/stripe-js/pure'
import fetchWithResponseHandler from '../../theme/utils/fetch'
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
  const paymentForm = new PaymentForm(form, {
    onSubmit: stripeCreateToken,
  })
  const wallet = new Wallet(paymentForm)

  let cardNumberElement
  let stripe
  let elements

  function paymentsUrl() {
    const payload = paymentForm.extractAdditionalFormPayload()

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
      .createToken(cardNumberElement, { name: paymentForm.getFieldValue('card_name') })
      .then(stripeResponseHandler)
  }

  function stripeResponseHandler(response) {
    if (response.error) {
      paymentForm.showError(response.error.message)
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
      paymentForm.submitData({ payload })
    }
  }

  // If CC form present, initialize Stripe Elements
  async function stripeInitializeElements() {
    if (paymentForm.formFieldElement('card_number')) {
      elements = stripe.elements()

      const root = document.querySelector(':root')
      const computedStyles = getComputedStyle(root)

      const fontSize = computedStyles.getPropertyValue('--sc-font-base').trim()
      const fontFamily = computedStyles.getPropertyValue('--sc-font-family').trim()
      const style = { base: { fontSize, fontFamily } }

      cardNumberElement = elements.create('cardNumber', {
        placeholder: paymentForm.formFieldElement('card_number').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe sc-expand' },
        style,
        disableLink: true,
      })

      cardNumberElement.mount(`#${paymentForm.formFieldElement('card_number').id}`)
      const cardExpiryElement = elements.create('cardExpiry', {
        placeholder: paymentForm.formFieldElement('card_expiry').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe' },
        style,
      })
      cardExpiryElement.mount(`#${paymentForm.formFieldElement('card_expiry').id}`)

      const cardCvcElement = elements.create('cardCvc', {
        placeholder: paymentForm.formFieldElement('card_verification').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe' },
        style,
      })
      cardCvcElement.mount(`#${paymentForm.formFieldElement('card_verification').id}`)
    }
  }

  function handleWalletError({ error, event }) {
    if (error) {
      if (error.message) {
        wallet.showWalletsError(error.message)
      } else {
        wallet.showWalletsError(JSON.stringify(error))
      }
    }
    if (event) {
      event.reject()
    }
  }

  function stripeInitializeWallets() {
    if (!wallet.walletsElementExists()) {
      return
    }

    // Passing StripeElementsOptions; returns StripeElements
    const elements = stripe.elements({
      mode: 'payment',
      amount: Math.round(paymentForm.totalPayable() * 100),
      currency: paymentForm.currency().toLowerCase(),
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

    expressCheckoutElement.mount(`#${wallet.walletsElementId()}`)

    // When user starts wallet process by clicking Buy with Apple Pay or Google Pay button
    //
    // https://docs.stripe.com/js/element/events/on_click?type=expressCheckoutElement
    expressCheckoutElement.on('click', async (event) => {
      const options = {
        business: {
          name: paymentForm.storeName(),
        },
      }

      if (paymentForm.onlyExpressCheckout()) {
        // Collect email address for receipt / default for account creation
        options.emailRequired = true
        options.billingAddressRequired = true

        if (paymentForm.requiresContactInfo()) {
          // Collect phone and shipping address for customer information
          options.phoneNumberRequired = true
          options.shippingAddressRequired = true

          if (paymentForm.offerShipping()) {
            // For physical products, setup shipping rates
            // Wallet can indicate to customer their country is not valid
            options.allowedShippingCountries = paymentForm.allowedShippingCountries()

            // If shippingAddressRequired is true, then shippingRates is required
            // Show something to indicate we're loading them
            options.shippingRates = wallet.loadingShippingRates()
          } else {
            // For virtual products, provide a $0 dummy rate to collect address for contact info
            options.shippingRates = [
              {
                id: 'virtual-product-no-shipping',
                displayName: paymentForm.i18n('wallets.no_shipping_required'),
                amount: 0,
              },
            ]
          }
        }

        if (paymentForm.dedicatedCartProductId) {
          const { amount, didError } = await wallet.prepareProductCartWithAddToCartData()
          if (didError) {
            event.reject()
            return
          }
          elements.update({ amount })
        }
      }

      event.resolve(options)
    })

    // https://docs.stripe.com/js/elements_object/express_checkout_element_shippingaddresschange_event#express_checkout_element_on_shipping_address_change
    expressCheckoutElement.on('shippingaddresschange', async (event) => {
      // For virtual products, just validate the address without fetching shipping rates
      if (!paymentForm.offerShipping()) {
        const amount = Math.round(paymentForm.totalPayable() * 100)
        elements.update({ amount })
        event.resolve({
          shippingRates: [
            {
              id: 'virtual-product-no-shipping',
              displayName: paymentForm.i18n('wallets.no_shipping_required'),
              amount: 0,
            },
          ],
          selectedShippingRate: { id: 'virtual-product-no-shipping' },
        })
        return
      }

      const { address } = event
      const { amount, shippingRates, defaultShippingRateId, error } =
        await wallet.fetchShippingRates(address)
      if (error) {
        handleWalletError({ error, event })
        return
      }

      // Get the full cart total including default shipping rate
      const defaultRate = shippingRates.find((rate) => rate.id === defaultShippingRateId)
      let finalAmount = amount
      if (defaultRate) {
        const { amount: updatedAmount, error: setRateError } =
          await wallet.setShippingRate(defaultRate)
        if (!setRateError) {
          finalAmount = updatedAmount
        }
      }

      // Update the element with the final amount including shipping
      elements.update({ amount: finalAmount })

      // Resolve with the shipping rates
      event.resolve({
        shippingRates,
        selectedShippingRate: { id: defaultShippingRateId },
      })
    })

    // https://docs.stripe.com/js/elements_object/express_checkout_element_shippingratechange_event
    expressCheckoutElement.on('shippingratechange', async (event) => {
      const { amount, error } = await wallet.setShippingRate(event.shippingRate)
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
      if (paymentForm.onlyExpressCheckout()) {
        try {
          await fetchWithResponseHandler(storePathUrl(`/express_checkout/carts`), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              billing_details: event.billingDetails,
              shipping_address: event.shippingAddress,
              shipping_rate: event.shippingRate, // shouldn't have changed since last shippingratechange
              dedicated_cart_product_id: paymentForm.dedicatedCartProductId,
            }),
          })
        } catch (error) {
          handleWalletError({ error })
          event.paymentFailed({ reason: 'fail' }) // NOTE: there's also 'invalid_shipping_address' but we're not using it
          return
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
    stripe = await loadStripe(paymentForm.apiKey())

    const tasks = [stripeInitializeElements()]
    if (paymentForm.showWallets()) {
      tasks.push(stripeInitializeWallets())
    }

    await Promise.allSettled(tasks)

    if (!paymentForm.showWallets()) {
      wallet.removeWalletsContainer()
    }
  }

  initializeStripe()

  if (window.StoreConnectTestMode === 'enabled') {
    window.testStripeExpressCheckout = async ({ dedicatedProductId, shippingRateId }) => {
      handleWalletError({ error: { message: `put your left foot in` } })
      if (dedicatedProductId) {
        paymentForm.dedicatedCartProductId = dedicatedProductId

        handleWalletError({
          error: {
            message: `using dedicated cart product id: ${paymentForm.dedicatedCartProductId}`,
          },
        })

        // On wallet click, we send the 'add-to-cart' form data to the server
        // to create a dedicated cart for the product
        const { didError } = await wallet.prepareProductCartWithAddToCartData()
        if (didError) {
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

      const {
        shippingRates,
        defaultShippingRateId,
        error: error1,
      } = await wallet.fetchShippingRates(address)
      handleWalletError({ error: { message: 'fetched rates' } })
      if (error1) {
        handleWalletError({ error: error1 })
        return
      }

      // Simulate shippingratechange event (or use default from shippingaddresschange)
      // Priority: 1) Test-provided shippingRateId, 2) Backend default, 3) First rate
      const shippingRate = shippingRateId
        ? shippingRates.find((rate) => rate.id === shippingRateId)
        : shippingRates.find((rate) => rate.id === defaultShippingRateId) || shippingRates[0]
      const { error: error2 } = await wallet.setShippingRate(shippingRate)
      if (error2) {
        handleWalletError({ error: error2 })
        return
      }

      // Simulate confirm event (payment)
      // https://docs.stripe.com/js/elements_object/express_checkout_element_confirm_event
      try {
        await fetchWithResponseHandler(storePathUrl(`/express_checkout/carts`), {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
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
            dedicated_cart_product_id: paymentForm.dedicatedCartProductId,
          }),
        })
      } catch (error) {
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
