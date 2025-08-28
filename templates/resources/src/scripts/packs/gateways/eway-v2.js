import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="EwayV2"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initEwayV2({ form })
    }
  })
})

function initEwayV2({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => showEwayModal(paymentForm),
  })

  const accessCode = form.dataset.accessCode

  function showEwayModal(paymentForm) {
    const sharedPaymentUrl = form.dataset.sharedPaymentUrl

    if (typeof eCrypt !== 'undefined') {
      eCrypt.showModalPayment({ sharedPaymentUrl }, modalCallback)
    } else {
      console.error('eCrypt is not defined.')
    }
  }

  function modalCallback(result, transactionID, errors) {
    if (result === 'Complete') {
      confirmPayment(transactionID)
    } else if (result === 'Cancelled') {
      console.error('Payment was cancelled.')
      paymentForm.showError(errors)
      paymentForm.setPayButton(true)
    } else if (result === 'Error') {
      console.error(`Payment Error: ${errors}`)
      paymentForm.showError(errors)
      paymentForm.setPayButton(true)
    }
  }

  function confirmPayment(transactionID) {
    const payload = {
      payment_source: {
        tok_id: accessCode,
      },
    }
    paymentForm.submitData({ payload })
  }
}
