import { dedicatedCartProductId, loadScript, showError, submitData } from './common'
import { isProduction, currency, merchantCountryCode, totalPayable, wrapOuterElement } from './form'
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
 * Initialize native Google Pay JS web button
 *
 * @param {object} options
 * @param {string} options.merchantId - A merchant ID is available for a production environment after approval by Google
 * @param {string} options.merchantName - Name to present on Google Pay window
 * @param {string} options.gateway - Gateway name, e.g. 'cybersource' {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
 * @param {string} options.gatewayMerchantId - This is the merchant ID for the gateway, e.g. for CyberSource this is their merchant ID
 * @param {function} options.extractTokenCallback - Function that extracts the token from the payment data as required by the ruby gateway service class
 */
export async function initGooglePayForm({
  merchantId,
  merchantName,
  gateway,
  gatewayMerchantId,
  extractTokenCallback,
}) {
  let missingArguments = []
  if (!merchantId) {
    missingArguments.push('merchantId')
  }
  if (!merchantName) {
    missingArguments.push('merchantName')
  }
  if (!gateway) {
    missingArguments.push('gateway')
  }
  if (!gatewayMerchantId) {
    missingArguments.push('gatewayMerchantId')
  }
  if (!extractTokenCallback || typeof extractTokenCallback !== 'function') {
    missingArguments.push('extractTokenCallback')
  }
  if (missingArguments.length > 0) {
    console.error(`Google Pay missing arguments: ${missingArguments.join(', ')}`)
    return
  }

  /**
   * An initialized google.payments.api.PaymentsClient object or null if not yet set.
   * Initialized in {@link getGooglePaymentsClient}
   *
   * @see {@link getGooglePaymentsClient}
   */
  let paymentsClient = null

  /**
   * Define the version of the Google Pay API referenced when creating your
   * configuration
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest}
   */
  const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
  }

  /**
   * Card networks supported by your site and your gateway
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters}
   */
  const allowedCardNetworks = ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']

  /**
   * Card authentication methods supported by your site and your gateway
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters}
   */
  const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS']

  /**
   * Identify your gateway and your site's gateway merchant identifier
   *
   * The Google Pay API response will return an encrypted payment method capable
   * of being charged by a supported gateway after payer authorization
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentMethodTokenizationSpecification}
   */
  const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway,
      gatewayMerchantId,
    },
  }

  function baseTransactionInfo() {
    let transactionInfo = {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      currencyCode: currency(),
    }
    if (merchantCountryCode()) {
      transactionInfo.countryCode = merchantCountryCode()
    }
    return transactionInfo
  }

  /**
   * Provide Google Pay API with a payment amount, currency, and amount status
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo}
   * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
   */
  function getGoogleTransactionInfo() {
    return Object.assign({}, baseTransactionInfo(), {
      totalPrice: totalPayable(),
    })
  }
  /**
   * Describe your site's support for the CARD payment method and its required
   * fields
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters}
   */
  const baseCardPaymentMethod = {
    type: 'CARD',
    parameters: {
      allowedAuthMethods: allowedCardAuthMethods,
      allowedCardNetworks: allowedCardNetworks,
    },
  }

  /**
   * Describe your site's support for the CARD payment method including optional
   * fields
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters}
   */
  const cardPaymentMethod = Object.assign({}, baseCardPaymentMethod, {
    tokenizationSpecification,
  })

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
  function getGoogleIsReadyToPayRequest() {
    return Object.assign({}, baseRequest, {
      allowedPaymentMethods: [baseCardPaymentMethod],
    })
  }

  /**
   * Configure support for the Google Pay API
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest}
   * @returns {object} PaymentDataRequest fields
   */
  function getGooglePaymentDataRequest() {
    const paymentDataRequest = Object.assign({}, baseRequest)

    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod]
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo()
    paymentDataRequest.merchantInfo = { merchantId, merchantName }

    if (onlyExpressCheckout()) {
      // Collect email address for receipt / default for account creation
      paymentDataRequest.emailRequired = true

      if (offerShipping()) {
        // Setup shipping rates etc

        paymentDataRequest.callbackIntents = [
          'SHIPPING_ADDRESS',
          'SHIPPING_OPTION',
          'PAYMENT_AUTHORIZATION',
        ]
        paymentDataRequest.shippingAddressRequired = true
        paymentDataRequest.shippingAddressParameters = shippingAddressParameters()
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
  function shippingAddressParameters() {
    return {
      phoneNumberRequired: true,
      allowedCountryCodes: allowedShippingCountries(),
    }
  }

  /**
   * Return an active PaymentsClient or initialize
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient}
   * @returns {google.payments.api.PaymentsClient} Google Pay API client
   */
  function getGooglePaymentsClient() {
    if (paymentsClient === null) {
      paymentsClient = new google.payments.api.PaymentsClient({
        environment: isProduction() ? 'PRODUCTION' : 'TEST',
        paymentDataCallbacks: {
          onPaymentAuthorized: onPaymentAuthorized,
          onPaymentDataChanged: onPaymentDataChanged,
        },
      })
    }
    return paymentsClient
  }

  async function onPaymentAuthorized(paymentData) {
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
    //         '{"signature":"MEUCIENOChmMxC7qA2b6slXA8B9Rzn/oSzlYAC0SwL3JQdRaAiEA++1hmglVOigVIsSut7hi9lvPQ+dX8guips6k9c5sHs8\\u003d","protocolVersion":"ECv1","signedMessage":"{\\"encryptedMessage\\":\\"p7nWg0fQtP9TX8oiDEClzvb4bawSjhlhZRyM0raTqp9fbJZQFU5UQP/W6WNtAGwlVB3hQvhHoPTBB6xrkfrwRMrYW1zpT6ZVrFVD9rGYCU1ioZD7CFA6id8HBMgRCw/YmrfK35Pjmge7H0d7iMSD2KqVqKx3I839uRIT5kj3hk0w2Gt/mLyY1fNbNldI8U4U4MQUTRhrDgJHkA0/cvfWEe3BiHDW0hANscTs6eI6HQWwi44rMD+f2CjfqmBVX5ELfIIftXPx4WEZEAYr9rc19ee5/NYe6PJ/j8r9fYeMmLMlcdauepwD3KGYexGV9cm8DBNoYpsj0CNxGI3dDe9RIJjgCHuT9jPEdV1+QWYo65N9BTEWdA7vZcA2eqWo8zx053SwCXiFn0iX57vbLlTh61GpIp9YM7MDccSj/LG+EpVXqyJiqrT3LqGuSA8\\\\u003d\\",\\"ephemeralPublicKey\\":\\"BOojpOcX5BJUIv7LK1ri9EexFzoz791pQo4njTYj31W8UuwUUn4W5FK+Ls52NPMvzx4yumCdaHy/YXxbWR9RiuQ\\\\u003d\\",\\"tag\\":\\"BpRVrMFQ7AQRhK+cRiR2KnBGKkBbqaG/GGtWckPp1RQ\\\\u003d\\"}"}',
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
    const payload = {
      billing_details: {
        name: paymentData.shippingAddress.name,
        email: paymentData.email,
        phone: paymentData.shippingAddress.phoneNumber,
        address: {
          line1: paymentData.shippingAddress.address1,
          line2: paymentData.shippingAddress.address2,
          city: paymentData.shippingAddress.locality,
          state: paymentData.shippingAddress.administrativeArea,
          postal_code: paymentData.shippingAddress.postalCode,
          country: paymentData.shippingAddress.countryCode,
        },
      },
      shipping_address: {
        name: paymentData.shippingAddress.name,
        address: {
          line1: paymentData.shippingAddress.address1,
          line2: paymentData.shippingAddress.address2,
          city: paymentData.shippingAddress.locality,
          state: paymentData.shippingAddress.administrativeArea,
          postal_code: paymentData.shippingAddress.postalCode,
          country: paymentData.shippingAddress.countryCode,
        },
      },
      shipping_rate: paymentData.shippingOptionData,
      authenticity_token: formAuthentityToken(),
      dedicated_cart_product_id: dedicatedCartProductId, // If dedicated product page; else null
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
        return {
          transactionState: 'ERROR',
          error: {
            reason: 'PAYMENT_DATA_INVALID',
            message: error.message,
            intent: 'PAYMENT_AUTHORIZATION',
          },
        }
      }
    }

    return {
      transactionState: 'SUCCESS',
    }
  }

  async function onPaymentDataChanged(intermediatePaymentData) {
    const callbackTrigger = intermediatePaymentData.callbackTrigger
    switch (callbackTrigger) {
      case 'INITIALIZE':
      case 'SHIPPING_ADDRESS':
        return fetchShippingOptions(intermediatePaymentData.shippingAddress)
      case 'SHIPPING_OPTION':
        return selectShippingOption(intermediatePaymentData.shippingOptionData)
    }

    return {}
  }

  async function fetchShippingOptions({ countryCode, postalCode, locality, administrativeArea }) {
    const shippingOptions = await fetchShippingRates({
      country: countryCode,
      postal_code: postalCode,
      city: locality,
      state: administrativeArea,
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

    const response = await setShippingRate({ id: shippingOptions.defaultShippingRateId })
    const amount = response.amount

    const priceFormatter = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: currency(),
    })

    return {
      newTransactionInfo: Object.assign({}, baseTransactionInfo(), {
        totalPrice: (amount / 100).toFixed(2),
      }),
      newShippingOptionParameters: {
        defaultSelectedOptionId: shippingOptions.defaultShippingRateId,
        shippingOptions: shippingOptions.shippingRates.map((rate) => {
          let description = `FREE ${rate.deliveryEstimate}`
          if (rate.amount > 0) {
            const price = priceFormatter.format(rate.amount / 100)
            description = `${price} ${rate.deliveryEstimate}`
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

  async function selectShippingOption({ id }) {
    const response = await setShippingRate({ id })
    if (response.error) {
      showError(response.error.message)
      return
    }
    const amount = response.amount
    return {
      newTransactionInfo: Object.assign({}, baseTransactionInfo(), {
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
  function onGooglePayLoaded() {
    const paymentsClient = getGooglePaymentsClient()
    paymentsClient
      .isReadyToPay(getGoogleIsReadyToPayRequest())
      .then(function (response) {
        if (response.result) {
          addGooglePayButton()
        }
      })
      .catch(function (err) {
        showError(err)
      })
  }

  /**
   * Add a Google Pay purchase button alongside an existing checkout button
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions}
   * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines}
   */
  function addGooglePayButton() {
    const walletsContainer = walletsElement()
    if (!walletsContainer) {
      console.error('Cannot setup Google Pay button: no wallets container found')
      return
    }

    const paymentsClient = getGooglePaymentsClient()
    const button = paymentsClient.createButton({
      onClick: onGooglePaymentButtonClicked,
      buttonColor: 'default',
      buttonSizeMode: 'fill',
    })

    walletsContainer.appendChild(wrapOuterElement({ element: button, classNames: 'sc-grow' }))
  }

  /**
   * Show Google Pay payment sheet when Google Pay payment button is clicked
   */
  function onGooglePaymentButtonClicked() {
    const paymentDataRequest = getGooglePaymentDataRequest()
    const paymentsClient = getGooglePaymentsClient()
    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then(function (paymentData) {
        processPayment(paymentData)
      })
      .catch(function (err) {
        console.error(err)
        if (err && err.statusCode === 'CANCELED') {
          // Do nothing if user closed the Payment Request UI
          return
        }
        showError(err)
      })
  }

  /**
   * Process payment data returned by the Google Pay API
   *
   * @param {object} paymentData response from Google Pay API after user approves payment
   * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData}
   */
  function processPayment(paymentData) {
    const payload = extractTokenCallback(paymentData)

    if (dedicatedCartProductId) {
      payload.dedicated_cart_product_id = dedicatedCartProductId
    }
    submitData({ payload })
  }

  loadScript({
    url: 'https://pay.google.com/gp/p/js/pay.js',
    onload: onGooglePayLoaded,
  })

  if (window.StoreConnectTestMode === 'enabled') {
    window.testGooglePayCallback = async () => {
      handleWalletError({ error: { message: `testGooglePayCallback: put your left foot in` } })

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
