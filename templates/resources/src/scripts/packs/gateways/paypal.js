import { init, prepareSubmit, showError, submitData, submitElement } from './common'
import { apiKey, callbackUrl, currency } from './form'
import { loadScript } from '@paypal/paypal-js'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Paypal"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initPaypal({ form, providerId })
    }
  })
})

function initPaypal({ form, providerId }) {
  init(form, null, setPayButton)

  function setPayButton(payButton, enabled) {
    if (payButton) {
      if (enabled) {
        payButton.classList.add('sc-hide')
        submitElement().classList.remove('sc-hide')
      } else {
        payButton.classList.remove('sc-hide')
        submitElement().classList.add('sc-hide')
      }
    }
  }

  loadScript({ clientId: apiKey(), currency: currency() })
    .then((paypal) => {
      paypal
        .Buttons({
          style: { layout: 'horizontal' },
          createOrder: function () {
            const SETEC_URL = callbackUrl()

            return fetch(SETEC_URL, {
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
                  showError(data.message)
                }
                return data.id
              })
          },
          onApprove: function (data, _actions) {
            prepareSubmit(() => {
              const payload = {
                payment_source: {
                  tok_id: data.orderID,
                },
              }
              submitData({ payload })
            })
          },
          onError: function (err) {
            // false is passed to showError not to replace existing error message if any
            showError(err, { replace: false })
          },
        })
        .render(`#paypal-button-container${providerId}`)
        .catch((error) => {
          console.error('failed to render the PayPal Buttons', error)
        })
    })
    .catch((error) => {
      console.error('failed to load the PayPal JS SDK script', error)
    })
}
