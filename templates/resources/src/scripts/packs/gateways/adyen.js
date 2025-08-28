import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import { PaymentForm } from './payment-form'
import { Wallet } from './wallet'
import { onDomChange } from '../../theme/utils/init'
import { GooglePay } from './google-pay'
import { ApplePay } from './apple-pay'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Adyen"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initAdyen({ form, providerId })
    }
  })
})

function initAdyen({ form, providerId }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => onSubmit(paymentForm),
  })
  const wallet = new Wallet(paymentForm)
  const mountElementId = `AdyenFieldset${providerId}`

  const clientKey = form.dataset.apiClient
  const environment = paymentForm.isProduction() ? 'live' : 'test'

  let data
  let card

  function handleOnChange(state, method = 'scheme') {
    if (method === 'scheme') {
      if (state.isValid) {
        data = state.data
      } else {
        data = {}
      }
    } else {
      data = state.data
    }
  }

  const configuration = {
    environment,
    clientKey,
    locale: 'en_US',
    onChange: handleOnChange,
  }

  async function initializeAdyenForm() {
    const checkout = await AdyenCheckout(configuration)
    try {
      card = checkout
        .create('card', {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: false,
          onChange: handleOnChange,
        })
        .mount(`#${mountElementId}`)
    } catch (error) {
      console.error('Error initializing Adyen card component:', error)
    }
  }

  function onSubmit(paymentForm) {
    const payload = {
      // An internal Object of payment data
      payment_source: data.paymentMethod,
      additional_info: {
        browserInfo: {
          userAgent: data.browserInfo.userAgent,
          timeZoneOffset: data.browserInfo.timeZoneOffset,
        },
        origin: data.origin,
        channel: 'Web',
      },
    }

    paymentForm.submitData({ payload, handleSuccess: card.handleAction })
  }

  const initTasks = [initializeAdyenForm()]
  if (paymentForm.showWallets() && wallet.walletsElementExists()) {
    initTasks.push(setupApplePay(paymentForm, wallet))
    initTasks.push(setupGooglePay(paymentForm, wallet))
  }

  Promise.allSettled(initTasks)
}

async function setupGooglePay(paymentForm, wallet) {
  new GooglePay({
    paymentForm,
    wallet,
    gateway: 'adyen',
    // Extract the google payment token into payload used by adyen_service.rb
    extractTokenCallback: (paymentData) => {
      const paymentToken = paymentData.paymentMethodData.tokenizationData.token
      const paymentTokenBase64 = btoa(paymentToken)

      return {
        wallet_payment_source: {
          tok_id: paymentTokenBase64,
          payment_method: 'googlepay',
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
    wallet.showWalletsError('Configure api_options.apple_merchant_id et al to enable Apple Pay')
    return
  }

  new ApplePay({
    paymentForm,
    wallet,
    // Extract the apple payment token into payload used by adyen_service.rb
    extractTokenCallback: (paymentData) => {
      const paymentToken = JSON.stringify(paymentData.token.paymentData)
      const paymentTokenBase64 = btoa(paymentToken)

      return {
        wallet_payment_source: {
          tok_id: paymentTokenBase64,
          payment_method: 'applepay',
          card_network: paymentData.token.paymentMethod?.network,
          card_last_four: paymentData.token.paymentMethod?.displayName?.match(/\d{4}$/)?.[0],
        },
      }
    },
  })
}
