import { PaymentForm } from './payment-form'
import { Wallet } from './wallet'
import { onDomChange } from '../../theme/utils/init'
import storePathUrl from '../../theme/store-path-url'
import fetchWithResponseHandler from '../../theme/utils/fetch'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Afterpay"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initAfterpay({ form, providerId })
    }
  })
})

function initAfterpay({ form, providerId }) {
  const paymentForm = new PaymentForm(form)
  const wallet = new Wallet(paymentForm)
  const countryCode = form.dataset.countryCode || 'AU'

  // Helper function to build callback URL with additional params
  const buildCallbackUrl = (additionalParams = {}) => {
    const params = {
      popupOriginUrl: window.location.href,
      ...additionalParams,
    }

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')

    return `${paymentForm.callbackUrl()}&${queryString}`
  }

  // Determine the Afterpay SDK URL based on environment
  const afterpayUrl = paymentForm.isProduction()
    ? 'https://portal.afterpay.com/afterpay.js'
    : 'https://portal.sandbox.afterpay.com/afterpay.js'

  // Load the Afterpay SDK
  paymentForm.loadScript({
    url: afterpayUrl,
    onload: function () {
      // Check if this is express checkout mode
      const isExpressCheckout = paymentForm.onlyExpressCheckout()

      if (isExpressCheckout) {
        initializeExpressCheckout({ paymentForm, wallet, countryCode, buildCallbackUrl })
      } else {
        initializePopupCheckout({ paymentForm, form, providerId, countryCode, buildCallbackUrl })
      }
    },
  })
}

function initializePopupCheckout({ paymentForm, form, providerId, countryCode, buildCallbackUrl }) {
  const buttonId = `#AfterpayPaymentButton${providerId}`
  const button = form.querySelector(buttonId)

  if (!button) {
    console.error(`Afterpay button not found: ${buttonId}`)
    return
  }

  AfterPay.initializeForPopup({
    countryCode,
    target: buttonId,
    onCommenceCheckout: async function (actions) {
      // Fetch the Afterpay token from our server
      paymentForm.hideError()

      try {
        const url = buildCallbackUrl()
        const result = await fetchWithResponseHandler(url, {
          method: 'POST',
        })

        if (result.message) {
          paymentForm.showError(result.message)
          actions.reject()
        } else if (result.token) {
          // Cache form params before opening popup
          paymentForm.cacheFormParamsAndOnSubmit(() => {
            // Resolve with the token to open the Afterpay popup
            actions.resolve(result.token)
          })
        } else {
          paymentForm.showError('Failed to create Afterpay checkout. Please try again.')
          actions.reject()
        }
      } catch (error) {
        console.error('Afterpay error:', error)
        paymentForm.showError('Something went wrong. Please try again.')
        actions.reject()
      }
    },
    onComplete: function (event) {
      // Handle the completion of the Afterpay popup
      if (event.data.status === 'SUCCESS') {
        // User approved the payment, submit to our server
        const payload = {
          payment_source: {
            orderToken: event.data.orderToken,
            status: event.data.status,
          },
        }
        paymentForm.submitData({ payload })
      } else {
        // User cancelled or there was an error
        paymentForm.showError('Payment was cancelled or failed. Please try again.')
      }
    },
  })
}

function initializeExpressCheckout({ paymentForm, wallet, countryCode, buildCallbackUrl }) {
  // Find the Afterpay Express button in the template
  const walletsElement = wallet.walletsElement()

  const button = walletsElement?.querySelector('[data-ref="express-checkout"]')

  if (!button) {
    console.error('Afterpay Express: express-checkout button not found')
    return
  }

  // Get button ID for target parameter
  const target = button.id ? `#${button.id}` : '[data-ref="express-checkout"]'

  // Track whether we've already shown an error in onCommenceCheckout
  let commenceCheckoutFailed = false
  // Store the selected shipping rate ID to use in onComplete
  let selectedShippingRateId = null

  const addressMode = paymentForm.offerShipping() ? 'ADDRESS_WITH_SHIPPING_OPTIONS' : 'NO_ADDRESS'

  // Initialize Afterpay with integrated shipping - SDK will handle button clicks
  const config = {
    countryCode,
    target,
    addressMode,
    buyNow: true,
    onCommenceCheckout: async function (actions) {
      paymentForm.hideError()
      commenceCheckoutFailed = false

      try {
        // If product page express checkout, prepare dedicated cart
        if (paymentForm.dedicatedCartProductId) {
          const result = await wallet.prepareProductCartWithAddToCartData(
            paymentForm.dedicatedCartProductId
          )
          if (result.error) {
            console.error('[Afterpay Express] prepareProductCart error:', result.error)
            wallet.showWalletsError(result.error.message)
            commenceCheckoutFailed = true
            actions.reject()
            return
          }
        }

        const url = buildCallbackUrl({
          mode: 'express',
        })
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': Rails.csrfToken(),
          },
        })

        const result = await res.json()

        if (result.message) {
          console.error('[Afterpay Express] Error message:', result.message)
          commenceCheckoutFailed = true
          actions.reject()
          wallet.showWalletsError(result.message)
          AfterPay.close()
        } else if (result.token) {
          actions.resolve(result.token)
        } else {
          console.error('[Afterpay Express] No token received')
          commenceCheckoutFailed = true
          actions.reject()
          wallet.showWalletsError('Failed to create Afterpay checkout. Please try again.')
          AfterPay.close()
        }
      } catch (error) {
        console.error('[Afterpay Express] Exception in onCommenceCheckout:', error)
        commenceCheckoutFailed = true
        actions.reject()
        wallet.showWalletsError('Something went wrong. Please try again.')
        AfterPay.close()
      }
    },
    onShippingAddressChange: async function (data, actions) {
      if (!paymentForm.offerShipping()) {
        // No shipping required (e.g., digital products or click & collect)
        actions.resolve([])
        return
      }

      try {
        // Fetch shipping rates for the selected address
        const result = await wallet.fetchShippingRates({
          country: data.countryCode,
          postal_code: data.postcode,
          city: data.suburb,
          state: data.state,
          street: data.address1,
        })

        if (result.error) {
          console.error('[Afterpay Express] Shipping rates error:', result.error)
          // Reject if shipping not available to this address
          actions.reject(AfterPay.CONSTANTS.SHIPPING_UNSUPPORTED)
          return
        }

        // Convert our shipping rates to Afterpay format
        const shippingOptions = result.shippingRates.map((rate) => ({
          id: rate.id,
          name: rate.displayName,
          description: rate.deliveryEstimate || '',
          shippingAmount: {
            amount: (rate.amount / 100).toFixed(2),
            currency: paymentForm.currency(),
          },
          orderAmount: {
            amount: (result.amount / 100).toFixed(2),
            currency: paymentForm.currency(),
          },
        }))

        actions.resolve(shippingOptions)
      } catch (error) {
        console.error('[Afterpay Express] Exception in onShippingAddressChange:', error)
        actions.reject(AfterPay.CONSTANTS.SHIPPING_UNSUPPORTED)
      }
    },
    onShippingOptionChange: async function (data, actions) {
      try {
        // Store the selected shipping rate ID for use in onComplete
        selectedShippingRateId = data.id || data.shippingOptionId
        const result = await wallet.setShippingRate({ id: selectedShippingRateId })

        if (result.error) {
          console.error('[Afterpay Express] Set shipping rate error:', result.error)
          wallet.showWalletsError(result.error.message)
          actions.reject()
          return
        }

        // Use the updated cart amount from the server instead of the original orderAmount
        const updatedOrderAmount = {
          amount: (result.amount / 100).toFixed(2),
          currency: data.orderAmount.currency,
        }

        // Return complete response with updated order amount from server
        const response = {
          id: data.id,
          shippingAmount: data.shippingAmount,
          taxAmount: {
            amount: '0.00', // TODO: Calculate tax if needed
            currency: updatedOrderAmount.currency,
          },
          orderAmount: updatedOrderAmount,
        }

        actions.resolve(response)
      } catch (error) {
        console.error('[Afterpay Express] Exception in onShippingOptionChange:', error)
        actions.reject()
      }
    },
    onComplete: async function (event) {
      if (event.data.status === 'SUCCESS') {
        // Reset the flag on success
        commenceCheckoutFailed = false
        try {
          const orderInfo = event.data.orderInfo || {}
          const consumer = orderInfo.consumer || {}
          const shippingAddress = orderInfo.shippingAddress || {}

          // Create/update cart with billing and shipping information from Afterpay
          const payload = {
            billing_details: {
              name:
                consumer.givenNames && consumer.surname
                  ? `${consumer.givenNames} ${consumer.surname}`
                  : 'Not provided',
              email: consumer.email || '',
              phone: shippingAddress.phoneNumber || '',
              address: {
                line1: shippingAddress.line1 || '',
                line2: shippingAddress.line2 || '',
                city: shippingAddress.area1 || '',
                state: shippingAddress.region || '',
                postal_code: shippingAddress.postcode || '',
                country: shippingAddress.countryCode || '',
              },
            },
            shipping_address: {
              name: shippingAddress.name || 'Not provided',
              address: {
                line1: shippingAddress.line1 || '',
                line2: shippingAddress.line2 || '',
                city: shippingAddress.area1 || '',
                state: shippingAddress.region || '',
                postal_code: shippingAddress.postcode || '',
                country: shippingAddress.countryCode || '',
              },
            },
            shipping_rate: { id: selectedShippingRateId },
            authenticity_token: paymentForm.formAuthentityToken(),
            dedicated_cart_product_id: paymentForm.dedicatedCartProductId,
          }

          const res = await fetch(storePathUrl(`/express_checkout/carts`), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
          })

          if (!res.ok) {
            const { error } = await res.json()
            console.error('[Afterpay Express] Cart creation error:', error)
            if (error) {
              wallet.showWalletsError(error.message)
              return
            }
          }

          // Submit payment to our server
          paymentForm.submitData({
            payload: {
              payment_source: {
                orderToken: event.data.orderToken,
                status: event.data.status,
              },
              mode: 'express',
              dedicated_cart_product_id: paymentForm.dedicatedCartProductId,
            },
          })
        } catch (error) {
          console.error('[Afterpay Express] Exception in onComplete:', error)
          wallet.showWalletsError('Payment processing failed. Please try again.')
        }
      } else {
        // Only show error if we haven't already shown one in onCommenceCheckout
        if (!commenceCheckoutFailed) {
          console.log('[Afterpay Express] Payment not successful, status:', event.data.status)
          wallet.showWalletsError('Payment was cancelled or failed. Please try again.')
        }
      }
    },
  }

  AfterPay.initializeForPopup(config)
}
