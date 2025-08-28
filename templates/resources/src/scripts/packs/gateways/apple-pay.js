// PaymentForm instance will be passed as parameter
import storePathUrl from '../../theme/store-path-url'

/**
 * Initialize Apple Pay button and payment processing
 */
export class ApplePay {
  /**
   * @param {object} options
   * @param {PaymentForm} options.paymentForm - PaymentForm instance for accessing form data and methods
   * @param {Wallet} options.wallet - Wallet instance for accessing wallet functionality
   * @param {string} [options.merchantId] - Apple Pay merchant identifier (defaults to paymentForm.appleMerchantId())
   * @param {string} [options.merchantName] - Name to display in Apple Pay sheet (defaults to paymentForm.merchantName() with fallbacks)
   * @param {string} [options.providerId] - Payment provider ID for certificate lookup (defaults to paymentForm.getProviderId())
   * @param {function} options.extractTokenCallback - Function that extracts the token from the payment data as required by the ruby gateway service class
   */
  constructor({ paymentForm, wallet, merchantId, merchantName, providerId, extractTokenCallback }) {
    // Check if Apple Pay is available
    if (!window.ApplePaySession || !ApplePaySession.canMakePayments()) {
      console.log('Apple Pay is not available on this device/browser')
      return
    }
    let missingArguments = []
    if (!paymentForm) {
      missingArguments.push('paymentForm')
    }
    if (!wallet) {
      missingArguments.push('wallet')
    }
    if (!extractTokenCallback || typeof extractTokenCallback !== 'function') {
      missingArguments.push('extractTokenCallback')
    }
    if (missingArguments.length > 0) {
      console.error(`Apple Pay missing arguments: ${missingArguments.join(', ')}`)
      return
    }

    this.paymentForm = paymentForm
    this.wallet = wallet
    this.merchantId = merchantId || paymentForm.appleMerchantId()
    this.merchantName =
      merchantName ||
      paymentForm.merchantName() ||
      paymentForm.appleMerchantName() ||
      paymentForm.googleMerchantName()
    this.providerId = providerId || paymentForm.getProviderId()
    this.extractTokenCallback = extractTokenCallback

    // Validate computed defaults
    if (!this.merchantId) {
      console.error(
        'Apple Pay missing merchantId: could not get value from paymentForm.appleMerchantId()'
      )
      return
    }
    if (!this.merchantName) {
      console.error('Apple Pay missing merchantName: could not get value from paymentForm methods')
      return
    }
    if (!this.providerId) {
      console.error(
        'Apple Pay missing providerId: could not get value from paymentForm.getProviderId()'
      )
      return
    }

    // Initialize Apple Pay
    this.checkApplePayAvailability()

    // Test mode support
    if (window.StoreConnectTestMode === 'enabled') {
      window.testApplePayCallback = async () => {
        this.handleWalletError({
          error: { message: `testApplePayCallback: put your right foot in` },
        })

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
        const payload = this.extractTokenCallback(paymentData)
        this.handleWalletError({ error: payload })
        this.paymentForm.submitData({ payload })
      }
    }
  }

  /**
   * Apple Pay API version
   */
  applePayVersion = 3

  /**
   * Supported payment networks for Apple Pay
   */
  supportedNetworks = ['visa', 'masterCard', 'amex', 'discover', 'jcb']

  /**
   * Merchant capabilities for Apple Pay
   */
  merchantCapabilities = ['supports3DS']

  /**
   * Create Apple Pay payment request
   */
  createPaymentRequest() {
    const paymentRequest = {
      countryCode: this.paymentForm.merchantCountryCode() || 'US',
      currencyCode: this.paymentForm.currency(),
      supportedNetworks: this.supportedNetworks,
      merchantCapabilities: this.merchantCapabilities,
      total: {
        label: this.merchantName,
        amount: this.paymentForm.totalPayable(),
        type: 'final',
      },
    }

    if (this.paymentForm.onlyExpressCheckout()) {
      if (this.paymentForm.offerShipping()) {
        paymentRequest.requiredShippingContactFields = ['name', 'phone', 'email', 'postalAddress']
        paymentRequest.shippingType = 'shipping'

        // Set allowed shipping countries
        const allowedCountries = this.paymentForm.allowedShippingCountries()
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
  onApplePayButtonClicked() {
    const paymentRequest = this.createPaymentRequest()
    const session = new ApplePaySession(this.applePayVersion, paymentRequest)

    session.onvalidatemerchant = async (event) => {
      try {
        // Validate merchant with Apple Pay servers
        const response = await fetch(storePathUrl('/checkout/apple_pay_verifications'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider_id: this.providerId,
            authenticity_token: this.paymentForm.formAuthentityToken(),
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
        this.wallet.showWalletsError(
          error.message || 'Apple Pay setup failed. Please try another payment method.'
        )
      }
    }

    session.onshippingcontactselected = async (event) => {
      if (!this.paymentForm.offerShipping()) {
        session.completeShippingContactSelection({
          status: ApplePaySession.STATUS_SUCCESS,
          newShippingMethods: [],
          newTotal: {
            label: this.merchantName,
            amount: this.paymentForm.totalPayable(),
            type: 'final',
          },
        })
        return
      }

      try {
        const shippingContact = event.shippingContact
        const shippingOptions = await this.wallet.fetchShippingRates({
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
              label: this.merchantName,
              amount: this.paymentForm.totalPayable(),
            },
          })
          return
        }

        // Set default shipping rate
        const response = await this.wallet.setShippingRate({
          id: shippingOptions.defaultShippingRateId,
        })
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
            label: this.merchantName,
            amount: (amount / 100).toFixed(2),
          },
        })
      } catch (error) {
        console.error('Apple Pay shipping contact error:', error)
        session.completeShippingContactSelection({
          status: ApplePaySession.STATUS_FAILURE,
          newShippingMethods: [],
          newTotal: {
            label: this.merchantName,
            amount: this.paymentForm.totalPayable(),
          },
        })
      }
    }

    session.onshippingmethodselected = async (event) => {
      try {
        const response = await this.wallet.setShippingRate({ id: event.shippingMethod.identifier })
        if (response.error) {
          throw new Error(response.error.message)
        }

        const amount = response.amount

        // Store shipping method for later use in payment authorization
        session._selectedShippingMethodId = event.shippingMethod.identifier

        session.completeShippingMethodSelection({
          status: ApplePaySession.STATUS_SUCCESS,
          newTotal: {
            label: this.merchantName,
            amount: (amount / 100).toFixed(2),
            type: 'final',
          },
        })
      } catch (error) {
        console.error('Apple Pay shipping method error:', error)
        session.completeShippingMethodSelection({
          status: ApplePaySession.STATUS_FAILURE,
          newTotal: {
            label: this.merchantName,
            amount: this.paymentForm.totalPayable(),
            type: 'final',
          },
        })
      }
    }

    session.onpaymentauthorized = async (event) => {
      try {
        const paymentData = event.payment

        // Create cart with shipping and billing info for express checkout
        if (this.paymentForm.onlyExpressCheckout()) {
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
            authenticity_token: this.paymentForm.formAuthentityToken(),
            dedicated_cart_product_id: this.paymentForm.dedicatedCartProductId,
          }

          const res = await fetch(storePathUrl(`/express_checkout/carts`), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
          })

          if (!res.ok) {
            const { error } = await res.json()
            if (error) {
              this.handleWalletError({ error })
              session.completePayment(ApplePaySession.STATUS_FAILURE)
              return
            }
          }
        }

        session.completePayment(ApplePaySession.STATUS_SUCCESS)

        // Process the payment with the gateway
        const payload = this.extractTokenCallback(paymentData)
        if (this.paymentForm.dedicatedCartProductId) {
          payload.dedicated_cart_product_id = this.paymentForm.dedicatedCartProductId
        }
        this.paymentForm.submitData({ payload })
      } catch (error) {
        console.error('Apple Pay payment authorization error:', error)
        session.completePayment(ApplePaySession.STATUS_FAILURE)
        this.handleWalletError({ error: { message: error.message } })
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
  addApplePayButton() {
    const walletsContainer = this.wallet.walletsElement()
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

    button.addEventListener('click', () => this.onApplePayButtonClicked())
    walletsContainer.appendChild(
      this.paymentForm.wrapOuterElement({ element: button, classNames: 'sc-grow' })
    )
  }

  /**
   * Check if Apple Pay is available and can make payments with active card
   */
  checkApplePayAvailability() {
    if (ApplePaySession.applePayCapabilities) {
      ApplePaySession.applePayCapabilities(this.merchantId)
        .then((canMakePayments) => {
          console.log('checkApplePayAvailability', this.merchantId, canMakePayments)
          if (canMakePayments) {
            this.addApplePayButton()
          }
        })
        .catch((error) => {
          console.error('Apple Pay availability check failed:', error)
        })
    } else {
      // Fallback for older browsers
      this.addApplePayButton()
    }
  }

  handleWalletError({ error, event }) {
    if (error) {
      if (error.message) {
        this.wallet.showWalletsError(error.message)
      } else {
        this.wallet.showWalletsError(JSON.stringify(error))
      }
    }
    if (event) {
      event.reject()
    }
  }
}
