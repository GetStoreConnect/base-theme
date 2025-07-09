import { init, formFieldElement, showError, submitData, loadScript } from './common'
import { isProduction, apiKey } from './form'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider*="AuthorizeNet"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initAuthorizeNet({ form })
    }
  })
})

function initAuthorizeNet({ form }) {
  const zipCode = form.dataset.zipCode

  init(form, createToken)

  const authData = {
    apiLoginID: apiKey(),
    clientKey: form.dataset.publicKey,
  }

  function createToken() {
    let secureData = { authData }

    if (formFieldElement('card_name')) {
      secureData.cardData = {
        fullName: formFieldElement('card_name').value,
        cardNumber: formFieldElement('card_number').value,
        month: formFieldElement('card_month').value,
        year: formFieldElement('card_year').value,
        cardCode: formFieldElement('card_verification').value,
        zip: zipCode,
      }
    }

    if (formFieldElement('ach_account_holder_type')) {
      secureData.bankData = {
        accountType: formFieldElement('ach_account_holder_type').value,
        accountNumber: formFieldElement('ach_account_number').value,
        routingNumber: formFieldElement('ach_routing_number').value,
        nameOnAccount: formFieldElement('ach_account_name').value,
        bankName: formFieldElement('ach_bank_name').value,
        echeckType: 'WEB',
      }
    }

    Accept.dispatchData(secureData, createTokenCallback)
  }

  function createTokenCallback(response) {
    if (response.messages.resultCode === 'Error') {
      const error = response.messages.message.map((obj) => obj.text).join('\n')
      showError(error)
    } else {
      const payload = {
        payment_source: {
          tok_id: response.opaqueData['dataValue'],
        },
      }
      submitData({ payload })
    }
  }

  const authorizeNetUrl = isProduction()
    ? 'https://js.authorize.net/v1/Accept.js'
    : 'https://jstest.authorize.net/v1/Accept.js'
  loadScript({ url: authorizeNetUrl })
}
