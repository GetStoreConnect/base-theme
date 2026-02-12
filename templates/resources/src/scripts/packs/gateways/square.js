import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'
import { Wallet } from './wallet'

const SQUARE_FORM_SELECTOR = 'form[data-provider="Square"]:not(.SC-GooglePay)'

onDomChange((node) => {
  const forms = node.querySelectorAll(SQUARE_FORM_SELECTOR)
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initSquare({ form })
    }
  })
})

async function initSquare({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => createToken(paymentForm),
  })

  // Check for conflicts - only blocks non-production forms
  if (paymentForm.hasConflict({ selector: SQUARE_FORM_SELECTOR })) return

  const wallet = new Wallet(paymentForm)

  // Helper to find Square-specific wallet buttons with backward compatibility
  function findWalletButton(dataRef, legacyIdSuffix) {
    // Try data-ref first (new approach)
    let button = wallet.walletsContainer()?.querySelector(`[data-ref="${dataRef}"]`)
    // Fall back to legacy ID
    if (!button) {
      const providerId = form.dataset.providerId
      button = document.getElementById(`${legacyIdSuffix}${providerId}`)
    }
    return button
  }

  const firstname = form.dataset.contactFirstname
  const lastname = form.dataset.contactLastname
  const email = form.dataset.contactEmail
  const phone = form.dataset.contactPhone
  const billingStreet = form.dataset.billingStreet
  const billingCity = form.dataset.billingCity
  const billingCountry = form.dataset.billingCountry

  let card
  let payments

  async function tokenize({ paymentMethod, verificationDetails }) {
    const tokenResult = await paymentMethod.tokenize(verificationDetails)

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
      const verificationDetails = {
        amount: paymentForm.totalPayable(),
        billingContact: {
          givenName: firstname,
          familyName: lastname,
          email,
          phone,
          addressLines: [billingStreet],
          city: billingCity,
          country: billingCountry,
        },
        currencyCode: paymentForm.currency(),
        intent: 'CHARGE',
        customerInitiated: true,
        sellerKeyedIn: false,
      }

      const tokId = await tokenize({ paymentMethod: card, verificationDetails })

      const payload = {
        payment_source: {
          tok_id: tokId,
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

  const squareUrl = paymentForm.isProduction()
    ? 'https://web.squarecdn.com/v1/square.js'
    : 'https://sandbox.web.squarecdn.com/v1/square.js'

  paymentForm.loadScript({
    url: squareUrl,
    onload: async function () {
      if (!window.Square) {
        throw new Error('Square.js failed to load properly')
      }

      // Used for errors; but assert that it exists immediately else error.
      const statusContainer = paymentForm.refElement('payment-status', 'PaymentStatus')

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
        paymentForm.reportError(e, {
          context: 'Square payments initialization',
          applicationId,
          locationId,
        })

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
        const cardFields = paymentForm.refElement('card-fields', 'PaymentFields')
        const card = await payments.card()
        await card.attach(cardFields)
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
        const googlePayButton = paymentForm.refElement('google-pay-button', 'GooglePaymentButton', {
          required: false,
        })
        if (googlePayButton) {
          walletTasks.push(
            (async () => {
              try {
                const paymentRequest = buildPaymentRequest(payments)
                const googlePay = await payments.googlePay(paymentRequest)
                await googlePay.attach(googlePayButton)

                googlePayButton.addEventListener('click', async function (event) {
                  event.preventDefault()

                  const verificationDetails = {
                    amount: paymentForm.totalPayable(),
                    billingContact: {
                      givenName: firstname,
                      familyName: lastname,
                      email,
                      phone,
                      addressLines: [billingStreet],
                      city: billingCity,
                      country: billingCountry,
                    },
                    currencyCode: paymentForm.currency(),
                    intent: 'CHARGE',
                    customerInitiated: true,
                    sellerKeyedIn: false,
                  }

                  const tokId = await tokenize({
                    paymentMethod: googlePay,
                    verificationDetails,
                  })

                  const payload = {
                    payment_source: {
                      tok_id: tokId,
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

        // Apple Pay
        const userAgent = navigator.userAgent
        const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome')
        const applePayButton = paymentForm.refElement('apple-pay-button', 'ApplePaymentButton', {
          required: false,
        })
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

        if (!applePayButton && !googlePayButton) {
          throw new Error(
            `Square wallets are enabled but found neither data-ref='apple-pay-button'/'google-pay-button', nor legacy ids SquareApplePaymentButton nor SquareGooglePaymentButton`
          )
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
