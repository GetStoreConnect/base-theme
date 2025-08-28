import { PaymentForm } from './payment-form'
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
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => tyroSubmitPayment(paymentForm),
  })
  paymentForm.setPayButton(false)

  fetchWithResponseHandler(paymentForm.callbackUrl(), {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
  }).then((json) => {
    if (json.message) {
      paymentForm.showError(json.message)
      return
    }

    payRequestId = json.token.id
    paySecret = json.token.paySecret

    initializeTyro(paymentForm)
  })
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
      disableForm(paymentForm)
    })

    payForm.setWalletPaymentCancelledListener((_) => {
      enableForm(paymentForm)
    })

    payForm.setWalletPaymentCompleteListener((paymentType, error) => {
      tyroWalletPaymentComplete(paymentType, error, paymentForm)
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
    await tyro.submitPay()
    // Primarily submitPay() raises an error if payment
    // fails and is handled by the error handler below.
    // But perhaps the error outcome only discovered
    // by fetchPayRequest().
    processPaymentOutcome(paymentForm)
  } catch (error) {
    handleFailedPayment({ message: error.errorMessage, error, paymentForm })
  }
}

async function tyroWalletPaymentComplete(paymentType, error, paymentForm) {
  if (error) {
    handleFailedPayment({ message: error.errorMessage, error, paymentForm })
    return
  }
  try {
    processPaymentOutcome(paymentForm)
  } catch (error) {
    handleFailedPayment({ message: error.errorMessage, error, paymentForm })
  }
}

async function processPaymentOutcome(paymentForm) {
  const payRequest = await tyro.fetchPayRequest()
  if (payRequest.status !== 'SUCCESS') {
    handleFailedPayment({ message: payRequest.errorMessage, error: payRequest, paymentForm })
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
  paymentForm.submitData({ payload })
}

// https://docs.connect.tyro.com/app/apis/pay/error-types/
// https://docs.connect.tyro.com/app/apis/pay/errors/
async function handleFailedPayment({ message, error, paymentForm }) {
  let errorMessage = message
  if (!errorMessage) {
    const payRequest = await tyro.fetchPayRequest()
    errorMessage = payRequest.errorMessage
  }

  if (error?.type === 'CLIENT_VALIDATION_ERROR') {
    // Ignore these errors as they're handled by validation
  } else {
    paymentForm.showError(errorMessage)
  }

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
