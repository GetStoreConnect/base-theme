import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'
import { Wallet } from './wallet'
import { GooglePay } from './google-pay'
import { ApplePay } from './apple-pay'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Eway"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initEway({ form })
    }
  })
})

function initEway({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => onSubmit(paymentForm),
  })
  const wallet = new Wallet(paymentForm)

  const publicKey = form.dataset.publicKey

  function onSubmit(paymentForm) {
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

    paymentForm.submitData({
      payload,
      onSuccess: (response) => handle3DSResponse(response, paymentForm),
    })
  }

  function handle3DSResponse(response, paymentForm) {
    if (response.payment_response?.requires_threeds) {
      // 3DS authentication required - redirect to authentication page
      const redirectUrl = response.payment_response.threeds_redirect
      if (redirectUrl) {
        // Store payment information for callback
        sessionStorage.setItem('eway_3ds_payment_token', response.payment_response.transaction_id)
        sessionStorage.setItem('eway_3ds_provider_id', paymentForm.form.dataset.providerId)

        // Redirect to 3DS authentication
        window.location.href = redirectUrl
      } else {
        paymentForm.handleError('3D Secure authentication required but no redirect URL provided')
      }
    } else if (response.redirect_url) {
      // Normal success flow
      window.location.href = response.redirect_url
    } else if (response.error_message) {
      // Payment failed
      paymentForm.handleError(response.error_message)
    }
  }

  // Check if returning from 3DS authentication
  check3DSCallback(paymentForm)

  paymentForm.loadScript({
    url: 'https://secure.ewaypayments.com/scripts/eCrypt.min.js',
    onload: () => {
      const initTasks = []

      if (paymentForm.showWallets() && wallet.walletsElementExists()) {
        initTasks.push(setupApplePay(paymentForm, wallet))
        initTasks.push(setupGooglePay(paymentForm, wallet))
      }

      Promise.allSettled(initTasks)
    },
  })

  function check3DSCallback(paymentForm) {
    // Check if we're returning from 3DS authentication
    const urlParams = new URLSearchParams(window.location.search)
    const threeDSResult = urlParams.get('threeds_result')

    if (threeDSResult) {
      // Extract stored payment information
      const paymentToken = sessionStorage.getItem('eway_3ds_payment_token')
      const providerId = sessionStorage.getItem('eway_3ds_provider_id')

      if (paymentToken && providerId) {
        // Clear stored data
        sessionStorage.removeItem('eway_3ds_payment_token')
        sessionStorage.removeItem('eway_3ds_provider_id')

        // Confirm the payment with 3DS result
        confirmPaymentAfter3DS(threeDSResult, paymentToken, providerId, paymentForm)
      }
    }
  }

  function confirmPaymentAfter3DS(threeDSResult, paymentToken, providerId, paymentForm) {
    const payload = {
      threeds_result: JSON.parse(atob(threeDSResult)), // Decode base64 3DS result
      payment_token: paymentToken,
      provider_id: providerId,
    }

    // Call the confirmation endpoint
    fetch(window.location.pathname, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.redirect_url) {
          window.location.href = data.redirect_url
        } else if (data.error_message) {
          paymentForm.handleError(data.error_message)
        }
      })
      .catch((error) => {
        console.error('3DS confirmation error:', error)
        paymentForm.handleError('Payment confirmation failed after 3D Secure authentication')
      })
  }
}

async function setupGooglePay(paymentForm, wallet) {
  try {
    new GooglePay({
      paymentForm,
      wallet,
      gateway: 'eway',
      // Extract the google payment token into payload used by eway_service.rb
      extractTokenCallback: (paymentData) => {
        console.log(paymentData)
        try {
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
        } catch (err) {
          console.error('Eway: Error extracting Google Pay token\n', err, { paymentData })
          throw err
        }
      },
    })

    return Promise.resolve()
  } catch (err) {
    console.error('Eway: Failed to set up Google Pay\n', err)
    throw err
  }
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
    // Extract the apple payment token into payload used by eway_service.rb
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
