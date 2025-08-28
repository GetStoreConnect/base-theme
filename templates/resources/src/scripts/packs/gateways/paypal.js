import { PaymentForm } from './payment-form'
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
  const paymentForm = new PaymentForm(form, {
    setPayButtonCallback: (payButton, enabled) => setPayButton(payButton, enabled, paymentForm),
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

  loadScript({ clientId: paymentForm.apiKey(), currency: paymentForm.currency() })
    .then((paypal) => {
      paypal
        .Buttons({
          style: { layout: 'horizontal' },
          createOrder: function () {
            const SETEC_URL = paymentForm.callbackUrl()

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
                  paymentForm.showError(data.message)
                }
                return data.id
              })
          },
          onApprove: function (data, _actions) {
            paymentForm.prepareSubmit(() => {
              const payload = {
                payment_source: {
                  tok_id: data.orderID,
                },
              }
              paymentForm.submitData({ payload })
            })
          },
          onError: function (err) {
            // false is passed to showError not to replace existing error message if any
            paymentForm.showError(err, { replace: false })
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
