import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'
import fetchWithResponseHandler from '../../theme/utils/fetch'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="TouchNet"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initTouchNet({ form })
    }
  })
})

function initTouchNet({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => paymentForm.cacheFormParamsAndOnSubmit(() => paymentForm.form.submit()),
  })

  // Generate a unique "ticket" token for the TouchNet payment
  // Also receive the ticket_name (order number) to be used in the form
  fetchWithResponseHandler(paymentForm.callbackUrl(), {
    method: 'post',
    headers: { 'content-type': 'application/json' },
  }).then((response) => {
    if (response.message) {
      paymentForm.showError(response.message)
      paymentForm.setPayButton(false)
      return
    }

    initializeTouchNetForm({ paymentForm, response })
  })
}

function initializeTouchNetForm({ paymentForm, response }) {
  paymentForm.addHiddenField({ name: 'TICKET', value: response.token.ticket })
  paymentForm.addHiddenField({ name: 'TICKET_NAME', value: response.token.ticket_name })
  paymentForm.addHiddenField({ name: 'UPAY_SITE_ID', value: paymentForm.form.dataset.upaySiteId })

  paymentForm.setPayButton(true)
}
