import { init, errorElement, formFieldElement, submitData, showError } from './common'
import { isProduction, callbackUrl, currency, totalPayable, showWallets } from './form'
import { onDomChange } from '../../theme/utils/init'
import fetchWithResponseHandler from '../../theme/utils/fetch'

const braintree = require('braintree-web')

let clientInstance
let hostedFieldsInstance

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Braintree"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId

    initBraintree({ form, providerId })
  })
})

async function initBraintree({ form, providerId }) {
  init(form, preparePayload)

  const firstname = form.dataset.contactFirstname
  const lastname = form.dataset.contactLastname
  const email = form.dataset.contactEmail
  const phone = form.dataset.contactPhone
  const billingStreet = form.dataset.billingStreet
  const billingCity = form.dataset.billingCity
  const billingState = form.dataset.billingState
  const billingCountry = form.dataset.billingCountry
  const billingPostalCode = form.dataset.billingPostalCode

  // Get a client token from the server
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

    initializeClient(json.token)
  })

  function initializeClient(token) {
    braintree.client
      .create({
        authorization: token,
      })
      .then((clientInstance_) => {
        clientInstance = clientInstance_
        initializeHostedFields()
      })
      .catch((err) => {
        showError(err)
      })
  }

  function initializeHostedFields() {
    braintree.hostedFields.create(
      {
        client: clientInstance,
        styles: {
          input: {
            'font-size': '14px',
          },
          'input.invalid': {
            color: 'red',
          },
          'input.valid': {
            color: 'green',
          },
        },
        fields: {
          number: {
            container: formFieldElement('card_number'),
            placeholder: formFieldElement('card_number').getAttribute('data-placeholder'),
          },
          cvv: {
            container: formFieldElement('card_verification'),
            placeholder: formFieldElement('card_verification').getAttribute('data-placeholder'),
          },
          expirationDate: {
            container: formFieldElement('card_expiry'),
            placeholder: formFieldElement('card_expiry').getAttribute('data-placeholder'),
          },
        },
      },
      (hostedFieldsErr, hostedFieldsInstance_) => {
        if (hostedFieldsErr) {
          showError(hostedFieldsErr)
          return
        }

        hostedFieldsInstance = hostedFieldsInstance_
      }
    )
  }

  function preparePayload() {
    hostedFieldsInstance.tokenize((tokenizeErr, tokenPayload) => {
      if (tokenizeErr) {
        const errorMessage = errorElement().getAttribute('data-placeholder')
        showError(errorMessage)
        return
      }

      const threeDSecure = form.dataset.threeDSecure === 'true'

      if (threeDSecure) {
        prepareThreeDSecurePayload({ payload: tokenPayload })
      } else {
        const payload = {
          payment_source: {
            tok_id: tokenPayload.nonce,
            last_digits: tokenPayload.details.lastFour,
            month: tokenPayload.details.expirationMonth,
            year: tokenPayload.details.expirationYear,
          },
        }
        submitData({ payload })
      }
    })
  }

  function prepareThreeDSecurePayload({ payload }) {
    braintree.threeDSecure.create(
      { client: clientInstance, version: 2 },
      (threeDSecureErr, threeDSecureInstance) => {
        if (threeDSecureErr) {
          showError(threeDSecureErr)
          return
        }

        const amount = parseFloat(form.dataset.totalPayable).toFixed(2)
        const params = {
          amount,
          email,
          nonce: payload.nonce,
          bin: payload.details.bin,
          billingAddress: {
            givenName: firstname,
            surname: lastname,
            phoneNumber: phone,
            streetAddress: billingStreet,
            locality: billingCity,
            region: billingState,
            postalCode: billingPostalCode,
            countryCodeAlpha2: billingCountry,
          },
          additionalInformation: {
            workPhoneNumber: phone,
            shippingGivenName: firstname,
            shippingSurname: lastname,
            shippingAddress: {
              streetAddress: billingStreet,
              locality: billingCity,
              region: billingState,
              postalCode: billingPostalCode,
              countryCodeAlpha2: billingCountry,
            },
          },
          onLookupComplete: function (data, next) {
            next()
          },
        }

        threeDSecureInstance.verifyCard(params, (threeDSecureVerifyErr, response) => {
          if (threeDSecureVerifyErr) {
            showError(threeDSecureVerifyErr)
            return
          }

          const threeDSecurePayload = {
            payment: {
              provider_id: providerId,
              method: 'Braintree',
            },
            payment_source: {
              tok_id: response.nonce,
              last_digits: response.details.lastFour,
              month: response.details.expirationMonth,
              year: response.details.expirationYear,
            },
          }

          submitData({ payload: threeDSecurePayload })
        })
      }
    )
  }

  // Google Pay
  if (showWallets()) {
    let googlePay
    const environment = isProduction() ? 'PRODUCTION' : 'TEST'

    const paymentsClient = new google.payments.api.PaymentsClient({
      environment: environment,
    })

    function submitPaymentRequest(event) {
      let paymentDataRequest

      event.preventDefault()

      paymentDataRequest = googlePay.createPaymentDataRequest({
        transactionInfo: {
          currencyCode: currency(),
          totalPriceStatus: 'FINAL',
          totalPrice: totalPayable(),
        },
      })

      paymentsClient
        .loadPaymentData(paymentDataRequest)
        .then(function (paymentData) {
          return googlePay.parseResponse(paymentData)
        })
        .then(function (result) {
          const token = result.nonce
          const lastDigits = result.details.lastFour

          const payload = {
            checkout: {
              url: `/checkout/payment`,
              payment_source: {
                tok_id: token,
                last_digits: lastDigits,
              },
            },
          }
          submitData({ payload })
        })
        .catch(function (err) {
          showError(err)
        })
    }

    const googleMerchantId = form.dataset.merchantId
    const googleMerchantEnabled = googleMerchantId && googleMerchantId.length > 0
    const container = document.getElementById(`BraintreeWalletsContainer${providerId}`)

    if (container && googleMerchantEnabled) {
      fetch(callbackUrl(), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          if (json.message) {
            showError(json.message)
            return
          }
          const token = json.token

          braintree.client
            .create({
              authorization: token,
            })
            .then((clientInstance) => {
              return braintree.googlePayment.create({
                client: clientInstance,
                googlePayVersion: 2,
                googleMerchantId,
              })
            })
            .then((googlePaymentInstance) => {
              googlePay = googlePaymentInstance

              return paymentsClient.isReadyToPay({
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods:
                  googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
                existingPaymentMethodRequired: true,
              })
            })
            .then((response) => {
              if (response.result) {
                const button = paymentsClient.createButton({
                  buttonColor: 'default',
                  buttonType: 'long',
                  onClick: submitPaymentRequest,
                  id: `BraintreeGooglePayButton${providerId}`,
                  allowedPaymentMethods: [],
                })

                container.appendChild(button)
              }
            })
            .catch((err) => {
              showError(err)
            })
        })
    } else {
      container.remove()
    }
  }
}
