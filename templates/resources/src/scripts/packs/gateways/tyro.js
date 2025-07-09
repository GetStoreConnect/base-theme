import { init, showError, hideError, setPayButton, submitData } from './common'
import { callbackUrl, showWallets } from './form'
import { onDomChange } from '../../theme/utils/init'
import fetchWithResponseHandler from '../../theme/utils/fetch'

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

let tyro
let tyroForm

function initTyro({ form }) {
  init(form, tyroSubmitPayment)
  setPayButton(false)

  fetchWithResponseHandler(callbackUrl(), {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
  }).then((json) => {
    if (json.message) {
      showError(json.message)
      return
    }

    payRequestId = json.token.id
    paySecret = json.token.paySecret

    initializeTyro(form)
  })
}

async function initializeTyro(form) {
  tyro = Tyro({
    liveMode: form.dataset.apiMode === 'production',
  })

  // If an error generating pay request/pay secret, show the error message
  if (form.dataset.error) {
    showError(form.dataset.error)
    return
  }

  try {
    setPayButton(false)
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
          enabled: showWallets(),
        },
        googlePay: {
          enabled: showWallets(),
        },
        creditCardForm: {
          enabled: true,
        },
      },
    })

    payForm.setReadyListener(() => {
      // Enable the pay button after the form is ready
      setPayButton(true)
    })

    payForm.setWalletPaymentBeginListener((_) => {
      disableForm()
    })

    payForm.setWalletPaymentCancelledListener((_) => {
      enableForm()
    })

    payForm.setWalletPaymentCompleteListener(tyroWalletPaymentComplete)

    // Inject the Tyro form
    const inlineFormId = `${form.id}[data-ref="inline-form"]`
    tyroForm = document.querySelector(inlineFormId)
    payForm.inject(inlineFormId)
  } catch (error) {
    showError(error.message)
  }
}

// https://docs.connect.tyro.com/app/apis/pay/tyro-js/submit-pay/
async function tyroSubmitPayment() {
  disableForm()
  hideError()

  try {
    await tyro.submitPay()
    // Primarily submitPay() raises an error if payment
    // fails and is handled by the error handler below.
    // But perhaps the error outcome only discovered
    // by fetchPayRequest().
    processPaymentOutcome()
  } catch (error) {
    handleFailedPayment({ message: error.errorMessage, error })
  }
}

async function tyroWalletPaymentComplete(paymentType, error) {
  if (error) {
    handleFailedPayment({ message: error.errorMessage, error })
    return
  }
  try {
    processPaymentOutcome()
  } catch (error) {
    handleFailedPayment({ message: error.errorMessage, error })
  }
}

async function processPaymentOutcome() {
  const payRequest = await tyro.fetchPayRequest()
  if (payRequest.status !== 'SUCCESS') {
    handleFailedPayment({ message: payRequest.errorMessage, error: payRequest })
    return
  }

  // Send the original pay request ID to the server
  // so it can confirm the payment was real and successful
  // and complete the payment
  const payload = {
    payment_source: {
      tok_id: payRequestId,
    },
  }
  submitData({ payload })
}

// https://docs.connect.tyro.com/app/apis/pay/error-types/
// https://docs.connect.tyro.com/app/apis/pay/errors/
async function handleFailedPayment({ message, error }) {
  let errorMessage = message
  if (!errorMessage) {
    const payRequest = await tyro.fetchPayRequest()
    errorMessage = payRequest.errorMessage
  }

  if (error?.type === 'CLIENT_VALIDATION_ERROR') {
    // Ignore these errors as they're handled by validation
  } else {
    showError(errorMessage)
  }

  enableForm()
}

function enableForm() {
  setPayButton(true)
  tyroForm.classList.remove('form-disabled')
}

function disableForm() {
  setPayButton(false)
  tyroForm.classList.add('form-disabled')
}
