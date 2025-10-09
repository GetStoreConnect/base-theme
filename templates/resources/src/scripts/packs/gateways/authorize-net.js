import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

const AUTHORIZE_NET_FORM_SELECTOR = 'form[data-provider*="AuthorizeNet"]'

onDomChange((node) => {
  const forms = node.querySelectorAll(AUTHORIZE_NET_FORM_SELECTOR)
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initAuthorizeNet({ form })
    }
  })
})

function initAuthorizeNet({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => createToken(paymentForm),
  })

  // Check for conflicts - only blocks non-production forms
  if (paymentForm.hasConflict({ selector: AUTHORIZE_NET_FORM_SELECTOR })) return

  const authData = {
    apiLoginID: paymentForm.apiKey(),
    clientKey: form.dataset.publicKey,
  }

  function createToken(paymentForm) {
    let secureData = { authData }

    if (paymentForm.formFieldElement('card_name')) {
      secureData.cardData = {
        fullName: paymentForm.getFieldValue('card_name'),
        cardNumber: paymentForm.getFieldValue('card_number'),
        month: paymentForm.getFieldValue('card_month'),
        year: paymentForm.getFieldValue('card_year'),
        cardCode: paymentForm.getFieldValue('card_verification'),
        // form.dataset.zipCode was an early implementation and is
        // included for backwards compatibility for clients who
        // have modified app/liquid/theme/snippets/checkout/payment_information/payment_providers/authorize_net/form.liquid
        zip: paymentForm.getFieldValue('billing_postal_code') || form.dataset.zipCode,
      }
    }

    if (paymentForm.formFieldElement('ach_account_holder_type')) {
      secureData.bankData = {
        accountType: paymentForm.getFieldValue('ach_account_holder_type'),
        accountNumber: paymentForm.getFieldValue('ach_account_number'),
        routingNumber: paymentForm.getFieldValue('ach_routing_number'),
        nameOnAccount: paymentForm.getFieldValue('ach_account_name'),
        bankName: paymentForm.getFieldValue('ach_bank_name'),
        echeckType: 'WEB',
      }
    }

    Accept.dispatchData(secureData, (response) => createTokenCallback(response, paymentForm))
  }

  function createTokenCallback(response, paymentForm) {
    if (response.messages.resultCode === 'Error') {
      const error = response.messages.message.map((obj) => obj.text).join('\n')
      paymentForm.showError(error)
    } else {
      const payload = {
        payment_source: {
          tok_id: response.opaqueData['dataValue'],
        },
      }
      paymentForm.submitData({ payload })
    }
  }

  const authorizeNetUrl = paymentForm.isProduction()
    ? 'https://js.authorize.net/v1/Accept.js'
    : 'https://jstest.authorize.net/v1/Accept.js'
  paymentForm.loadScript({ url: authorizeNetUrl })
}
