import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Aci"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initAci({ form })
    }
  })
})

function initAci({ form }) {
  const paymentForm = new PaymentForm(form)

  paymentForm.addHiddenField({ name: 'cde-Name-0', value: form.dataset.uniqueId })
  paymentForm.addHiddenField({ name: 'productId', value: form.dataset.productId })
  paymentForm.addHiddenField({ name: 'paymentAmount', value: paymentForm.totalPayable() })
  paymentForm.addHiddenField({ name: 'postbackUrl', value: form.dataset.postbackUrl })
  paymentForm.addHiddenField({ name: 'returnUrl', value: form.dataset.returnUrl })
  paymentForm.addHiddenField({ name: 'errorUrl', value: form.dataset.cancelUrl })
  paymentForm.addHiddenField({ name: 'cancelUrl', value: form.dataset.cancelUrl })
  paymentForm.addHiddenField({ name: 'firstName', value: form.dataset.firstName })
  paymentForm.addHiddenField({ name: 'lastName', value: form.dataset.lastName })
  paymentForm.addHiddenField({ name: 'email', value: form.dataset.billingEmail })
}
