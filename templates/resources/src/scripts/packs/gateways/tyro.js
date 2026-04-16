import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'
import { postJSON, getJSON, deleteJSON, patchForm } from '../../theme/utils/fetch'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Tyro"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initTyro({ form })
    }
  })
})

let payRequestId
let paySecret
let walletLockPromise = null

let tyro
let tyroForm

async function initTyro({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => tyroSubmitPayment(paymentForm),
  })
  paymentForm.setPayButton(false)

  try {
    const json = await postJSON(paymentForm.paymentSessionUrl(), {})

    if (json.message) {
      paymentForm.showError(json.message)
      return
    }

    payRequestId = json.token.id
    paySecret = json.token.paySecret

    initializeTyro(paymentForm)
  } catch (error) {
    console.error('Tyro initialization error:', error)
    paymentForm.showError('Failed to initialize payment')
  }
}

async function initializeTyro(paymentForm) {
  tyro = Tyro({
    liveMode: paymentForm.form.dataset.apiMode === 'production',
  })

  // If an error generating pay request/pay secret, show the error message
  if (paymentForm.form.dataset.error) {
    paymentForm.showError(paymentForm.form.dataset.error)
    return
  }

  try {
    paymentForm.setPayButton(false)
    // Pay secret is provided by the backend
    await tyro.init(paySecret)

    const payForm = tyro.createPayForm({
      theme: 'default',
      styleProps: {
        bodyPadding: 0,
        bodyMinWidth: '200px',
        bodyMaxWidth: '1080px',
        labelPosition: 'block',
        inputSpacing: '0',
        inputPadding: '10',
        labelPadding: '6 0',
        labelFontColor: '#222',
        showSupportedCards: true,
      },
      options: {
        applePay: {
          enabled: paymentForm.showWallets(),
        },
        googlePay: {
          enabled: paymentForm.showWallets(),
          merchantInfo: {
            merchantName: paymentForm.googleMerchantName(),
            merchantId: paymentForm.googleMerchantId(),
          },
        },
        creditCardForm: {
          enabled: true,
        },
      },
    })

    payForm.setReadyListener(() => {
      // Enable the pay button after the form is ready
      paymentForm.setPayButton(true)
    })

    payForm.setWalletPaymentBeginListener((_) => {
      walletLockPromise = lockPaymentSession(paymentForm).catch((e) => {
        console.error('Lock failed:', e)
        return { failed: true }
      })
      disableForm(paymentForm)
    })

    payForm.setWalletPaymentCancelledListener((_) => {
      walletLockPromise = null
      unlockPaymentSession(paymentForm).catch(() => {})
      enableForm(paymentForm)
    })

    payForm.setWalletPaymentCompleteListener(async (paymentType, error) => {
      if (error) {
        handleFailedPayment({ message: error.errorMessage, paymentForm })
        return
      }
      const lockResult = await walletLockPromise
      if (lockResult?.failed) {
        handleFailedPayment({ message: 'Failed to start payment session', paymentForm })
        return
      }
      await waitForServerCompletion(paymentForm)
    })

    // Inject the Tyro form
    const inlineFormId = `${paymentForm.form.id}[data-ref="inline-form"]`
    tyroForm = document.querySelector(inlineFormId)
    payForm.inject(inlineFormId)
  } catch (error) {
    paymentForm.showError(error.message)
  }
}

// https://docs.connect.tyro.com/app/apis/pay/tyro-js/submit-pay/
async function tyroSubmitPayment(paymentForm) {
  disableForm(paymentForm)
  paymentForm.hideError()

  try {
    // Lock cart and start server-side polling job
    await lockPaymentSession(paymentForm)

    await tyro.submitPay()

    // Server-side polling job handles payment processing — wait for it
    await waitForServerCompletion(paymentForm)
  } catch (error) {
    handleFailedPayment({ message: error.errorMessage || error.message, paymentForm })
  }
}

async function waitForServerCompletion(paymentForm) {
  try {
    const completed = await pollForCompletion(paymentForm)
    if (!completed) {
      // Fallback: polling job didn't complete in time, try direct flow
      await processPaymentOutcome(paymentForm)
    }
  } catch (err) {
    handleFailedPayment({ message: err.message, paymentForm })
  }
}

async function processPaymentOutcome(paymentForm) {
  const payRequest = await tyro.fetchPayRequest()
  if (payRequest.status !== 'SUCCESS') {
    handleFailedPayment({ message: payRequest.errorMessage, paymentForm })
    return
  }

  const payload = {
    payment_source: {
      tok_id: payRequestId,
    },
  }
  paymentForm.submitData({ payload })
}

function lockPaymentSession(paymentForm) {
  return patchForm(paymentForm.paymentSessionUrl(), {
    transaction_id: payRequestId,
    'payment[method]': paymentForm.providerName,
    'payment[provider_id]': paymentForm.providerId,
  })
}

function unlockPaymentSession(paymentForm) {
  const url = appendParam(paymentForm.paymentSessionUrl(), `transaction_id=${payRequestId}`)
  return deleteJSON(url)
}

function appendParam(url, param) {
  return `${url}${url.includes('?') ? '&' : '?'}${param}`
}

async function pollForCompletion(
  paymentForm,
  {
    maxAttempts = Number(paymentForm.form.dataset.pollMaxAttempts),
    interval = Number(paymentForm.form.dataset.pollInterval),
  } = {}
) {
  const url = appendParam(paymentForm.paymentSessionUrl(), `transaction_id=${payRequestId}`)
  for (let i = 0; i < maxAttempts; i++) {
    const json = await getJSON(url)
    if (json.status === 'completed') {
      if (json.redirect_url) {
        window.location.href = json.redirect_url
      }
      return true
    }
    if (json.status === 'failed') {
      throw new Error(json.message)
    }
    // Don't sleep after the last attempt — fall through to fallback immediately
    if (i < maxAttempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, interval))
    }
  }
  return false
}

// https://docs.connect.tyro.com/app/apis/pay/error-types/
// https://docs.connect.tyro.com/app/apis/pay/errors/
async function handleFailedPayment({ message, paymentForm }) {
  // Unlock cart after failed payment
  unlockPaymentSession(paymentForm).catch(() => {})

  if (message) console.warn('[Tyro]', message)

  paymentForm.showError(paymentForm.i18n('errors.payment_failed'))
  enableForm(paymentForm)
}

function enableForm(paymentForm) {
  paymentForm.setPayButton(true)
  tyroForm.classList.remove('form-disabled')
}

function disableForm(paymentForm) {
  paymentForm.setPayButton(false)
  tyroForm.classList.add('form-disabled')
}
