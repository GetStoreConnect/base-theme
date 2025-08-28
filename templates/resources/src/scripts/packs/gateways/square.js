import { PaymentForm } from './payment-form'
import { Wallet } from './wallet'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Square"]:not(.SC-GooglePay)')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initSquare({ form, providerId })
    }
  })
})

async function initSquare({ form, providerId }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => createToken(paymentForm),
  })
  const wallet = new Wallet(paymentForm)

  const firstname = form.dataset.contactFirstname
  const lastname = form.dataset.contactLastname
  const email = form.dataset.contactEmail
  const phone = form.dataset.contactPhone
  const billingStreet = form.dataset.billingStreet
  const billingCity = form.dataset.billingCity
  const billingCountry = form.dataset.billingCountry

  let card
  let payments

  // Returns payment token (aka nonce)
  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize()

    if (tokenResult.status === 'OK') {
      return tokenResult.token
    } else if (tokenResult.status === 'Cancel') {
      throw new Error('Payment cancelled')
    } else {
      throw new Error(`Tokenization errors: ${JSON.stringify(tokenResult.errors)}`)
    }
  }

  async function createToken(paymentForm) {
    try {
      const tokId = await tokenize(card)
      const verificationToken = await verifyBuyer(payments, tokId)

      const payload = {
        payment_source: {
          tok_id: tokId,
          verification_token: verificationToken,
        },
      }
      paymentForm.submitData({ payload })
    } catch (e) {
      console.error(e.message)
      // this will re-enable the form button but
      // not show a message, which is what we want
      // because Square already shows an err msg
      paymentForm.showError(null)
    }
  }

  async function verifyBuyer(payments, token) {
    const verificationDetails = {
      amount: paymentForm.totalPayable(),
      billingContact: {
        givenName: firstname,
        familyName: lastname,
        email: email,
        phone: phone,
        addressLines: [billingStreet],
        city: billingCity,
        country: billingCountry,
      },
      currencyCode: paymentForm.currency(),
      intent: 'CHARGE',
    }

    const verificationResults = await payments.verifyBuyer(token, verificationDetails)
    return verificationResults.token
  }

  const squareUrl = paymentForm.isProduction()
    ? 'https://web.squarecdn.com/v1/square.js'
    : 'https://sandbox.web.squarecdn.com/v1/square.js'

  paymentForm.loadScript({
    url: squareUrl,
    onload: async function () {
      if (!window.Square) {
        throw new Error('Square.js failed to load properly')
      }

      const applicationId = paymentForm.apiKey()
      const locationId = form.dataset.locationId
      try {
        // in test environments we allow the Square client to be mocked
        if (window.mockSquare) {
          payments = window.mockSquare.payments(applicationId, locationId)
        } else {
          payments = window.Square.payments(applicationId, locationId)
        }
      } catch (e) {
        Bugsnag.notify(e)

        const statusContainer = document.getElementById(`SquarePaymentStatus${providerId}`)
        statusContainer.className = 'missing-credentials'
        statusContainer.style.visibility = 'visible'
        return
      }

      try {
        card = await initializeCard(payments)
      } catch (e) {
        console.error('Square: Initializing Card failed', e)
        return
      }

      async function initializeCard(payments) {
        const card = await payments.card()
        await card.attach(`#SquarePaymentFields${providerId}`)

        return card
      }

      function buildPaymentRequest(payments) {
        return payments.paymentRequest({
          countryCode: billingCountry,
          currencyCode: paymentForm.currency(),
          total: {
            amount: paymentForm.totalPayable(),
            label: 'Total',
          },
        })
      }

      async function initializeApplePay(payments) {
        const paymentRequest = buildPaymentRequest(payments)

        // No need to attach the Apple Pay button to the DOM element
        return payments.applePay(paymentRequest)
      }

      if (paymentForm.showWallets()) {
        // Initialize Google Pay and Apple Pay in parallel
        const walletTasks = []

        // Google Pay
        const googlePayButtonId = `SquareGooglePaymentButton${providerId}`
        if (document.getElementById(googlePayButtonId)) {
          if (document.querySelector(`#${googlePayButtonId}`)) {
            walletTasks.push(
              (async () => {
                try {
                  const paymentRequest = buildPaymentRequest(payments)
                  const googlePay = await payments.googlePay(paymentRequest)
                  await googlePay.attach(`#${googlePayButtonId}`)

                  document
                    .getElementById(googlePayButtonId)
                    .addEventListener('click', async function (event) {
                      event.preventDefault()

                      const tokId = await tokenize(googlePay)
                      const verificationToken = await verifyBuyer(payments, tokId)

                      const payload = {
                        payment_source: {
                          tok_id: tokId,
                          verification_token: verificationToken,
                        },
                      }
                      paymentForm.submitData({ payload })
                    })
                } catch (e) {
                  console.error('Initializing Google Pay failed', e)
                  // There are a number of reason why Google Pay may not be supported
                  // (e.g. Browser Support, Device Support, Account). Therefore you should handle
                  // initialization failures, while still loading other applicable payment methods.
                }
              })()
            )
          }
        }

        // Apple Pay
        const userAgent = navigator.userAgent
        const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome')
        const applePayButton = document.getElementById(`SquareApplePaymentButton${providerId}`)
        if (applePayButton) {
          if (window.mockSquare || isSafari) {
            walletTasks.push(
              (async () => {
                try {
                  const applePay = await initializeApplePay(payments)

                  applePayButton.addEventListener('click', async () => {
                    const tokenResult = await applePay.tokenize()

                    const payload = {
                      payment_source: {
                        tok_id: tokenResult['token'],
                      },
                    }
                    paymentForm.submitData({ payload })
                  })
                } catch (e) {
                  console.error('Initializing Apple Pay failed', e)
                  // There are a number of reason why Apple Pay may not be supported
                  // (e.g. Browser Support, Device Support, Account). Therefore you should handle
                  // initialization failures, while still loading other applicable payment methods.

                  applePayButton.parentNode.removeChild(applePayButton)
                }
              })()
            )
          } else if (applePayButton) {
            applePayButton.parentNode.removeChild(applePayButton)
          }
        }

        // Execute all wallet initialization tasks in parallel
        if (walletTasks.length > 0) {
          await Promise.allSettled(walletTasks)
        }
      } else {
        wallet.removeWalletsContainer()
      }
    },
  })
}
