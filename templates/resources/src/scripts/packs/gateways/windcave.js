import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

// Register onDomChange handler to detect and initialize Windcave forms
onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Windcave"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initWindcave({ form })
    }
  })
})

// Internal initialization function
function initWindcave({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => onClick(paymentForm),
  })

  function onClick(paymentForm) {
    fetch(paymentForm.callbackUrl(), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (result) {
        paymentForm.cacheFormParamsAndOnSubmit(() => {
          location.href = result.form_url
        })
      })
  }
}
