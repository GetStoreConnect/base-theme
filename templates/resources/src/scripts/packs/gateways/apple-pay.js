// PaymentForm instance will be passed as parameter
import { postJSON, putJSON } from '../../theme/utils/fetch'
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
   * Express checkout collects a shipping address + rate when either:
   * - the customer is a guest (we also need their contact info), or
   * - the cart contains physical goods (offer_shipping), where shipping cost
   *   and tax can't be calculated without a chosen ship-to address and rate.
   *
   * Virtual-goods + logged-in customers use their account's address for tax
   * and don't need anything collected at the wallet sheet.
   */
  collectsShippingDetails() {
    return this.paymentForm.requiresContactInfo() || this.paymentForm.offerShipping()
  }

  /**
   * Create Apple Pay payment request
   */
  createPaymentRequest(amount, { provisional = false, lineItems = [] } = {}) {
    const displayLineItems = this.buildDisplayLineItems(lineItems)
    const paymentRequest = {
      countryCode: this.paymentForm.merchantCountryCode() || 'US',
      currencyCode: this.paymentForm.currency(),
      supportedNetworks: this.supportedNetworks,
      merchantCapabilities: this.merchantCapabilities,
      total: this.buildTotalLineItem(amount, provisional ? 'pending' : 'final'),
    }
    if (displayLineItems.length > 0) {
      paymentRequest.lineItems = displayLineItems
    }

    if (this.paymentForm.onlyExpressCheckout()) {
      // Logged-out guests need contact info; physical-goods carts always need
      // a shipping address + rate even when the customer is logged in because
      // the freshly-created express cart has neither yet.
      if (this.collectsShippingDetails()) {
        // Phone is only required from guests; logged-in customers have it on file.
        const fields = ['name', 'email', 'postalAddress']
        if (this.paymentForm.requiresContactInfo()) {
          fields.push('phone')
        }
        paymentRequest.requiredShippingContactFields = fields

        if (this.paymentForm.offerShipping()) {
          // For physical products, setup shipping
          paymentRequest.shippingType = 'shipping'

          // Set allowed shipping countries
          const allowedCountries = this.paymentForm.allowedShippingCountries()
          if (allowedCountries && allowedCountries.length > 0) {
            paymentRequest.supportedCountries = allowedCountries
          }
        }
      }
    }

    return paymentRequest
  }

  /**
   * Build the Apple Pay grand-total line item. +amountCents+ is in the minor
   * currency unit; +type+ is 'final' or 'pending' (provisional).
   */
  buildTotalLineItem(amountCents, type = 'final') {
    return {
      label: this.merchantName,
      amount: (amountCents / 100).toFixed(2),
      type,
    }
  }

  /**
   * True when Apple Pay renders the selected shipping method as its own summary
   * row on the sheet — i.e. express checkout that collects shipping. In that
   * case we must NOT also emit a shipping display line, or shipping shows twice.
   */
  applePayShowsShippingRow() {
    return this.paymentForm.onlyExpressCheckout() && this.paymentForm.offerShipping()
  }

  /**
   * Map server-provided breakdown lines to Apple Pay display line items. Server
   * amounts are already in the currency's major unit (discounts are negative).
   * The shipping line is dropped when Apple Pay already shows the chosen shipping
   * method as its own row (see applePayShowsShippingRow).
   */
  buildDisplayLineItems(lineItems) {
    const hideShipping = this.applePayShowsShippingRow()
    return (lineItems || [])
      .filter((item) => !(hideShipping && item.key === 'shipping'))
      .map((item) => ({
        label: item.label,
        amount: Number(item.amount).toFixed(2),
        type: 'final',
      }))
  }

  /**
   * Resolve the authoritative total (cents) + itemised breakdown for a session.
   * For dedicated-cart ("buy now") products this awaits the real add-to-cart
   * round trip, so the promo/tax-aware total is always used and never the stale
   * product price — awaiting also removes the race where a wallet callback could
   * run before the cart was prepared. Non-dedicated flows already carry the
   * correct total (and breakdown) on the form.
   */
  async resolvePreparedTotal(session) {
    if (session._preparedCartPromise) {
      const { amount, lineItems, didError } = await session._preparedCartPromise
      if (!didError && amount != null) {
        return { amount, lineItems }
      }
    }
    return {
      amount: Math.round(this.paymentForm.totalPayable() * 100),
      lineItems: this.paymentForm.lineItems(),
    }
  }

  /**
   * Abort the session and mark it so any in-flight callback awaiting a promise
   * (e.g. the cart preparation) skips completing an already-aborted session,
   * which would otherwise throw.
   */
  abortSession(session) {
    session._aborted = true
    session.abort()
  }

  /**
   * Cache the freshest authoritative total on the session. Shipping callbacks
   * produce a shipping-inclusive total; recording it here lets a later
   * onpaymentmethodselected (fired whenever the shopper changes card) echo that
   * total instead of reverting to the pre-shipping prepared amount.
   */
  rememberTotal(session, amount, lineItems) {
    session._resolvedAmount = amount
    session._resolvedLineItems = lineItems
    return { amount, lineItems }
  }

  /**
   * Handle Apple Pay button click
   */
  async onApplePayButtonClicked() {
    // IMPORTANT: Create ApplePaySession synchronously to maintain user gesture
    // context. For dedicated-cart ("buy now") products the real total isn't known
    // until the cart is prepared below, so seed a provisional 'pending' total;
    // every wallet callback resolves the authoritative total (see
    // resolvePreparedTotal) before the shopper can authorize.
    const isDedicatedCart = Boolean(this.paymentForm.dedicatedCartProductId)
    const initialAmount = Math.round(this.paymentForm.totalPayable() * 100)
    const paymentRequest = this.createPaymentRequest(initialAmount, {
      provisional: isDedicatedCart,
      lineItems: isDedicatedCart ? [] : this.paymentForm.lineItems(),
    })
    const session = new ApplePaySession(this.applePayVersion, paymentRequest)

    // Prepare the dedicated cart in the background. The promise is stored on the
    // session so the wallet callbacks can await the real total rather than
    // reading a stale value.
    if (isDedicatedCart) {
      session._preparedCartPromise = this.wallet.prepareProductCartWithAddToCartData()
      session._preparedCartPromise
        .then(({ didError }) => {
          if (didError) {
            this.abortSession(session)
          }
        })
        .catch((error) => {
          console.error('Failed to prepare cart:', error)
          this.abortSession(session)
          this.wallet.showWalletsError(this.paymentForm.i18n('errors.cart_failed'))
        })
    }

    session.onvalidatemerchant = async (event) => {
      try {
        // Validate merchant with Apple Pay servers
        const merchantSession = await postJSON(storePathUrl('/checkout/apple_pay_verifications'), {
          provider_id: this.providerId,
          validation_url: event.validationURL,
          domain: window.location.hostname,
        })

        session.completeMerchantValidation(merchantSession)
      } catch (error) {
        console.error('Apple Pay merchant validation error:', error)
        this.abortSession(session)
        this.wallet.showWalletsError(
          error.message || this.paymentForm.i18n('apple_pay.setup_failed')
        )
      }
    }

    // Fires when the sheet opens with the default card (and on card change).
    // This is the only callback guaranteed to run for every flow — including
    // virtual goods with no shipping step — so it is where the provisional
    // 'pending' total is resolved to the real, final amount and breakdown.
    session.onpaymentmethodselected = async () => {
      try {
        // Echo the freshest total already resolved by a prior callback (e.g. a
        // shipping step's shipping-inclusive total); only compute it from the
        // prepared cart on the first fire, before anything else has run. The
        // post-await re-check guards the case where a shipping step resolves
        // while we were still awaiting the cart preparation.
        let total
        if (session._resolvedAmount != null) {
          total = { amount: session._resolvedAmount, lineItems: session._resolvedLineItems }
        } else {
          const prepared = await this.resolvePreparedTotal(session)
          total =
            session._resolvedAmount != null
              ? { amount: session._resolvedAmount, lineItems: session._resolvedLineItems }
              : this.rememberTotal(session, prepared.amount, prepared.lineItems)
        }
        // The cart-prepare failure path may have aborted while we awaited.
        if (session._aborted) return
        session.completePaymentMethodSelection({
          newTotal: this.buildTotalLineItem(total.amount, 'final'),
          newLineItems: this.buildDisplayLineItems(total.lineItems),
        })
      } catch (error) {
        console.error('Apple Pay payment method error:', error)
        // Don't re-complete an already-aborted session (it would throw again),
        // and prefer the resolved total over the raw form value — for a
        // dedicated cart the latter is the stale pre-discount price.
        if (session._aborted) return
        const fallbackAmount =
          session._resolvedAmount != null
            ? session._resolvedAmount
            : Math.round(this.paymentForm.totalPayable() * 100)
        session.completePaymentMethodSelection({
          newTotal: this.buildTotalLineItem(fallbackAmount, 'final'),
        })
      }
    }

    session.onshippingcontactselected = async (event) => {
      // For virtual products, provide a $0 dummy rate to collect address for contact info
      if (!this.paymentForm.offerShipping()) {
        // Await the real prepared total so we never charge the stale product price.
        const prepared = await this.resolvePreparedTotal(session)
        if (session._aborted) return
        const { amount, lineItems } = this.rememberTotal(
          session,
          prepared.amount,
          prepared.lineItems
        )
        session._selectedShippingMethodId = 'virtual-product-no-shipping'
        session.completeShippingContactSelection({
          status: ApplePaySession.STATUS_SUCCESS,
          newShippingMethods: [
            {
              label: this.paymentForm.i18n('wallets.no_shipping_required'),
              amount: '0.00',
              detail: '',
              identifier: 'virtual-product-no-shipping',
            },
          ],
          newTotal: this.buildTotalLineItem(amount, 'final'),
          newLineItems: this.buildDisplayLineItems(lineItems),
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

        // Set default shipping rate. Record the id now so that if Apple auto-accepts
        // this default (single rate, or shopper never opens the method picker),
        // the later authorization payload still carries a valid shipping_rate.id.
        const response = await this.wallet.setShippingRate({
          id: shippingOptions.defaultShippingRateId,
        })
        session._selectedShippingMethodId = shippingOptions.defaultShippingRateId
        const amount = response.amount
        this.rememberTotal(session, amount, response.lineItems)

        const shippingMethods = shippingOptions.shippingRates.map((rate) => ({
          label: rate.displayName,
          amount: (rate.amount / 100).toFixed(2),
          // ApplePayShippingMethod.detail must be a DOMString; undefined throws.
          detail: rate.deliveryEstimate ?? '',
          identifier: rate.id,
        }))

        session.completeShippingContactSelection({
          status: ApplePaySession.STATUS_SUCCESS,
          newShippingMethods: shippingMethods,
          newTotal: this.buildTotalLineItem(amount, 'final'),
          newLineItems: this.buildDisplayLineItems(response.lineItems),
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
        this.rememberTotal(session, amount, response.lineItems)

        // Update the recorded shipping rate id (may have been set to the default earlier).
        session._selectedShippingMethodId = event.shippingMethod.identifier

        session.completeShippingMethodSelection({
          status: ApplePaySession.STATUS_SUCCESS,
          newTotal: this.buildTotalLineItem(amount, 'final'),
          newLineItems: this.buildDisplayLineItems(response.lineItems),
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

        // Create cart with shipping and billing info for express checkout.
        // Only when we actually asked Apple Pay to collect those fields — for
        // virtual goods + logged-in customers we use the account's stored info.
        if (this.paymentForm.onlyExpressCheckout() && this.collectsShippingDetails()) {
          // Validate that we have required email address
          if (!paymentData.shippingContact.emailAddress) {
            throw new Error(this.paymentForm.i18n('apple_pay.email_required'))
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
            dedicated_cart_product_id: this.paymentForm.dedicatedCartProductId,
          }
          if (session._selectedShippingMethodId) {
            payload.shipping_rate = { id: session._selectedShippingMethodId }
          }

          try {
            await putJSON(storePathUrl(`/express_checkout/carts`), payload)
          } catch (error) {
            this.handleWalletError({ error })
            session.completePayment(ApplePaySession.STATUS_FAILURE)
            return
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
