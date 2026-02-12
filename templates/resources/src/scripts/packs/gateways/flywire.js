import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'
import fetchWithResponseHandler from '../../theme/utils/fetch'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Flywire"]')
  forms.forEach((form) => {
    initFlywire({ form })
  })
})

async function initFlywire({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => handlePayment(paymentForm),
  })

  let sdk
  let elements
  let paymentElement

  // Determine SDK URL based on environment
  const flywireUrl = paymentForm.isProduction()
    ? 'https://artifacts.flywire.com/sdk/js/v0/main.js'
    : 'https://artifacts.flywire.com/sdk/js/v0/sandbox.main.js'

  paymentForm.loadScript({
    url: flywireUrl,
    onload: async function () {
      if (!window.FlywireSDK) {
        throw new Error('Flywire SDK failed to load properly')
      }
    },
  })

  async function handlePayment(paymentForm) {
    const session = await fetchWithResponseHandler(paymentForm.paymentSessionUrl(), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    })

    // Handle error messages from warnings or checkout failures
    if (session?.message) {
      paymentForm.showError(session.message)
      return
    }

    if (!session?.session_id) {
      throw new Error('Failed to create Flywire checkout session')
    }

    const sessionId = session.session_id

    try {
      sdk = await window.FlywireSDK(paymentForm.apiKey())

      // Create elements with appearance configuration
      elements = await sdk.elements({
        appearance: {
          fonts: [
            {
              url: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
              fontFamily: 'Roboto',
            },
          ],
          variables: { primaryColor: '#5a81f0' },
        },
        locale: 'en',
      })

      // Create and mount the payment element
      const hidden = true
      paymentElement = await elements.create('payment', {
        sessionId,
        displayMode: 'full-screen',
        fields: {
          country: { hidden },
          address: { hidden },
          city: { hidden },
          state: { hidden },
          zip: { hidden },
          phone: { hidden },
          email: { hidden },
        },
      })

      paymentElement.onEvent('success', (sessionResult) => {
        const payload = {
          payment_source: {
            success: sessionResult.success,
            payor_email: sessionResult.payor.email,
            confirm_url: sessionResult.confirm_url.url,
          },
        }
        paymentForm.submitData({ payload })
      })

      paymentElement.onEvent('error', (error) => {
        // {
        //     "success": false,
        //     "source": "checkout_session",
        //     "errors": [
        //         {
        //             "type": "internal_error",
        //             "message": "Internal Error. We are working on it. Try again later."
        //         }
        //     ]
        // }
        console.log(error)
        const message = error.errors[0].message
        paymentForm.showError(message)
      })

      const container = paymentForm.refElement('container-block')
      paymentElement.mount(container.id)
    } catch (error) {
      console.error('Failed to initialize Flywire:', error)
      paymentForm.showError('Failed to load payment form. Please refresh and try again.')
    }
  }
}
