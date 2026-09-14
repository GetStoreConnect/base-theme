// Reusable PayPal Fastlane client for the recognized-member flow. Mirrors the
// Wallet class: constructed with a PaymentForm and the loaded PayPal SDK. Only
// renders components into caller-supplied containers, so page placement and
// orchestration stay with the caller.
export class Fastlane {
  constructor(paymentForm, paypal, sdkOptions = {}) {
    this.paymentForm = paymentForm
    this.paypal = paypal
    this._sdkOptions = sdkOptions
    this._sdk = null
    this._profileData = null
    this._customerContextId = null
    this._paymentComponent = null
  }

  // Lazily create the SDK instance, memoizing the promise so concurrent
  // callers share a single init. Clear the cache on failure so a later call
  // can retry rather than re-await a permanently-rejected promise.
  async ensureSdk() {
    this._sdk ??= Promise.resolve(this.paypal.Fastlane(this._sdkOptions)).catch((error) => {
      this._sdk = null
      throw error
    })
    return this._sdk
  }

  // identity.lookupCustomerByEmail -> whether a Fastlane/PayPal profile exists.
  async lookup(email) {
    try {
      const sdk = await this.ensureSdk()
      const { customerContextId } = await sdk.identity.lookupCustomerByEmail(email)
      this._customerContextId = customerContextId
      return { recognized: Boolean(customerContextId), customerContextId }
    } catch (error) {
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.lookup_failed'), {
        resetButton: false,
        metadata: { fastlane: 'lookup', message: error?.message },
      })
      return { recognized: false, customerContextId: null }
    }
  }

  // identity.triggerAuthenticationFlow -> OTP modal; stores profileData on success.
  // Surfaces a visible error on failure and rethrows so callers can branch.
  async authenticate() {
    const sdk = await this.ensureSdk()
    try {
      const { authenticationState, profileData } = await sdk.identity.triggerAuthenticationFlow(
        this._customerContextId
      )
      if (authenticationState === 'succeeded') {
        this._profileData = profileData
      } else if (authenticationState === 'canceled') {
        // A user-initiated cancel is expected, so don't report it to monitoring.
        this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.auth_canceled'), {
          report: false,
          resetButton: false,
        })
      } else {
        this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.auth_failed'), {
          resetButton: false,
        })
      }
      return { authenticationState, profileData }
    } catch (error) {
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.auth_failed'), {
        resetButton: false,
        metadata: { fastlane: 'auth', message: error?.message },
      })
      throw error
    }
  }

  // { name, shippingAddress, card } once authenticated, else null.
  get profileData() {
    return this._profileData
  }

  // Branding requirement: render the Fastlane watermark into a caller container.
  // render() takes a CSS selector, not an Element — an Element rejects with an
  // opaque "render failed". refElement guarantees the container has an id.
  async renderWatermark(container) {
    const sdk = await this.ensureSdk()
    const watermark = await sdk.FastlaneWatermarkComponent({ includeAdditionalInfo: true })
    watermark.render(`#${container.id}`)
    return watermark
  }

  // profile.showShippingAddressSelector -> { selectionChanged, selectedAddress }
  async showShippingAddressSelector() {
    const sdk = await this.ensureSdk()
    return sdk.profile.showShippingAddressSelector()
  }

  // profile.showCardSelector -> { selectionChanged, selectedCard }
  async showCardSelector() {
    const sdk = await this.ensureSdk()
    return sdk.profile.showCardSelector()
  }

  // Render the payment component (member/saved-card mode) into a caller container.
  // render() takes a CSS selector — see renderWatermark.
  async renderPaymentComponent(container, options = {}) {
    const sdk = await this.ensureSdk()
    this._paymentComponent = await sdk.FastlanePaymentComponent(options)
    this._paymentComponent.render(`#${container.id}`)
    return this._paymentComponent
  }

  // paymentComponent.getPaymentToken -> single_use_token (valid 3h).
  async getPaymentToken() {
    if (!this._paymentComponent) {
      throw new Error('Fastlane payment component not rendered before getPaymentToken()')
    }
    try {
      const { id } = await this._paymentComponent.getPaymentToken()
      return id
    } catch (error) {
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.token_failed'), {
        resetButton: false,
        metadata: { fastlane: 'token', message: error?.message },
      })
      throw error
    }
  }

  // Submit the single_use_token; the backend routes it to execute_fastlane!.
  // The flow is multi-step/async, so callers must guard against double-submit.
  submit(singleUseToken) {
    this.paymentForm.submitData({
      payload: { payment_source: { single_use_token: singleUseToken } },
    })
  }
}
