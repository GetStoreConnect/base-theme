import { init, form, formFieldElement, loadScript, setPayButton, submitData } from './common'
import { removeWalletsContainer, walletsElementExists } from './wallets'
import { showWallets } from './form'
import { onDomChange } from '../../theme/utils/init'
import { initGooglePayForm } from './google-pay'
import { initApplePayForm } from './apple-pay'

// https://verifone.cloud/docs/online-payments/checkout/card-encryption-verifonejs

// Register onDomChange handler to detect and initialize WestpacOnlinePay forms
onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="WestpacOnlinePay"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initWestpacOnlinePay({ form })
    }
  })
})

async function initWestpacOnlinePay({ form }) {
  init(form, onSubmit)

  const encryptionKey = form.dataset.secureCardCaptureKey
  if (!encryptionKey) {
    console.error('Add WestpacOnlinePay api_options.secure_card_capture_key to payment provider.')
    return
  }

  loadScript({
    url: form.dataset.scriptUrl,
    onload: () => {
      setPayButton(true)
    },
  })

  const initTasks = []

  if (showWallets() && walletsElementExists()) {
    initTasks.push(setupApplePay())
    initTasks.push(setupGooglePay())
  } else {
    removeWalletsContainer()
  }

  if (initTasks.length > 0) {
    await Promise.allSettled(initTasks)
  }

  async function onSubmit() {
    const cardDetails = {
      cardholderName: formFieldElement('card_name').value,
      cardNumber: formFieldElement('card_number').value.replace(/\s+/g, ''),
      expiryMonth: formFieldElement('card_month').value.padStart(2, '0'),
      expiryYear: formFieldElement('card_year').value.slice(-2),
      cvv: formFieldElement('card_verification').value,
    }

    const cyphertext = await verifone.encryptCard(cardDetails, encryptionKey)

    const payload = {
      payment_source: {
        tok_id: cyphertext,
      },
    }
    submitData({ payload })
  }
}

async function setupGooglePay() {
  initGooglePayForm({
    merchantId: form.dataset.googleMerchantId,
    merchantName: form.dataset.googleMerchantName,
    gateway: 'verifone',
    gatewayMerchantId: form.dataset.merchantId,
    // Extract the google payment token into payload used by westpac_online_pay_service.rb
    extractTokenCallback: (paymentData) => {
      const paymentToken = paymentData.paymentMethodData.tokenizationData.token
      const paymentTokenBase64 = btoa(paymentToken)

      return {
        payment_source: {
          wallet_payload: paymentTokenBase64,
          wallet_type: 'GOOGLE_PAY',
          card_network: paymentData.paymentMethodData.info?.cardNetwork,
          card_last_four: paymentData.paymentMethodData.info?.cardDetails,
        },
      }
    },
  })
}

async function setupApplePay() {
  const merchantId = form.dataset.appleMerchantId
  if (!merchantId) {
    console.error('Configure api_options.apple_merchant_id to enable Apple Pay')
    return
  }

  initApplePayForm({
    merchantId,
    merchantName: form.dataset.appleMerchantName || form.dataset.googleMerchantName,
    providerId: form.dataset.providerId,
    // Extract the apple payment token into payload used by westpac_online_pay_service.rb
    extractTokenCallback: (paymentData) => {
      const paymentToken = JSON.stringify(paymentData.token.paymentData)
      const paymentTokenBase64 = btoa(paymentToken)

      return {
        payment_source: {
          wallet_payload: paymentTokenBase64,
          wallet_type: 'APPLE_PAY',
          card_network: paymentData.token.paymentMethod?.network,
          card_last_four: paymentData.token.paymentMethod?.displayName?.match(/\d{4}$/)?.[0],
        },
      }
    },
  })
}
