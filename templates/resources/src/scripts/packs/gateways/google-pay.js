// PaymentForm instance will be passed as parameter
import fetchWithResponseHandler from '../../theme/utils/fetch'
import storePathUrl from '../../theme/store-path-url'

/**
 * Initialize native Google Pay JS web button
 */
export class GooglePay {
  /**
   * @param {object} options
   * @param {PaymentForm} options.paymentForm - PaymentForm instance for accessing form data and methods
   * @param {Wallet} options.wallet - Wallet instance for accessing wallet functionality
   * @param {string} [options.merchantId] - A merchant ID is available for a production environment after approval by Google (defaults to paymentForm.googleMerchantId())
   * @param {string} [options.merchantName] - Name to present on Google Pay window (defaults to paymentForm.merchantName() with fallbacks)
   * @param {string} options.gateway - Gateway name, e.g. 'cybersource' {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
   * @param {string} [options.gatewayMerchantId] - This is the merchant ID for the gateway, e.g. for CyberSource this is their merchant ID (defaults to paymentForm.merchantId())
   * @param {function} options.extractTokenCallback - Function that extracts the token from the payment data as required by the ruby gateway service class
   */
  constructor({
    paymentForm,
    wallet,
    merchantId,
    merchantName,
    gateway,
    gatewayMerchantId,
    extractTokenCallback,
  }) {
    let missingArguments = []
    if (!paymentForm) {
      missingArguments.push('paymentForm')
    }
    if (!wallet) {
      missingArguments.push('wallet')
    }
    if (!gateway) {
      missingArguments.push('gateway')
    }
    if (!extractTokenCallback || typeof extractTokenCallback !== 'function') {
      missingArguments.push('extractTokenCallback')
    }
    if (missingArguments.length > 0) {
      throw new Error(`👛 Google Pay missing required arguments: ${missingArguments.join(', ')}`)
    }

    this.paymentForm = paymentForm
    this.wallet = wallet
    this.merchantId = merchantId || paymentForm.googleMerchantId()
    this.merchantName =
      merchantName || paymentForm.merchantName() || paymentForm.googleMerchantName()
    this.gateway = gateway
    this.gatewayMerchantId = gatewayMerchantId || paymentForm.merchantId()
    this.extractTokenCallback = extractTokenCallback

    // Validate computed defaults
    const missingDefaults = []
    if (!this.merchantId) {
      missingDefaults.push('merchantId (from paymentForm.googleMerchantId())')
    }
    if (!this.merchantName) {
      missingDefaults.push('merchantName (from paymentForm methods)')
    }
    if (!this.gatewayMerchantId) {
      missingDefaults.push('gatewayMerchantId (from paymentForm.merchantId())')
    }

    if (missingDefaults.length > 0) {
      throw new Error(`👛 Google Pay missing required configuration: ${missingDefaults.join(', ')}`)
    }

    /**
     * An initialized google.payments.api.PaymentsClient object or null if not yet set.
     * Initialized in {@link getGooglePaymentsClient}
     *
     * @see {@link getGooglePaymentsClient}
     */
    this.paymentsClient = null

    paymentForm.loadScript({
      url: 'https://pay.google.com/gp/p/js/pay.js',
      onload: () => this.onGooglePayLoaded(),
    })

    this.setupTestMode()
  }

  /**
   * Define the version of the Google Pay API referenced when creating your
   * configuration
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest}
   */
  baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
  }

  /**
   * Card networks supported by your site and your gateway
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters}
   */
  allowedCardNetworks = ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER', 'INTERAC', 'JCB']

  /**
   * Card authentication methods supported by your site and your gateway
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters}
   */
  allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS']

  /**
   * Identify your gateway and your site's gateway merchant identifier
   *
   * The Google Pay API response will return an encrypted payment method capable
   * of being charged by a supported gateway after payer authorization
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentMethodTokenizationSpecification}
   */
  get tokenizationSpecification() {
    return {
      type: 'PAYMENT_GATEWAY',
      parameters: {
        gateway: this.gateway,
        gatewayMerchantId: this.gatewayMerchantId,
      },
    }
  }

  baseTransactionInfo() {
    const currency = this.paymentForm.currency()
    if (!currency) {
      throw new Error('👛 Google Pay requires a valid currency code')
    }

    let transactionInfo = {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      currencyCode: currency,
    }
    if (this.paymentForm.merchantCountryCode()) {
      transactionInfo.countryCode = this.paymentForm.merchantCountryCode()
    }
    return transactionInfo
  }

  /**
   * Provide Google Pay API with a payment amount, currency, and amount status
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo}
   * @param {number} amount - Amount in cents
   * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
   */
  getGoogleTransactionInfo({ amount }) {
    return Object.assign({}, this.baseTransactionInfo(), {
      // The format of the string should follow the regex format: ^[0-9]+(\.[0-9][0-9])?$
      totalPrice: (amount / 100).toFixed(2),
    })
  }
  /**
   * Describe your site's support for the CARD payment method and its required
   * fields
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters}
   */
  get baseCardPaymentMethod() {
    return {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: this.allowedCardAuthMethods,
        allowedCardNetworks: this.allowedCardNetworks,
      },
    }
  }

  /**
   * Describe your site's support for the CARD payment method including optional
   * fields
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters}
   */
  get cardPaymentMethod() {
    return Object.assign({}, this.baseCardPaymentMethod, {
      tokenizationSpecification: this.tokenizationSpecification,
    })
  }

  /**
   * Configure your site's support for payment methods supported by the Google Pay
   * API.
   *
   * Each member of allowedPaymentMethods should contain only the required fields,
   * allowing reuse of this base request when determining a viewer's ability
   * to pay and later requesting a supported payment method
   *
   * @returns {object} Google Pay API version, payment methods supported by the site
   */
  getGoogleIsReadyToPayRequest() {
    return Object.assign({}, this.baseRequest, {
      allowedPaymentMethods: [this.baseCardPaymentMethod],
    })
  }

  /**
   * Configure support for the Google Pay API
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest}
   * @param {number} [amount] - Optional amount in cents to override paymentForm.totalPayable()
   * @returns {object} PaymentDataRequest fields
   */
  getGooglePaymentDataRequest({ amount }) {
    const paymentDataRequest = Object.assign({}, this.baseRequest)

    paymentDataRequest.allowedPaymentMethods = [this.cardPaymentMethod]
    paymentDataRequest.transactionInfo = this.getGoogleTransactionInfo({ amount })
    paymentDataRequest.merchantInfo = {
      merchantId: this.merchantId,
      merchantName: this.merchantName,
    }

    if (this.paymentForm.onlyExpressCheckout()) {
      // Collect email address for receipt / default for account creation
      paymentDataRequest.emailRequired = true

      if (this.paymentForm.requiresContactInfo()) {
        // Collect shipping address for customer information (billing/contact)
        paymentDataRequest.shippingAddressRequired = true
        paymentDataRequest.shippingAddressParameters = this.shippingAddressParameters()

        // Setup shipping options for both physical and virtual products
        paymentDataRequest.callbackIntents = [
          'SHIPPING_ADDRESS',
          'SHIPPING_OPTION',
          'PAYMENT_AUTHORIZATION',
        ]
        paymentDataRequest.shippingOptionRequired = true
      }
    }

    return paymentDataRequest
  }

  /**
   * Provide Google Pay API with shipping address parameters when using dynamic buy flow.
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ShippingAddressParameters}
   * @returns {object} shipping address details, suitable for use as shippingAddressParameters property of PaymentDataRequest
   */
  shippingAddressParameters() {
    return {
      phoneNumberRequired: true,
      allowedCountryCodes: this.paymentForm.allowedShippingCountries(),
    }
  }

  /**
   * Return an active PaymentsClient or initialize
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient}
   * @returns {google.payments.api.PaymentsClient} Google Pay API client
   */
  getGooglePaymentsClient() {
    if (this.paymentsClient === null) {
      const clientConfig = {
        environment: this.paymentForm.isProduction() ? 'PRODUCTION' : 'TEST',
      }

      // Only include paymentDataCallbacks when we have callbackIntents
      // to avoid Symbol(includes) crashes when callbackIntents is undefined
      if (this.paymentForm.onlyExpressCheckout() && this.paymentForm.requiresContactInfo()) {
        clientConfig.paymentDataCallbacks = {
          onPaymentAuthorized: (paymentData) => this.onPaymentAuthorized(paymentData),
          onPaymentDataChanged: (intermediatePaymentData) =>
            this.onPaymentDataChanged(intermediatePaymentData),
        }
      }

      this.paymentsClient = new google.payments.api.PaymentsClient(clientConfig)
    }
    return this.paymentsClient
  }

  async onPaymentAuthorized(paymentData) {
    // Sample paymentData:
    // const sample = {
    //   apiVersion: 2,
    //   apiVersionMinor: 0,
    //   email: 'nic.williams@getstoreconnect.com',
    //   paymentMethodData: {
    //     description: 'SuccessfulAuth: Visa •••• 1000',
    //     info: {
    //       assuranceDetails: {
    //         accountVerified: true,
    //         cardHolderAuthenticated: false,
    //       },
    //       cardDetails: '1000',
    //       cardNetwork: 'VISA',
    //     },
    //     tokenizationData: {
    //       token:
    //         '{"signature":"MEUCIENOChmMxC7qA2b6slXA8B9Rzn/oSzlYAC0SwL3JQdRaAiEA++1hmglVOigVIsSut7hi9lvPQ+dX8guips6k9c5sHs8\u003d","protocolVersion":"ECv1","signedMessage":"{\"encryptedMessage\":\"p7nWg0fQtP9TX8oiDEClzvb4bawSjhlhZRyM0raTqp9fbJZQFU5UQP/W6WNtAGwlVB3hQvhHoPTBB6xrkfrwRMrYW1zpT6ZVrFVD9rGYCU1ioZD7CFA6id8HBMgRCw/YmrfK35Pjmge7H0d7iMSD2KqVqKx3I839uRIT5kj3hk0w2Gt/mLyY1fNbNldI8U4U4MQUTRhrDgJHkA0/cvfWEe3BiHDW0hANscTs6eI6HQWwi44rMD+f2CjfqmBVX5ELfIIftXPx4WEZEAYr9rc19ee5/NYe6PJ/j8r9fYeMmLMlcdauepwD3KGYexGV9cm8DBNoYpsj0CNxGI3dDe9RIJjgCHuT9jPEdV1+QWYo65N9BTEWdA7vZcA2eqWo8zx053SwCXiFn0iX57vbLlTh61GpIp9YM7MDccSj/LG+EpVXqyJiqrT3LqGuSA8\\u003d\",\"ephemeralPublicKey\":\"BOojpOcX5BJUIv7LK1ri9EexFzoz791pQo4njTYj31W8UuwUUn4W5FK+Ls52NPMvzx4yumCdaHy/YXxbWR9RiuQ\\u003d\",\"tag\":\"BpRVrMFQ7AQRhK+cRiR2KnBGKkBbqaG/GGtWckPp1RQ\\u003d\"}"}',
    //       type: 'PAYMENT_GATEWAY',
    //     },
    //     type: 'CARD',
    //   },
    //   shippingAddress: {
    //     address1: '48 Pirrama Road',
    //     address2: '',
    //     address3: '',
    //     administrativeArea: 'NSW',
    //     countryCode: 'AU',
    //     locality: 'Sydney',
    //     name: 'Australian User',
    //     phoneNumber: '+61 2 9374 4000',
    //     postalCode: '2009',
    //     sortingCode: '',
    //   },
    //   shippingOptionData: {
    //     id: 'Custom Shipping_0010k00000sbMwUDvC',
    //   },
    // }

    // Validate required payment data structure
    if (!paymentData || typeof paymentData !== 'object') {
      throw new Error('👛 Invalid payment data received from Google Pay')
    }

    // Only require shipping address when collecting contact info
    if (
      this.paymentForm.requiresContactInfo() &&
      (!paymentData.shippingAddress || typeof paymentData.shippingAddress !== 'object')
    ) {
      throw new Error('👛 Missing or invalid shipping address from Google Pay')
    }

    const shippingAddress = paymentData.shippingAddress
    const payload = {
      billing_details: {
        name: shippingAddress.name || '',
        email: paymentData.email || '',
        phone: shippingAddress.phoneNumber || '',
        address: {
          line1: shippingAddress.address1 || '',
          line2: shippingAddress.address2 || '',
          city: shippingAddress.locality || '',
          state: shippingAddress.administrativeArea || '',
          postal_code: shippingAddress.postalCode || '',
          country: shippingAddress.countryCode || '',
        },
      },
      shipping_address: {
        name: shippingAddress.name || '',
        address: {
          line1: shippingAddress.address1 || '',
          line2: shippingAddress.address2 || '',
          city: shippingAddress.locality || '',
          state: shippingAddress.administrativeArea || '',
          postal_code: shippingAddress.postalCode || '',
          country: shippingAddress.countryCode || '',
        },
      },
      shipping_rate: paymentData.shippingOptionData,
      dedicated_cart_product_id: this.paymentForm.dedicatedCartProductId, // If dedicated product page; else null
    }

    try {
      await fetchWithResponseHandler(storePathUrl(`/express_checkout/carts`), {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      this.handleWalletError({ error })
      return {
        transactionState: 'ERROR',
        error: {
          reason: 'PAYMENT_DATA_INVALID',
          message: error.message || this.paymentForm.i18n('errors.payment_failed'),
          intent: 'PAYMENT_AUTHORIZATION',
        },
      }
    }

    return {
      transactionState: 'SUCCESS',
    }
  }

  async onPaymentDataChanged(intermediatePaymentData) {
    const callbackTrigger = intermediatePaymentData.callbackTrigger
    switch (callbackTrigger) {
      case 'INITIALIZE':
      case 'SHIPPING_ADDRESS':
        return this.fetchShippingOptions(intermediatePaymentData.shippingAddress)
      case 'SHIPPING_OPTION':
        return this.selectShippingOption(intermediatePaymentData.shippingOptionData)
    }

    return {}
  }

  async fetchShippingOptions({ countryCode, postalCode, locality, administrativeArea }) {
    // Validate required shipping parameters
    if (!countryCode) {
      return {
        error: {
          message: 'Country code is required for shipping options',
          reason: 'INVALID_SHIPPING_ADDRESS',
          intent: 'SHIPPING_ADDRESS',
        },
      }
    }

    // For virtual products, provide a $0 dummy rate to collect address for contact info
    if (!this.paymentForm.offerShipping()) {
      const amount = Math.round(this.paymentForm.totalPayable() * 100)
      return {
        newTransactionInfo: Object.assign({}, this.baseTransactionInfo(), {
          totalPrice: (amount / 100).toFixed(2),
        }),
        newShippingOptionParameters: {
          defaultSelectedOptionId: 'virtual-product-no-shipping',
          shippingOptions: [
            {
              id: 'virtual-product-no-shipping',
              label: this.paymentForm.i18n('wallets.no_shipping_required'),
              description: this.paymentForm.i18n('wallets.free'),
            },
          ],
        },
      }
    }

    const shippingOptions = await this.wallet.fetchShippingRates({
      country: countryCode,
      postal_code: postalCode || '',
      city: locality || '',
      state: administrativeArea || '',
      street: '',
    })

    if (shippingOptions.error) {
      return {
        error: {
          message: shippingOptions.error.message,
          reason: 'ERROR_FETCHING_SHIPPING_OPTIONS',
          intent: 'SHIPPING_ADDRESS',
        },
      }
    }

    const response = await this.wallet.setShippingRate({
      id: shippingOptions.defaultShippingRateId,
    })
    const amount = response.amount

    const priceFormatter = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: this.paymentForm.currency(),
    })

    return {
      newTransactionInfo: Object.assign({}, this.baseTransactionInfo(), {
        totalPrice: (amount / 100).toFixed(2),
      }),
      newShippingOptionParameters: {
        defaultSelectedOptionId: shippingOptions.defaultShippingRateId,
        shippingOptions: shippingOptions.shippingRates.map((rate) => {
          let description = this.paymentForm.i18n('wallets.free')
          if (rate.amount > 0) {
            description = priceFormatter.format(rate.amount / 100)
          }
          if (typeof rate.deliveryEstimate === 'string' && rate.deliveryEstimate.trim() !== '') {
            description += ` - ${rate.deliveryEstimate}`
          }
          return {
            id: rate.id,
            label: rate.displayName,
            description,
          }
        }),
      },
    }
  }

  async selectShippingOption({ id }) {
    const response = await this.wallet.setShippingRate({ id })
    if (response.error) {
      this.paymentForm.showError(response.error.message)
      return
    }
    const amount = response.amount
    return {
      newTransactionInfo: Object.assign({}, this.baseTransactionInfo(), {
        totalPrice: (amount / 100).toFixed(2),
      }),
    }
  }

  /**
   * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
   *
   * Display a Google Pay payment button after confirmation of the viewer's
   * ability to pay.
   */
  onGooglePayLoaded() {
    const paymentsClient = this.getGooglePaymentsClient()
    paymentsClient
      .isReadyToPay(this.getGoogleIsReadyToPayRequest())
      .then((response) => {
        if (response.result) {
          this.addGooglePayButton()
        }
      })
      .catch((err) => console.log(err))
  }

  /**
   * Add a Google Pay purchase button alongside an existing checkout button
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions}
   * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines}
   */
  addGooglePayButton() {
    const walletsContainer = this.wallet.walletsElement()
    if (!walletsContainer) {
      console.error('Cannot setup Google Pay button: no wallets container found')
      return
    }

    const paymentsClient = this.getGooglePaymentsClient()
    const button = paymentsClient.createButton({
      onClick: () => this.onGooglePaymentButtonClicked(),
      buttonColor: 'default',
      buttonSizeMode: 'fill',
    })

    walletsContainer.appendChild(
      this.paymentForm.wrapOuterElement({ element: button, classNames: 'sc-grow' })
    )
  }

  /**
   * Show Google Pay payment sheet when Google Pay payment button is clicked
   */
  async onGooglePaymentButtonClicked() {
    const { amount, didError } = await this.wallet.prepareProductCartWithAddToCartData()
    if (didError) {
      return
    }

    const paymentDataRequest = this.getGooglePaymentDataRequest({ amount })
    const paymentsClient = this.getGooglePaymentsClient()
    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then((paymentData) => this.processPayment(paymentData))
      .catch((err) => {
        console.error(err)
        if (err && err.statusCode === 'CANCELED') {
          // Do nothing if user closed the Payment Request UI
          return
        }
      })
  }

  /**
   * Process payment data returned by the Google Pay API
   *
   * @param {object} paymentData response from Google Pay API after user approves payment
   * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData}
   */
  processPayment(paymentData) {
    const payload = this.extractTokenCallback(paymentData)

    if (this.paymentForm.dedicatedCartProductId) {
      payload.dedicated_cart_product_id = this.paymentForm.dedicatedCartProductId
    }
    this.paymentForm.submitData({
      payload,
      handleError: (error) => this.handleWalletError({ error }),
    })
  }

  handleWalletError({ error, event }) {
    if (error) {
      // Report the technical error details
      this.paymentForm.reportError(error, { context: 'google-pay-wallet' })

      // Show a generic user-friendly message
      this.wallet.showWalletsError(this.paymentForm.i18n('errors.payment_failed'), {
        report: false,
      })
    }
    if (event) {
      event.reject()
    }
  }

  /**
   * Setup test mode callback for automated testing
   * @private
   */
  setupTestMode() {
    if (window.StoreConnectTestMode === 'enabled') {
      window.testGooglePayCallback = async ({ dedicatedProductId, shippingRateId } = {}) => {
        this.handleWalletError({
          error: { message: `put your left foot in` },
        })

        // Step 1: Prepare dedicated cart if needed
        if (dedicatedProductId) {
          this.paymentForm.dedicatedCartProductId = dedicatedProductId
        }

        if (this.paymentForm.dedicatedCartProductId) {
          this.handleWalletError({
            error: {
              message: `using dedicated cart product id: ${this.paymentForm.dedicatedCartProductId}`,
            },
          })

          // On wallet click, we send the 'add-to-cart' form data to the server
          // to create a dedicated cart for the product
          const { didError } = await this.wallet.prepareProductCartWithAddToCartData()
          if (didError) {
            return
          }
        }

        // Step 2: Simulate shipping address for customer information
        const shippingAddress = {
          name: 'Test User',
          phoneNumber: '+61412345678',
          emailAddress: 'test@example.com',
          address1: '123 Test St',
          locality: 'Sydney',
          administrativeArea: 'NSW',
          postalCode: '2000',
          countryCode: 'AU',
        }

        // Step 3: Conditionally fetch/set shipping rates for physical products
        let selectedShippingRateId = null
        if (this.paymentForm.offerShipping()) {
          const shippingOptions = await this.wallet.fetchShippingRates({
            country: 'AU',
            postal_code: '2000',
            city: 'Sydney',
            state: 'NSW',
            street: '123 Test St',
          })

          if (shippingOptions.error) {
            this.handleWalletError({ error: shippingOptions.error })
            return
          }

          selectedShippingRateId = shippingRateId || shippingOptions.defaultShippingRateId
          const { error: setRateError } = await this.wallet.setShippingRate({
            id: selectedShippingRateId,
          })
          if (setRateError) {
            this.handleWalletError({ error: setRateError })
            return
          }
        }

        // Step 4: Call PUT /express_checkout/carts with customer info (matching Stripe pattern)
        const cartPayload = {
          billing_details: {
            name: shippingAddress.name,
            email: shippingAddress.emailAddress,
            phone: shippingAddress.phoneNumber,
            address: {
              line1: shippingAddress.address1,
              city: shippingAddress.locality,
              state: shippingAddress.administrativeArea,
              postal_code: shippingAddress.postalCode,
              country: shippingAddress.countryCode,
            },
          },
          shipping_address: {
            name: shippingAddress.name,
            address: {
              line1: shippingAddress.address1,
              city: shippingAddress.locality,
              state: shippingAddress.administrativeArea,
              postal_code: shippingAddress.postalCode,
              country: shippingAddress.countryCode,
            },
          },
          dedicated_cart_product_id: this.paymentForm.dedicatedCartProductId,
        }

        if (selectedShippingRateId) {
          cartPayload.shipping_rate = { id: selectedShippingRateId }
        }

        try {
          await fetchWithResponseHandler(storePathUrl(`/express_checkout/carts`), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cartPayload),
          })
        } catch (error) {
          this.handleWalletError({ error })
          return
        }

        // Step 5: Proceed with payment token submission
        const paymentData = {
          paymentMethodData: {
            tokenizationData: {
              token: JSON.stringify({ signature: 'some-value' }),
            },
            info: {
              cardNetwork: 'VISA',
              cardDetails: '1111',
            },
          },
        }
        const payload = this.extractTokenCallback(paymentData)
        if (this.paymentForm.dedicatedCartProductId) {
          payload.dedicated_cart_product_id = this.paymentForm.dedicatedCartProductId
        }
        this.handleWalletError({ error: payload })
        this.paymentForm.submitData({ payload })
      }
    }
  }
}
