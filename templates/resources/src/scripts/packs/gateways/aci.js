import { addFormInput, totalPayable } from './form'
import { basicInit } from './common'
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
  basicInit(form)

  addFormInput({ form, name: 'cde-Name-0', value: form.dataset.uniqueId })
  addFormInput({ form, name: 'productId', value: form.dataset.productId })
  addFormInput({ form, name: 'paymentAmount', value: totalPayable() })
  addFormInput({ form, name: 'postbackUrl', value: form.dataset.postbackUrl })
  addFormInput({ form, name: 'returnUrl', value: form.dataset.returnUrl })
  addFormInput({ form, name: 'errorUrl', value: form.dataset.cancelUrl })
  addFormInput({ form, name: 'cancelUrl', value: form.dataset.cancelUrl })
  addFormInput({ form, name: 'firstName', value: form.dataset.firstName })
  addFormInput({ form, name: 'lastName', value: form.dataset.lastName })
  addFormInput({ form, name: 'email', value: form.dataset.billingEmail })
}
