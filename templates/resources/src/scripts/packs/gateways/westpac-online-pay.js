import { PaymentForm } from './payment-form'
import { Wallet } from './wallet'
import { onDomChange } from '../../theme/utils/init'
import { GooglePay } from './google-pay'
import { ApplePay } from './apple-pay'
import { putJSON } from '../../theme/utils/fetch'

// https://verifone.cloud/docs/online-payments/checkout/card-encryption-verifonejs
// https://verifone.cloud/docs/online-payments/3dsecure

// Cardinal Songbird (3DS2) library URLs. Sandbox uses the `songbirdstag` host.
const SONGBIRD_SANDBOX_URL = 'https://songbirdstag.cardinalcommerce.com/edge/v1/songbird.js'
const SONGBIRD_PRODUCTION_URL = 'https://songbird.cardinalcommerce.com/edge/v1/songbird.js'

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
      if (!paymentForm.onlyExpressCheckout()) {
        paymentForm.setPayButton(true)
      }
    },
  })

  // threeDSState tracks device fingerprint (sessionId) captured up-front, so the
  // initial submit can include it without a second server round trip. The lookup
  // endpoint requires `device_info_id`, so submit awaits `sessionPromise` when
  // 3DS is enabled.
  const threeDSState = {
    enabled: form.dataset.threedsEnabled === 'true',
    environment: form.dataset.threedsEnvironment || 'sandbox',
    initJwt: form.dataset.threedsJwt || null,
    sessionId: null,
    sessionPromise: null,
    sessionResolve: null,
  }
  threeDSState.sessionPromise = new Promise((resolve) => {
    threeDSState.sessionResolve = resolve
  })

  // Songbird only matters for the card-form flow. Wallets (Apple Pay / Google Pay)
  // do their own 3DS, so on express-only pages we'd be loading Cardinal for a
  // submit path that never runs — and tripping CSP fingerprint requests too.
  if (threeDSState.enabled && !paymentForm.onlyExpressCheckout()) {
    loadSongbird(paymentForm, threeDSState)
  } else {
    threeDSState.sessionResolve(null)
  }

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

    // When 3DS is enabled, the lookup endpoint requires device_info_id, so wait
    // up to 8s for Cardinal's setupComplete. If Songbird never booted we still
    // submit; the server will fail-open to a non-3DS charge.
    if (threeDSState.enabled) {
      const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 8000))
      const sessionId = await Promise.race([threeDSState.sessionPromise, timeout])
      if (sessionId) {
        payload.device_info_id = sessionId
      }
    }

    paymentForm.submitData({
      payload,
      handleSuccess: (action) => handleThreeDSAction(action, paymentForm, threeDSState),
    })
  }
}

// Loads the Cardinal Songbird SDK and attaches handlers that capture the
// device fingerprint (`sessionId`) for the initial submit payload.
function loadSongbird(paymentForm, threeDSState) {
  const url =
    threeDSState.environment === 'production' ? SONGBIRD_PRODUCTION_URL : SONGBIRD_SANDBOX_URL

  paymentForm.loadScript({
    url,
    id: 'cardinal-songbird',
    onload: () => {
      if (typeof Cardinal === 'undefined') {
        console.error('WestpacOnlinePay: Songbird did not load; 3DS disabled')
        threeDSState.sessionResolve(null)
        return
      }

      Cardinal.configure({
        logging: { level: 'off' },
      })

      Cardinal.off('payments.setupComplete')
      Cardinal.on('payments.setupComplete', (setupCompleteData) => {
        threeDSState.sessionId = setupCompleteData.sessionId
        threeDSState.sessionResolve(setupCompleteData.sessionId)
      })

      // Fingerprint the device up-front so `sessionId` is ready when the user
      // submits. Without this, Verifone's /lookup rejects the call for missing
      // device_info_id.
      if (threeDSState.initJwt) {
        Cardinal.setup('init', { jwt: threeDSState.initJwt })
      } else {
        threeDSState.sessionResolve(null)
      }
    },
  })
}

// handleSuccess hook: invoked by PaymentForm.submitData when the server responds
// with `payment_response.action`. That action envelope comes from the service's
// filtered_response (see WestpacOnlinePayService#threeds_action).
function handleThreeDSAction(action, paymentForm, threeDSState) {
  if (!action) return

  if (!action.acs_url) {
    paymentForm.showError(paymentForm.i18n('three_d_secure.unexpected_response'))
    return
  }

  if (typeof Cardinal === 'undefined') {
    paymentForm.showError(paymentForm.i18n('three_d_secure.library_failed'))
    return
  }

  // payments.validated fires once the cardholder finishes (or cancels) the challenge.
  Cardinal.off('payments.validated')
  Cardinal.on('payments.validated', (validationData /*, jwt */) => {
    switch (validationData.ActionCode) {
      case 'SUCCESS':
      case 'NOACTION':
        confirmPaymentAfterChallenge(validationData, paymentForm, threeDSState)
        break
      case 'FAILURE':
      case 'ERROR':
      default:
        // Mirror the server-side PAYMENT_ERROR by reusing the same key
        // (`sc.checkout.payment.shared.errors.verifying_payment`) so the user
        // sees the same text whether the failure came from Cardinal or the gateway.
        paymentForm.showError(paymentForm.i18n('errors.verifying_payment'))
    }
  })

  // Re-bind the cached init JWT before kicking off the challenge. Songbird
  // discards its internal session once `payments.setupComplete` has fired for
  // device data collection, so `continue('cca', ...)` will silently no-op
  // (no `#Cardinal-CCA-IFrame` rendered) unless we re-init with the same JWT
  // that the server used to drive `/3ds-service/v2/lookup`.
  Cardinal.setup('init', { jwt: action.jwt })
  Cardinal.continue(
    'cca',
    { AcsUrl: action.acs_url, Payload: action.payload },
    { OrderDetails: { TransactionId: action.transaction_id } }
  )
}

// PUTs the validated 3DS payload to /checkout/payment (or whatever the form's
// action URL is). The server's ConfirmPayment interactor will merge this with
// the session params (encrypted card token) and re-post to /transactions/card.
function confirmPaymentAfterChallenge(validationData, paymentForm, threeDSState) {
  const extended = validationData.Payment && validationData.Payment.ExtendedData
  if (!extended) {
    paymentForm.showError(paymentForm.i18n('three_d_secure.unexpected_response'))
    return
  }

  const payload = {
    threed_authentication: {
      eci_flag: extended.ECIFlag,
      cavv: extended.CAVV,
      pares_status: extended.PAResStatus,
      threeds_version: extended.ThreeDSVersion,
      ds_transaction_id: extended.DSTransactionId,
      signature_verification: extended.SignatureVerification,
    },
    device_info_id: threeDSState.sessionId,
  }

  const url = paymentForm.form.getAttribute('action')

  putJSON(url, payload)
    .then((data) => {
      if (data?.redirect && data.redirect !== window.location.pathname) {
        window.location.href = data.redirect
      } else if (data?.alert) {
        paymentForm.showError(data.alert)
      } else if (data?.redirect) {
        window.location.href = data.redirect
      }
    })
    .catch((err) => {
      console.error('WestpacOnlinePay: 3DS confirmation failed', err)
      paymentForm.showError(paymentForm.i18n('three_d_secure.confirmation_failed'))
    })
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
