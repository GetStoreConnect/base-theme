import { PaymentForm } from './payment-form'
import { Wallet } from './wallet'
import { onDomChange } from '../../theme/utils/init'
import { GooglePay } from './google-pay'
import { ApplePay } from './apple-pay'

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
  const paymentForm = new PaymentForm(form, {
    onSubmit: onSubmit,
  })
  const wallet = new Wallet(paymentForm)

  const encryptionKey = paymentForm.secureCardCaptureKey()
  if (!encryptionKey) {
    console.error('Add WestpacOnlinePay api_options.secure_card_capture_key to payment provider.')
    return
  }

  paymentForm.loadScript({
    url: paymentForm.scriptUrl(),
    onload: () => {
      paymentForm.setPayButton(true)
    },
  })

  const initTasks = []

  if (paymentForm.showWallets() && wallet.walletsElementExists()) {
    initTasks.push(setupApplePay(paymentForm, wallet))
    initTasks.push(setupGooglePay(paymentForm, wallet))
  } else {
    wallet.removeWalletsContainer()
  }

  if (initTasks.length > 0) {
    await Promise.allSettled(initTasks)
  }

  async function onSubmit() {
    const cardDetails = {
      cardholderName: paymentForm.getFieldValue('card_name'),
      cardNumber: paymentForm.getFieldValue('card_number').replace(/\s+/g, ''),
      expiryMonth: paymentForm.getFieldValue('card_month').padStart(2, '0'),
      expiryYear: paymentForm.getFieldValue('card_year').slice(-2),
      cvv: paymentForm.getFieldValue('card_verification'),
    }

    const cyphertext = await verifone.encryptCard(cardDetails, encryptionKey)

    const payload = {
      payment_source: {
        tok_id: cyphertext,
      },
    }
    paymentForm.submitData({ payload })
  }
}

async function setupGooglePay(paymentForm, wallet) {
  new GooglePay({
    paymentForm,
    wallet,
    gateway: 'verifone',
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

async function setupApplePay(paymentForm, wallet) {
  const merchantId = paymentForm.appleMerchantId()
  if (!merchantId) {
    console.error('Configure api_options.apple_merchant_id to enable Apple Pay')
    return
  }

  new ApplePay({
    paymentForm,
    wallet,
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
