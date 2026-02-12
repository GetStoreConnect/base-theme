import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

// Register onDomChange handler to detect and initialize Latitude forms
onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Latitude"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initLatitude({ form })
    }
  })
})

// Internal initialization function
function initLatitude({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => onClick(paymentForm),
  })

  function onClick(paymentForm) {
    fetch(paymentForm.paymentSessionUrl(), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (result) {
        if (result.redirect_url) {
          paymentForm.cacheFormParamsAndOnSubmit(() => {
            location.href = result.redirect_url
          })
        } else if (result.message) {
          // Display error message
          paymentForm.showError(result.message)
        }
      })
      .catch(function (error) {
        console.error('Latitude payment error:', error)
        paymentForm.showError('Unable to process payment. Please try again.')
      })
  }
}
