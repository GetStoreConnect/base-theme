import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import { init, form, submitData } from './common'
import { isProduction, showWallets } from './form'
import { walletsElementExists, showWalletsError } from './wallets'
import { onDomChange } from '../../theme/utils/init'
import { initGooglePayForm } from './google-pay'
import { initApplePayForm } from './apple-pay'

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
  init(form, onSubmit)
  const mountElementId = `AdyenFieldset${providerId}`

  const clientKey = form.dataset.apiClient
  const environment = isProduction() ? 'live' : 'test'

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

  function onSubmit() {
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

    submitData({ payload, handleSuccess: card.handleAction })
  }

  const initTasks = [initializeAdyenForm()]
  if (showWallets() && walletsElementExists()) {
    initTasks.push(setupApplePay())
    initTasks.push(setupGooglePay())
  }

  Promise.allSettled(initTasks)
}

async function setupGooglePay() {
  initGooglePayForm({
    merchantId: form.dataset.googleMerchantId,
    merchantName: form.dataset.googleMerchantName || form.dataset.merchantName,
    gateway: 'adyen',
    gatewayMerchantId: form.dataset.merchantId,
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

async function setupApplePay() {
  const merchantId = form.dataset.appleMerchantId
  if (!merchantId) {
    showWalletsError('Configure api_options.apple_merchant_id et al to enable Apple Pay')
    return
  }

  initApplePayForm({
    merchantId,
    merchantName: form.dataset.appleMerchantName || form.dataset.merchantName,
    providerId: form.dataset.providerId,
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
