import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

// Replace direct initialization with onDomChange pattern
onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Eway"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initEway({ form })
    }
  })
})

// Keep existing function but rename to make it internal
function initEway({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => getFormFields(paymentForm),
  })

  const publicKey = form.dataset.publicKey

  function getFormFields(paymentForm) {
    const cardNumberEl = paymentForm.form.querySelector("[data-encrypt-name='EWAY_CARDNUMBER']")
    const cvnEl = paymentForm.form.querySelector("[data-encrypt-name='EWAY_CARDCVN']")
    const payload = {
      payment_source: {
        number: eCrypt.encryptValue(cardNumberEl.value, publicKey),
        name: paymentForm.getFieldValue('card_name'),
        expiry_month: paymentForm.getFieldValue('card_month'),
        expiry_year: paymentForm.getFieldValue('card_year'),
        cvn: eCrypt.encryptValue(cvnEl.value, publicKey),
      },
    }

    paymentForm.submitData({ payload })
  }

  paymentForm.loadScript({ url: 'https://secure.ewaypayments.com/scripts/eCrypt.min.js' })
}
