import { init, formFieldElement, loadScript, submitData } from './common'
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
  init(form, getFormFields)

  const publicKey = form.dataset.publicKey

  function getFormFields(form) {
    const cardNumberEl = form.querySelector("[data-encrypt-name='EWAY_CARDNUMBER']")
    const cvnEl = form.querySelector("[data-encrypt-name='EWAY_CARDCVN']")
    const payload = {
      payment_source: {
        number: eCrypt.encryptValue(cardNumberEl.value, publicKey),
        name: formFieldElement('card_name').value,
        expiry_month: formFieldElement('card_month').value,
        expiry_year: formFieldElement('card_year').value,
        cvn: eCrypt.encryptValue(cvnEl.value, publicKey),
      },
    }

    submitData({ payload })
  }

  loadScript({ url: 'https://secure.ewaypayments.com/scripts/eCrypt.min.js' })
}
