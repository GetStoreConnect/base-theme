import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Cboss"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initCboss({ form })
    }
  })
})

function initCboss({ form }) {
  const paymentForm = new PaymentForm(form)

  paymentForm.addHiddenField({ name: 'ClientAccount', value: form.dataset.clientAccount })
  paymentForm.addHiddenField({ name: 'OriginatorID', value: form.dataset.originatorId })
  paymentForm.addHiddenField({ name: 'SuccessfulURL', value: form.dataset.callbackUrl })
  paymentForm.addHiddenField({ name: 'UnsuccessfulURL', value: form.dataset.callbackUrl })
  paymentForm.addHiddenField({ name: 'FirstName', value: form.dataset.firstName })
  paymentForm.addHiddenField({ name: 'LastName', value: form.dataset.lastName })
  paymentForm.addHiddenField({
    name: 'BillingAddressLine1',
    value: form.dataset.billingAddressLine1,
  })
  paymentForm.addHiddenField({ name: 'BillingEmail', value: form.dataset.billingEmail })
  paymentForm.addHiddenField({ name: 'BillingCity', value: form.dataset.billingCity })
  paymentForm.addHiddenField({ name: 'BillingCountry', value: form.dataset.billingCountry })
  paymentForm.addHiddenField({ name: 'BillingZip', value: form.dataset.billingZip })
  paymentForm.addHiddenField({ name: 'BillingPhoneNumber', value: form.dataset.billingPhoneNumber })
  paymentForm.addHiddenField({ name: 'BillingState', value: form.dataset.billingState })
  paymentForm.addHiddenField({ name: 'Currency', value: form.dataset.currency })
  paymentForm.addHiddenField({ name: 'Amount', value: paymentForm.totalPayable() })
  paymentForm.addHiddenField({ name: 'Number', value: form.dataset.number })
  paymentForm.addHiddenField({ name: 'PaymentType', value: form.dataset.paymentType })
}
