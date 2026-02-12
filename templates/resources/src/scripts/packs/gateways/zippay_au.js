import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'
import { postJSON } from '../../theme/utils/fetch'

// Register onDomChange handler to detect and initialize ZippayAu forms
onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="ZippayAu"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initZippayAu({ form })
    }
  })
})

// Internal initialization function
function initZippayAu({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: async () => {
      try {
        if (paymentForm.saveCustomerTokenOnly()) {
          // Save-token flows (subscriptions, future saved profiles)
          // Submit directly to controller which creates $0 checkout
          paymentForm.submitData({ payload: {} })
          return
        }

        // Normal checkout flow - create payment session first
        const result = await postJSON(paymentForm.paymentSessionUrl(), {})

        if (result.redirect_url) {
          paymentForm.cacheFormParamsAndOnSubmit(() => {
            location.href = result.redirect_url
          })
        } else if (result.message) {
          // Display error message
          paymentForm.showError(result.message)
        }
      } catch (error) {
        console.error('ZippayAu payment error:', error)
        const errorEl = document.querySelector('[data-general-error-message]')
        const message = errorEl?.getAttribute('data-general-error-message') || 'Payment error'
        paymentForm.showError(message)
      }
    },
  })
}
