import { init, setPayButton, showError } from './common'
import { addFormInput, callbackUrl, cacheFormParamsAndOnSubmit } from './form'
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
  init(form, (form) => cacheFormParamsAndOnSubmit(() => form.submit()))

  // Generate a unique "ticket" token for the TouchNet payment
  // Also receive the ticket_name (order number) to be used in the form
  fetchWithResponseHandler(callbackUrl(), {
    method: 'post',
    headers: { 'content-type': 'application/json' },
  }).then((response) => {
    if (response.message) {
      showError(response.message)
      setPayButton(false)
      return
    }

    initializeTouchNetForm({ form, response })
  })
}

function initializeTouchNetForm({ form, response }) {
  addFormInput({ form, name: 'TICKET', value: response.token.ticket })
  addFormInput({ form, name: 'TICKET_NAME', value: response.token.ticket_name })
  addFormInput({ form, name: 'UPAY_SITE_ID', value: form.dataset.upaySiteId })

  setPayButton(true)
}
