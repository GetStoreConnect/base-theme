import { init, loadScript, showError, submitData } from './common'
import { callbackUrl } from './form'
import { onDomChange } from '../../theme/utils/init'
import Rails from '@rails/ujs'

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
  init(form)

  const payButtonId = `#ZippayPayWithButton${providerId}`

  const payButton = form.querySelector(payButtonId)
  Rails.disableElement(payButton)

  loadScript({
    url: 'https://static.zipmoney.com.au/checkout/checkout-v1.min.js',
    onload: function () {
      Rails.enableElement(payButton)

      const checkoutUri = callbackUrl()

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
          submitData({ payload })
        },
        onError: function (error) {
          if (error.detail.message) {
            showError(error.detail.message)
          } else {
            showError(error.message)
          }
          Rails.enableElement(payButton)
        },
      }
      Zip.Checkout.attachButton(payButtonId, args)
    },
  })
}
