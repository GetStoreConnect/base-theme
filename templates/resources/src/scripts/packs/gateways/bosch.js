import { basicInit, showError, submitElement } from './common'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Bosch"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initBosch({ form, providerId })
    }
  })
})

async function initBosch({ form, providerId }) {
  basicInit(form)
  const providerName = form.dataset.provider

  const button = submitElement()

  try {
    const url = form.dataset.prepareFormDataUrl

    if (!url) {
      showError('Bosch payment form URL is not set')
      return
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify({
        payment: {
          method: providerName,
        },
        payment_provider_id: providerId,
      }),
    })

    const data = await response.json()

    if (response.ok && data.url) {
      button.setAttribute('href', data.url)
      form.classList.remove('sc-hide')
    } else {
      console.error(data.error || 'Error initializing Bosch payment form')
      showError(
        Array.isArray(data.error)
          ? data.error.join(', ')
          : data.error || 'An error occurred initializing the payment form.'
      )
    }
  } catch (error) {
    console.error('Network error:', error)
    showError('A network error occurred. Please try again later.')
  }
}
