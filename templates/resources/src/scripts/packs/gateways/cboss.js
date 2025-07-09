import { addFormInput, totalPayable } from './form'
import { basicInit } from './common'
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
  basicInit(form)

  addFormInput({ form, name: 'ClientAccount', value: form.dataset.clientAccount })
  addFormInput({ form, name: 'OriginatorID', value: form.dataset.originatorId })
  addFormInput({ form, name: 'SuccessfulURL', value: form.dataset.callbackUrl })
  addFormInput({ form, name: 'UnsuccessfulURL', value: form.dataset.callbackUrl })
  addFormInput({ form, name: 'FirstName', value: form.dataset.firstName })
  addFormInput({ form, name: 'LastName', value: form.dataset.lastName })
  addFormInput({ form, name: 'BillingAddressLine1', value: form.dataset.billingAddressLine1 })
  addFormInput({ form, name: 'BillingEmail', value: form.dataset.billingEmail })
  addFormInput({ form, name: 'BillingCity', value: form.dataset.billingCity })
  addFormInput({ form, name: 'BillingCountry', value: form.dataset.billingCountry })
  addFormInput({ form, name: 'BillingZip', value: form.dataset.billingZip })
  addFormInput({ form, name: 'BillingPhoneNumber', value: form.dataset.billingPhoneNumber })
  addFormInput({ form, name: 'BillingState', value: form.dataset.billingState })
  addFormInput({ form, name: 'Currency', value: form.dataset.currency })
  addFormInput({ form, name: 'Amount', value: totalPayable() })
  addFormInput({ form, name: 'Number', value: form.dataset.number })
  addFormInput({ form, name: 'PaymentType', value: form.dataset.paymentType })
}
