import { dedicatedCartProductId, showError, submitData } from './common'
import { currency, merchantCountryCode, totalPayable, wrapOuterElement } from './form'
import {
  allowedShippingCountries,
  fetchShippingRates,
  formAuthentityToken,
  onlyExpressCheckout,
  offerShipping,
  setShippingRate,
  walletsElement,
  showWalletsError,
} from './wallets'
import storePathUrl from '../../theme/store-path-url'

/**
 * Initialize Apple Pay button and payment processing
 *
 * @param {object} options
 * @param {string} options.merchantId - Apple Pay merchant identifier
 * @param {string} options.merchantName - Name to display in Apple Pay sheet
 * @param {string} options.providerId - Payment provider ID for certificate lookup
 * @param {function} options.extractTokenCallback - Function that extracts the token from the payment data as required by the ruby gateway service class
 */
export async function initApplePayForm({
  merchantId,
  merchantName,
  providerId,
  extractTokenCallback,
}) {
  // Check if Apple Pay is available
  if (!window.ApplePaySession || !ApplePaySession.canMakePayments()) {
    console.log('Apple Pay is not available on this device/browser')
    return
  }
  let missingArguments = []
  if (!merchantId) {
    missingArguments.push('merchantId')
  }
  if (!merchantName) {
    missingArguments.push('merchantName')
  }
  if (!providerId) {
    missingArguments.push('providerId')
  }
  if (!extractTokenCallback || typeof extractTokenCallback !== 'function') {
    missingArguments.push('extractTokenCallback')
  }
  if (missingArguments.length > 0) {
    console.error(`Apple Pay missing arguments: ${missingArguments.join(', ')}`)
    return
  }

  /**
   * Apple Pay API version
   */
  const applePayVersion = 3

  /**
   * Supported payment networks for Apple Pay
   */
  const supportedNetworks = ['visa', 'masterCard', 'amex', 'discover', 'jcb']

  /**
   * Merchant capabilities for Apple Pay
   */
  const merchantCapabilities = ['supports3DS']

  /**
   * Create Apple Pay payment request
   */
  function createPaymentRequest() {
    const paymentRequest = {
      countryCode: merchantCountryCode() || 'US',
      currencyCode: currency(),
      supportedNetworks,
      merchantCapabilities,
      total: {
        label: merchantName,
        amount: totalPayable(),
        type: 'final',
      },
    }

    if (onlyExpressCheckout()) {
      if (offerShipping()) {
        paymentRequest.requiredShippingContactFields = ['name', 'phone', 'email', 'postalAddress']
        paymentRequest.shippingType = 'shipping'

        // Set allowed shipping countries
        const allowedCountries = allowedShippingCountries()
        if (allowedCountries && allowedCountries.length > 0) {
          paymentRequest.supportedCountries = allowedCountries
        }
      }
    }

    return paymentRequest
  }

  /**
   * Handle Apple Pay button click
   */
  function onApplePayButtonClicked() {
    const paymentRequest = createPaymentRequest()
    const session = new ApplePaySession(applePayVersion, paymentRequest)

    session.onvalidatemerchant = async (event) => {
      try {
        // Validate merchant with Apple Pay servers
        const response = await fetch(storePathUrl('/checkout/apple_pay_verifications'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider_id: providerId,
            authenticity_token: formAuthentityToken(),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Merchant validation failed')
        }

        const merchantSession = await response.json()
        session.completeMerchantValidation(merchantSession)
      } catch (error) {
        console.error('Apple Pay merchant validation error:', error)
        session.abort()
        showWalletsError(
          error.message || 'Apple Pay setup failed. Please try another payment method.'
        )
      }
    }

    session.onshippingcontactselected = async (event) => {
      if (!offerShipping()) {
        session.completeShippingContactSelection({
          status: ApplePaySession.STATUS_SUCCESS,
          newShippingMethods: [],
          newTotal: {
            label: merchantName,
            amount: totalPayable(),
            type: 'final',
          },
        })
        return
      }

      try {
        const shippingContact = event.shippingContact
        const shippingOptions = await fetchShippingRates({
          country: shippingContact.countryCode,
          postal_code: shippingContact.postalCode,
          city: shippingContact.locality,
          state: shippingContact.administrativeArea,
          street: shippingContact.addressLines?.[0] || '',
        })

        if (shippingOptions.error) {
          session.completeShippingContactSelection({
            status: ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS,
            newShippingMethods: [],
            newTotal: {
              label: merchantName,
              amount: totalPayable(),
            },
          })
          return
        }

        // Set default shipping rate
        const response = await setShippingRate({ id: shippingOptions.defaultShippingRateId })
        const amount = response.amount

        const shippingMethods = shippingOptions.shippingRates.map((rate) => ({
          label: rate.displayName,
          amount: (rate.amount / 100).toFixed(2),
          detail: rate.deliveryEstimate,
          identifier: rate.id,
        }))

        session.completeShippingContactSelection({
          status: ApplePaySession.STATUS_SUCCESS,
          newShippingMethods: shippingMethods,
          newTotal: {
            label: merchantName,
            amount: (amount / 100).toFixed(2),
          },
        })
      } catch (error) {
        console.error('Apple Pay shipping contact error:', error)
        session.completeShippingContactSelection({
          status: ApplePaySession.STATUS_FAILURE,
          newShippingMethods: [],
          newTotal: {
            label: merchantName,
            amount: totalPayable(),
          },
        })
      }
    }

    session.onshippingmethodselected = async (event) => {
      try {
        const response = await setShippingRate({ id: event.shippingMethod.identifier })
        if (response.error) {
          throw new Error(response.error.message)
        }

        const amount = response.amount

        // Store shipping method for later use in payment authorization
        session._selectedShippingMethodId = event.shippingMethod.identifier

        session.completeShippingMethodSelection({
          status: ApplePaySession.STATUS_SUCCESS,
          newTotal: {
            label: merchantName,
            amount: (amount / 100).toFixed(2),
            type: 'final',
          },
        })
      } catch (error) {
        console.error('Apple Pay shipping method error:', error)
        session.completeShippingMethodSelection({
          status: ApplePaySession.STATUS_FAILURE,
          newTotal: {
            label: merchantName,
            amount: totalPayable(),
            type: 'final',
          },
        })
      }
    }

    session.onpaymentauthorized = async (event) => {
      try {
        const paymentData = event.payment

        // Create cart with shipping and billing info for express checkout
        if (onlyExpressCheckout()) {
          // Validate that we have required email address
          if (!paymentData.shippingContact.emailAddress) {
            throw new Error('Email address is required but was not provided by Apple Pay')
          }

          // Build shipping address first
          const shipping_address = {
            name:
              paymentData.shippingContact.givenName + ' ' + paymentData.shippingContact.familyName,
            address: {
              line1: paymentData.shippingContact.addressLines?.[0],
              line2: paymentData.shippingContact.addressLines?.[1],
              city: paymentData.shippingContact.locality,
              state: paymentData.shippingContact.administrativeArea,
              postal_code: paymentData.shippingContact.postalCode,
              country: paymentData.shippingContact.countryCode,
            },
          }

          // Build billing details from shipping address
          const billing_details = {
            name: shipping_address.name,
            email: paymentData.shippingContact.emailAddress,
            phone: paymentData.shippingContact.phoneNumber,
            address: shipping_address.address,
          }

          const payload = {
            billing_details,
            shipping_address,
            shipping_rate: { id: session._selectedShippingMethodId },
            authenticity_token: formAuthentityToken(),
            dedicated_cart_product_id: dedicatedCartProductId,
          }

          const res = await fetch(storePathUrl(`/express_checkout/carts`), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
          })

          if (!res.ok) {
            const { error } = await res.json()
            if (error) {
              handleWalletError({ error })
              session.completePayment(ApplePaySession.STATUS_FAILURE)
              return
            }
          }
        }

        session.completePayment(ApplePaySession.STATUS_SUCCESS)

        // Process the payment with the gateway
        const payload = extractTokenCallback(paymentData)
        if (dedicatedCartProductId) {
          payload.dedicated_cart_product_id = dedicatedCartProductId
        }
        submitData({ payload })
      } catch (error) {
        console.error('Apple Pay payment authorization error:', error)
        session.completePayment(ApplePaySession.STATUS_FAILURE)
        handleWalletError({ error: { message: error.message } })
      }
    }

    session.oncancel = () => {
      // User cancelled Apple Pay
      console.log('Apple Pay cancelled by user')
    }

    session.begin()
  }

  /**
   * Add Apple Pay button to the page
   */
  function addApplePayButton() {
    const walletsContainer = walletsElement()
    if (!walletsContainer) {
      console.error('Cannot setup Apple Pay button: no wallets container found')
      return
    }

    // Create Apple Pay button
    const button = document.createElement('button')
    button.className = 'apple-pay-button apple-pay-button-black'
    button.style.cssText = `
      -webkit-appearance: -apple-pay-button;
      -apple-pay-button-type: buy-now;
      -apple-pay-button-style: black;
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 8px;
    `

    button.addEventListener('click', onApplePayButtonClicked)
    walletsContainer.appendChild(wrapOuterElement({ element: button, classNames: 'sc-grow' }))
  }

  /**
   * Check if Apple Pay is available and can make payments with active card
   */
  function checkApplePayAvailability() {
    if (ApplePaySession.applePayCapabilities) {
      ApplePaySession.applePayCapabilities(merchantId)
        .then((canMakePayments) => {
          console.log('checkApplePayAvailability', merchantId, canMakePayments)
          if (canMakePayments) {
            addApplePayButton()
          }
        })
        .catch((error) => {
          console.error('Apple Pay availability check failed:', error)
        })
    } else {
      // Fallback for older browsers
      addApplePayButton()
    }
  }

  // Initialize Apple Pay
  checkApplePayAvailability()

  // Test mode support
  if (window.StoreConnectTestMode === 'enabled') {
    window.testApplePayCallback = async () => {
      handleWalletError({ error: { message: `testApplePayCallback: put your right foot in` } })

      const paymentData = {
        token: {
          paymentData: {
            data: 'test-payment-data',
            signature: 'test-signature',
            header: {
              ephemeralPublicKey: 'test-key',
              publicKeyHash: 'test-hash',
              transactionId: 'test-transaction',
            },
          },
          paymentMethod: {
            displayName: 'Visa •••• 1234',
            network: 'Visa',
            type: 'debit',
          },
          transactionIdentifier: 'test-transaction-id',
        },
      }
      const payload = extractTokenCallback(paymentData)
      handleWalletError({ error: payload })
      submitData({ payload })
    }
  }

  function handleWalletError({ error, event }) {
    if (error) {
      if (error.message) {
        showWalletsError(error.message)
      } else {
        showWalletsError(JSON.stringify(error))
      }
    }
    if (event) {
      event.reject()
    }
  }
}
