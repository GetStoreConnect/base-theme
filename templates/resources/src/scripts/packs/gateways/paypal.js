import { PaymentForm } from './payment-form'
import { loadScript } from '@paypal/paypal-js'
import { onDomChange } from '../../theme/utils/init'
import { Fastlane } from './fastlane'
import { FastlaneCheckout } from './fastlane-checkout'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Paypal"]')
  forms.forEach((form) => {
    initPaypal({ form })
  })
})

function initPaypal({ form }) {
  const paymentForm = new PaymentForm(form, {
    setPayButtonCallback: (payButton, enabled) => setPayButton(payButton, enabled, paymentForm),
    legacySubmitElementId: `PaypalPaymentButton`,
  })

  function setPayButton(payButton, enabled, paymentForm) {
    if (payButton) {
      if (enabled) {
        payButton.classList.add('sc-hide')
        paymentForm.submitElement().classList.remove('sc-hide')
      } else {
        payButton.classList.remove('sc-hide')
        paymentForm.submitElement().classList.add('sc-hide')
      }
    }
  }

  // The cart express placement renders no Buttons container: Fastlane is the
  // only PayPal flow offered from the cart.
  const onlyExpressCheckout = paymentForm.onlyExpressCheckout()
  let buttonContainer = null
  if (!onlyExpressCheckout) {
    buttonContainer = paymentForm.refElement('paypal-button-container', {
      legacyId: `paypal-button-container${paymentForm.providerId}`,
      required: false,
    })
    if (!buttonContainer) {
      paymentForm.reportError('paypal-button-container element not found in template')
      return
    }
  }

  const scriptOptions = { clientId: paymentForm.apiKey(), currency: paymentForm.currency() }
  // Fastlane needs both the merchant flag and a client token; without a token
  // we fall back to the standard Buttons flow.
  const useFastlane = paymentForm.fastlaneEnabled() && Boolean(paymentForm.sdkClientToken())
  if (useFastlane) {
    scriptOptions.components = 'buttons,fastlane'
    scriptOptions.dataSdkClientToken = paymentForm.sdkClientToken()
    // Fastlane's sandbox capabilities are only served from the sandbox SDK
    // host; www.paypal.com silently degrades it even with a valid token.
    if (!paymentForm.isProduction()) {
      scriptOptions.environment = 'sandbox'
    }
  }
  // The cart has no Buttons fallback, so an unusable Fastlane hides the whole
  // provider container rather than leaving a dead email field behind.
  if (onlyExpressCheckout && !useFastlane) {
    paymentForm.containerElement()?.classList.add('sc-hide')
    return
  }

  loadScript(scriptOptions)
    .then((paypal) => {
      if (!onlyExpressCheckout) {
        paypal
          .Buttons({
            style: { layout: 'horizontal' },
            createOrder: function () {
              return fetch(paymentForm.paymentSessionUrl(), {
                method: 'post',
                headers: {
                  'content-type': 'application/json',
                },
              })
                .then(function (res) {
                  return res.json()
                })
                .then(function (data) {
                  if (data.message) {
                    paymentForm.showError(data.message)
                  }
                  return data.id
                })
            },
            onApprove: function (data, _actions) {
              const payload = {
                payment_source: {
                  tok_id: data.orderID,
                },
              }
              paymentForm.submitData({ payload })
            },
            onError: function (err) {
              // false is passed to showError not to replace existing error message if any
              paymentForm.showError(err, { replace: false })
            },
          })
          .render(`#${buttonContainer.id}`)
          .catch((error) => {
            console.error('failed to render the PayPal Buttons', error)
          })
      }

      if (useFastlane) {
        // Expose a Fastlane instance for the page to drive; no UI is rendered here.
        const sdkOptions = {}
        const allowedLocations = paymentForm.allowedShippingCountries()
        if (allowedLocations.length > 0) {
          sdkOptions.shippingAddressOptions = { allowedLocations }
        }
        const fastlane = new Fastlane(paymentForm, paypal, sdkOptions)
        paymentForm.fastlane = fastlane
        form._fastlane = fastlane

        // An init failure needs no cleanup at checkout, where Buttons is the
        // fallback; the cart has none, so it hides the section instead.
        if (FastlaneCheckout.containersPresent(paymentForm)) {
          new FastlaneCheckout(paymentForm, fastlane).init().catch((error) => {
            paymentForm.reportError(error, { fastlane: 'init' })
            if (onlyExpressCheckout) paymentForm.containerElement()?.classList.add('sc-hide')
          })
        }
      }
    })
    .catch((error) => {
      console.error('failed to load the PayPal JS SDK script', error)
      if (onlyExpressCheckout) paymentForm.containerElement()?.classList.add('sc-hide')
    })
}
