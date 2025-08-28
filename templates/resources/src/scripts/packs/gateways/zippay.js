import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

const Rails = window.Rails

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Zippay"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initZippay({ form, providerId })
    }
  })
})

function initZippay({ form, providerId }) {
  const paymentForm = new PaymentForm(form)

  const payButtonId = `#ZippayPayWithButton${providerId}`

  const payButton = form.querySelector(payButtonId)
  Rails.disableElement(payButton)

  paymentForm.loadScript({
    url: 'https://static.zipmoney.com.au/checkout/checkout-v1.min.js',
    onload: function () {
      Rails.enableElement(payButton)

      const checkoutUri = paymentForm.callbackUrl()

      const args = {
        checkoutUri,
        redirectUri: `${checkoutUri}&type=redirect`, // Required; but we are not handling this scenario ATM
        onComplete: function (data) {
          const payload = {
            payment_source: {
              tok_id: data.checkoutId,
              customer_id: data.customerId,
              state: data.state,
            },
          }
          paymentForm.submitData({ payload })
        },
        onError: function (error) {
          if (error.detail.message) {
            paymentForm.showError(error.detail.message)
          } else {
            paymentForm.showError(error.message)
          }
          Rails.enableElement(payButton)
        },
      }
      Zip.Checkout.attachButton(payButtonId, args)
    },
  })
}
