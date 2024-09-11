import { init, loadScript, showError, submitData, formElement } from './common'
import { apiKey, currency, showWallets, totalPayable, apiMode } from './form';

window.StoreConnect = window.StoreConnect || {}
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {}

window.StoreConnect.Gateways.Square = async function ({
  providerId,
  firstname,
  lastname,
  email,
  phone,
  billingStreet,
  billingCity,
  billingCountry
}) {
  init("Square", providerId, createToken)

  let card;
  let payments;

  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize()
    if (tokenResult.status === 'OK') {
      return tokenResult.token
    } else {
      throw new Error(
        `Tokenization errors: ${JSON.stringify(tokenResult.errors)}`
      )
    }
  }

  async function createToken() {
    try {
      const tokId = await tokenize(card)
      const verificationToken = await verifyBuyer(payments, tokId)

      const payload = {
        payment_source: {
          tok_id: tokId,
          verification_token: verificationToken
        }
      }
      submitData({ payload })
    } catch (e) {
      console.error(e.message)
      // this will re-enable the form button but
      // not show a message, which is what we want
      // because Square already shows an err msg
      showError(null)
    }
  }

  async function verifyBuyer(payments, token) {
    const verificationDetails = {
      amount: totalPayable(),
      billingContact: {
        givenName: firstname,
        familyName: lastname,
        email: email,
        phone: phone,
        addressLines: [billingStreet],
        city: billingCity,
        country: billingCountry,
      },
      currencyCode: currency(),
      intent: 'CHARGE',
    }

    const verificationResults = await payments.verifyBuyer(
      token,
      verificationDetails
    )
    return verificationResults.token
  }

  var squareUrl = "https://web.squarecdn.com/v1/square.js"
  if (apiMode() !== "production") {
    squareUrl = "https://sandbox.web.squarecdn.com/v1/square.js"
  }

  loadScript({
    url: squareUrl, onload: async function () {
      if (!window.Square) {
        throw new Error('Square.js failed to load properly')
      }

      const applicationId = apiKey()
      const locationId = formElement().dataset.locationId;
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
          currencyCode: currency(),
          total: {
            amount: totalPayable(),
            label: 'Total',
          }
        })
      }

      async function initializeApplePay(payments) {
        const paymentRequest = buildPaymentRequest(payments)

        // No need to attach the Apple Pay button to the DOM element
        return payments.applePay(paymentRequest)
      }

      if (showWallets()) {
        // Google Pay
        const googlePayButtonId = `SquareGooglePaymentButton${providerId}`
        if (document.getElementById(googlePayButtonId)) {
          if (document.querySelector(`#${googlePayButtonId}`)) {
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
                      verification_token: verificationToken
                    }
                  }
                  submitData({ payload })
                })
            } catch (e) {
              console.error('Initializing Google Pay failed', e)
              // There are a number of reason why Google Pay may not be supported
              // (e.g. Browser Support, Device Support, Account). Therefore you should handle
              // initialization failures, while still loading other applicable payment methods.
            }
          }
        }

        // Apple Pay
        const userAgent = navigator.userAgent
        const isSafari = userAgent.includes('Safari') && !userAgent.includes("Chrome")
        const applePayButton = document.getElementById(`SquareApplePaymentButton${providerId}`)
        if (applePayButton) {
          if (window.mockSquare || isSafari) {
            try {
              const applePay = await initializeApplePay(payments)

              applePayButton.addEventListener('click', async () => {
                const tokenResult = await applePay.tokenize()

                const payload = {
                  payment_source: {
                    tok_id: tokenResult['token'],
                  }
                }
                submitData({ payload })
              })
            } catch (e) {
              console.error('Initializing Apple Pay failed', e)
              // There are a number of reason why Apple Pay may not be supported
              // (e.g. Browser Support, Device Support, Account). Therefore you should handle
              // initialization failures, while still loading other applicable payment methods.

              applePayButton.parentNode.removeChild(applePayButton)
            }
          } else if (applePayButton) {
            applePayButton.parentNode.removeChild(applePayButton)
          }
        }
      } else {
        const container = document.getElementById(`SquareWalletsContainer${providerId}`)
        if (container) {
          container.remove();
        }
      }
    }
  })
}
