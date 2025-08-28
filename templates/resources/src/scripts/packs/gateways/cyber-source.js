import { PaymentForm } from './payment-form'
import { Wallet } from './wallet'
import { onDomChange } from '../../theme/utils/init'
import { GooglePay } from './google-pay'
import { ApplePay } from './apple-pay'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="CyberSource"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initCyberSource({ form })
    }
  })
})

async function initCyberSource({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => submitPaymentForm(paymentForm),
  })
  const wallet = new Wallet(paymentForm)

  const initTasks = []

  if (paymentForm.formFieldElement('card_name') && !paymentForm.onlyExpressCheckout()) {
    initTasks.push(initCreditCardForm(paymentForm))
  }

  if (paymentForm.showWallets() && wallet.walletsElementExists()) {
    initTasks.push(setupApplePay(paymentForm, wallet))
    initTasks.push(setupGooglePay(paymentForm, wallet))
  } else {
    wallet.removeWalletsContainer()
  }

  if (initTasks.length > 0) {
    await Promise.allSettled(initTasks)
  }
}

var microformInstance = null

async function initCreditCardForm(paymentForm) {
  const captureContext = await initializeCaptureContext(paymentForm)
  if (!captureContext) {
    paymentForm.showError('Error preparing to capture payment')
    return
  }

  await loadFlexLibrary(captureContext)

  if (!window.Flex) {
    throw new Error('CyberSource v2/flex.js failed to load properly')
  }

  const flex = new Flex(captureContext)

  // Create the microform with optional styling
  microformInstance = flex.microform('card', {
    styles: {
      input: {
        'font-size': '16px',
        color: '#333',
      },
      '::placeholder': {
        color: '#bbb',
      },
    },
  })

  // Create and load the card number field
  const numberField = microformInstance.createField('number', {
    placeholder: '0000 0000 0000 0000',
  })
  numberField.load('#number-container')

  // Create and load the security code field
  const securityCodeField = microformInstance.createField('securityCode', {
    placeholder: '000',
  })
  securityCodeField.load('#securityCode-container')
}

// Called on submit, after the user has entered their card details
async function submitPaymentForm(paymentForm) {
  const tokenOptions = {
    expirationMonth: paymentForm.getFieldValue('card_month'),
    expirationYear: paymentForm.getFieldValue('card_year'),
  }

  await microformInstance.createToken(tokenOptions, (err, token) => {
    if (err) {
      paymentForm.showError(err.message)
      return
    }

    // token is a JWT token whose payload is a JSON object
    // that contains the masked card number and expiration date
    // Send back the full payment token to the server
    // which will use it to create the Payment with the CyberSource API
    const tokenPayload = JSON.parse(atob(token.split('.')[1]))

    const payload = {
      payment_source: {
        tok_id: token,
        payment_method: 'card',
        card_number: tokenPayload.content.paymentInformation.card.number.maskedValue,
        card_year: tokenPayload.content.paymentInformation.card.expirationYear.value,
        card_month: tokenPayload.content.paymentInformation.card.expirationMonth.value,
      },
    }

    paymentForm.submitData({ payload })
  })
}

async function initializeCaptureContext(paymentForm) {
  // Get a capture context token from the server
  try {
    const response = await fetch(paymentForm.callbackUrl(), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    })
    const json = await response.json()
    if (json.message) {
      paymentForm.showError(json.message)
      return
    }

    return json.token
  } catch (error) {
    paymentForm.showError('Error fetching capture context')
    return
  }
}

async function loadFlexLibrary(captureContext) {
  const payload = JSON.parse(atob(captureContext.split('.')[1]))
  const { clientLibrary, clientLibraryIntegrity } = payload.ctx[0].data

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = clientLibrary
    script.integrity = clientLibraryIntegrity
    script.crossOrigin = 'anonymous'
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
    document.head.appendChild(script)
  })
}

async function setupGooglePay(paymentForm, wallet) {
  new GooglePay({
    paymentForm,
    wallet,
    gateway: 'cybersource',
    // Extract the google payment token into payload used by cyber_source_service.rb
    extractTokenCallback: (paymentData) => {
      const paymentToken = paymentData.paymentMethodData.tokenizationData.token
      const paymentTokenBase64 = btoa(paymentToken)

      // payment_solution - 001 Apple Pay, 012 Google Pay
      // https://developer.cybersource.com/docs/cybs/en-us/api-fields/reference/all/rest/api-fields/processing-info-aa/processing-info-payment-solution.html
      return {
        payment_source: {
          tok_id: paymentTokenBase64,
          payment_solution: '012',
          payment_method: 'google_pay',
          card_network: paymentData.paymentMethodData.info?.cardNetwork,
          card_last_four: paymentData.paymentMethodData.info?.cardDetails,
        },
      }
    },
  })
}

async function setupApplePay(paymentForm, wallet) {
  const merchantId = paymentForm.appleMerchantId()
  if (!merchantId) {
    console.error('Configure api_options.apple_merchant_id to enable Apple Pay')
    return
  }

  new ApplePay({
    paymentForm,
    wallet,
    // Extract the apple payment token into payload used by cyber_source_service.rb
    extractTokenCallback: (paymentData) => {
      const paymentToken = JSON.stringify(paymentData.token.paymentData)
      const paymentTokenBase64 = btoa(paymentToken)

      // payment_solution - 001 Apple Pay, 012 Google Pay
      // https://developer.cybersource.com/docs/cybs/en-us/api-fields/reference/all/rest/api-fields/processing-info-aa/processing-info-payment-solution.html
      return {
        payment_source: {
          tok_id: paymentTokenBase64,
          payment_solution: '001',
          payment_method: 'apple_pay',
          card_network: paymentData.token.paymentMethod?.network,
          card_last_four: paymentData.token.paymentMethod?.displayName?.match(/\d{4}$/)?.[0],
        },
      }
    },
  })
}
