import { putJSON } from '../../theme/utils/fetch'
import storePathUrl from '../../theme/store-path-url'

// Drives the Fastlane module against the containers paypal_form.liquid renders,
// on both the checkout payment step and the cart's express placement (keyed off
// data-only-express-checkout): email lookup -> OTP -> profile -> rates -> pay.
// Address changes reuse the express-checkout endpoints because applying a rate
// there re-runs Checkout::ValidateShippingInformation, recomputing shipping
// cost, tax and shipping_digest -- without which the captured total would not
// match the new address and validate_shipping would bounce the shopper.
export class FastlaneCheckout {
  constructor(paymentForm, fastlane) {
    this.paymentForm = paymentForm
    this.fastlane = fastlane
    this._submitting = false
    this._lookupSeq = 0
    this._appliedRateId = null
    this._shippingInvalid = false
    this._watermarkRendered = false
    this._appliedAddress = null
    this._mutationChain = Promise.resolve()
    this._pendingMutations = 0
  }

  static containersPresent(paymentForm) {
    return Boolean(paymentForm.containerElement()?.querySelector('[data-ref="fastlane-section"]'))
  }

  async init() {
    if (this.paymentForm.form.dataset.fastlaneCheckoutInitialized) return
    this.paymentForm.form.dataset.fastlaneCheckoutInitialized = 'true'

    this.section = this.paymentForm.refElement('fastlane-section')
    this.emailInput = this.paymentForm.refElement('fastlane-email')
    this.continueButton = this.paymentForm.refElement('fastlane-continue')
    this.profilePanel = this.paymentForm.refElement('fastlane-profile')
    this.addressDisplay = this.paymentForm.refElement('fastlane-address')
    this.changeAddressButton = this.paymentForm.refElement('fastlane-change-address')
    this.shippingMethodsPanel = this.paymentForm.refElement('fastlane-shipping-methods')
    this.rateOptions = this.paymentForm.refElement('fastlane-rate-options')
    this.paymentContainer = this.paymentForm.refElement('fastlane-payment-container')
    this.payButton = this.paymentForm.refElement('fastlane-pay')
    // Cart (express) placement only; absent from the checkout-page markup.
    this.totalDisplay = this.paymentForm.refElement('fastlane-total', { required: false })

    this.continueButton.addEventListener('click', () => this.authenticate())
    this.changeAddressButton.addEventListener('click', () => this.changeAddress())
    this.payButton.addEventListener('click', () => this.pay())
    this.emailInput.addEventListener('change', () =>
      this.lookup().catch((error) => this.paymentForm.reportError(error, { fastlane: 'lookup' }))
    )
    // submitData failure path dispatches payment-processing-end via refreshForm
    document.addEventListener('store-connect.payment-processing-end', () => {
      this._submitting = false
      this._maybeEnablePayButton()
    })

    // The cart shows its watermark from the start; checkout renders it on
    // reveal instead (see lookup).
    if (this.paymentForm.onlyExpressCheckout()) await this.renderWatermark()

    if (this.emailInput.value.trim()) await this.lookup()
  }

  // Deferred until the container is visible: PayPal's component measures it,
  // and it is display:none while hidden. Clearing the flag on failure retries.
  async renderWatermark() {
    if (this._watermarkRendered) return
    this._watermarkRendered = true
    try {
      await this.fastlane.renderWatermark(this.paymentForm.refElement('fastlane-watermark'))
    } catch (error) {
      this._watermarkRendered = false
      this.paymentForm.reportError(error, { fastlane: 'watermark' })
    }
  }

  async lookup() {
    this.continueButton.classList.add('sc-hide')
    const seq = ++this._lookupSeq
    const email = this.emailInput.value.trim()
    if (!email) return
    const { recognized } = await this.fastlane.lookup(email)
    if (seq !== this._lookupSeq) return
    // Checkout hides the section until a member is recognized, so a failure
    // leaves Buttons as the only option; the cart's input stays put.
    if (!this.paymentForm.onlyExpressCheckout()) {
      this.section.classList.toggle('sc-hide', !recognized)
    }
    this.continueButton.classList.toggle('sc-hide', !recognized)
    if (recognized) await this.renderWatermark()
  }

  async authenticate() {
    let authenticationState
    try {
      ;({ authenticationState } = await this.fastlane.authenticate())
    } catch {
      return // Fastlane#authenticate already surfaced the error
    }
    if (authenticationState !== 'succeeded') return
    try {
      await this.onAuthenticated()
    } catch (error) {
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.auth_failed'), {
        resetButton: false,
        metadata: { fastlane: 'post-auth', message: error?.message },
      })
    }
  }

  async onAuthenticated() {
    this.continueButton.classList.add('sc-hide')
    this.emailInput.disabled = true
    this.profilePanel.classList.remove('sc-hide')
    this._updatePanelTotal(this.paymentForm.totalPayableFormatted())
    this.payButton.disabled = true

    await this.fastlane.renderPaymentComponent(this.paymentContainer)

    const shippingAddress = this.fastlane.profileData?.shippingAddress
    if (this.paymentForm.offerShipping() && shippingAddress) {
      await this.applyAddress(shippingAddress)
    }

    this._maybeEnablePayButton()
  }

  async changeAddress() {
    try {
      const { selectionChanged, selectedAddress } =
        await this.fastlane.showShippingAddressSelector()
      if (selectionChanged) await this.applyAddress(selectedAddress)
    } catch (error) {
      this.paymentForm.reportError(error, { fastlane: 'address-selector' })
    }
  }

  addressParams(shippingAddress) {
    const address = shippingAddress.address || {}
    return {
      street: [address.addressLine1, address.addressLine2].filter(Boolean).join('\n'),
      city: address.adminArea2,
      state: address.adminArea1,
      postal_code: address.postalCode,
      country: address.countryCode,
    }
  }

  // Serialized so overlapping selector clicks can't interleave requests, and
  // the pay button is held so we never tokenize against a cart mid-update.
  _enqueueMutation(operation) {
    this._pendingMutations += 1
    this.payButton.disabled = true
    this._mutationChain = this._mutationChain.then(operation, operation).finally(() => {
      this._pendingMutations -= 1
      this._maybeEnablePayButton()
    })
    return this._mutationChain
  }

  // The only place the pay button is re-enabled; every path routes through it.
  _maybeEnablePayButton() {
    if (this._pendingMutations === 0 && !this._submitting && !this._shippingInvalid) {
      this.payButton.disabled = false
    }
  }

  applyAddress(shippingAddress) {
    return this._enqueueMutation(() => this._applyAddressNow(shippingAddress))
  }

  async _applyAddressNow(shippingAddress) {
    // The server saves the address before computing rates, so the cart may be
    // mutated even when the PUT fails; treat shipping as invalid until a rate
    // is successfully applied.
    this._shippingInvalid = true
    const address = this.addressParams(shippingAddress)
    let response
    try {
      // shipping_only: never clobber the billing address entered at the
      // customer information step (the wallet flows omit this and keep
      // their address-doubles-as-billing behavior).
      response = await putJSON(storePathUrl('/express_checkout/shipping_methods'), {
        address,
        shipping_only: true,
      })
    } catch (error) {
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.address_update_failed'), {
        resetButton: false,
        metadata: { fastlane: 'rates', message: error?.message },
      })
      return
    }
    this._appliedAddress = shippingAddress
    this.renderAddress(shippingAddress)
    this.updateAddressSummary(shippingAddress)
    await this.renderRatePicker(response.shipping.rates)
  }

  renderAddress(shippingAddress) {
    const { name, address } = shippingAddress
    const parts = [
      name?.fullName || [name?.firstName, name?.lastName].filter(Boolean).join(' '),
      address?.addressLine1,
      address?.addressLine2,
      [address?.adminArea2, address?.adminArea1, address?.postalCode].filter(Boolean).join(' '),
      address?.countryCode,
    ].filter(Boolean)
    this.addressDisplay.textContent = parts.join(', ')
  }

  // A rate is always applied after an address change, because applying it is
  // what recomputes shipping_digest.
  async renderRatePicker(rates) {
    // Rate ids are stable across addresses, so a stale id would read as
    // still-applied against the new one.
    this._appliedRateId = null
    const currentLabel = this.section.dataset.currentShippingRateLabel
    const preselected =
      rates.find((rate) => rate.label === currentLabel) ||
      rates.find((rate) => rate.default) ||
      rates[0]

    this.rateOptions.innerHTML = ''
    const groupName = `fastlane-rate-${this.paymentForm.providerId}`
    // Markup lives in the theme so stores can restyle it; a theme that removed
    // the template still gets a functional (unstyled) picker via the fallback.
    const template = this.paymentForm.refElement('fastlane-rate-template', { required: false })
    rates.forEach((rate) => {
      const checked = rate.id === preselected.id
      const option = template
        ? this._buildCardOption(template, rate, groupName, checked)
        : this._buildPlainOption(rate, groupName, checked)
      this.rateOptions.appendChild(option)
    })
    this._syncSelectedCard()
    this.shippingMethodsPanel.classList.remove('sc-hide')

    // Already inside the mutation chain via _applyAddressNow; re-enqueueing
    // here would deadlock waiting on itself.
    await this._selectRateNow(preselected)
  }

  _buildCardOption(template, rate, groupName, checked) {
    // A malformed theme override (empty template, or missing radio/label/
    // amount nodes) falls back to the plain picker rather than killing the
    // flow with a misleading auth error.
    const card = template.content?.firstElementChild?.cloneNode(true)
    const radio = card?.querySelector('input[type="radio"]')
    const label = card?.querySelector('[data-ref="fastlane-rate-label"]')
    const amount = card?.querySelector('[data-ref="fastlane-rate-amount"]')
    if (!radio || !label || !amount) return this._buildPlainOption(rate, groupName, checked)

    radio.name = groupName
    radio.value = rate.id
    radio.checked = checked
    radio.addEventListener('change', () => {
      this._syncSelectedCard()
      this.selectRate(rate).catch((error) =>
        this.paymentForm.reportError(error, { fastlane: 'rate-select' })
      )
    })
    label.textContent = rate.label
    amount.textContent = this.formatAmount(rate.amount)
    const description = card.querySelector('[data-ref="fastlane-rate-description"]')
    if (description && rate.description) {
      description.textContent = rate.description
      description.classList.remove('sc-hide')
    }
    return card
  }

  _buildPlainOption(rate, groupName, checked) {
    const label = document.createElement('label')
    label.classList.add('sc-block')
    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = groupName
    radio.value = rate.id
    radio.checked = checked
    radio.addEventListener('change', () =>
      this.selectRate(rate).catch((error) =>
        this.paymentForm.reportError(error, { fastlane: 'rate-select' })
      )
    )
    label.appendChild(radio)
    label.appendChild(document.createTextNode(` ${rate.label} — ${this.formatAmount(rate.amount)}`))
    return label
  }

  // Mirror fulfilment.js's `is-selected` marker onto the chosen card
  // (including after an error-revert). The radio stays visible; `is-active`
  // is reserved for expanded subset cards and would hide the radio.
  _syncSelectedCard() {
    this.rateOptions.querySelectorAll('.SC-OptionCard').forEach((card) => {
      const radio = card.querySelector('input[type="radio"]')
      card.classList.toggle('is-selected', Boolean(radio && radio.checked))
    })
  }

  selectRate(rate) {
    return this._enqueueMutation(() => this._selectRateNow(rate))
  }

  async _selectRateNow(rate) {
    // Like the address PUT, /express_checkout/carts can mutate the cart and
    // still 422 (e.g. a tax-provider error after the rate was applied), so
    // shipping stays invalid until an apply succeeds.
    this._shippingInvalid = true
    let response
    try {
      response = await putJSON(storePathUrl('/express_checkout/carts'), {
        shipping_rate: { id: rate.id },
      })
    } catch (error) {
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.shipping_incomplete'), {
        resetButton: false,
        metadata: { fastlane: 'rate-apply', message: error?.message },
      })
      // _shippingInvalid is set: the cart may or may not hold the previous
      // rate, so show no selection — any radio click retries and can clear
      // the flag (re-checking the previous rate would fire no change event).
      this.rateOptions
        .querySelectorAll('input[type="radio"]')
        .forEach((radio) => (radio.checked = false))
      this._syncSelectedCard()
      return
    }
    this._appliedRateId = rate.id
    this._shippingInvalid = false
    this.section.dataset.currentShippingRateLabel = rate.label
    this.paymentForm.form.dataset.totalPayable = response.cart.amount
    if (!this.paymentForm.onlyExpressCheckout()) {
      this.updateOrderTotal(response.cart.formatted_amount)
    }
    this._updatePanelTotal(response.cart.formatted_amount)
    this.updateDeliverySummary(rate)
  }

  // Rate amounts only — they have no server-rendered counterpart to clash with.
  formatAmount(amount) {
    try {
      // Salesforce locales can arrive underscored (en_US), which Intl rejects
      // as a malformed tag.
      const locale = document.documentElement.lang?.replace('_', '-')
      return new Intl.NumberFormat(locale || undefined, {
        style: 'currency',
        currency: this.paymentForm.currency(),
      }).format(amount)
    } catch {
      return `${amount}`
    }
  }

  // Cart only: the page summary stays at the pre-shipping amount, as it does
  // for the other wallets, so the panel carries its own shipping-inclusive one.
  _updatePanelTotal(formattedAmount) {
    if (!this.totalDisplay || !formattedAmount) return
    this.totalDisplay.textContent = formattedAmount
  }

  updateAddressSummary(shippingAddress) {
    const summary = document.querySelector(
      '[data-checkout-summary-target="shipping-address"] address'
    )
    if (!summary) return
    const { address } = shippingAddress
    const cityLine = [
      address?.adminArea2,
      [address?.adminArea1, address?.postalCode].filter(Boolean).join(' '),
    ]
      .filter(Boolean)
      .join(', ')
    const lines = [address?.addressLine1, address?.addressLine2, cityLine].filter(Boolean)
    summary.innerHTML = ''
    lines.forEach((line) => {
      const div = document.createElement('div')
      div.textContent = line
      summary.appendChild(div)
    })
  }

  updateDeliverySummary(rate) {
    const summary = document.querySelector('[data-checkout-summary-target="delivery-method"]')
    if (!summary) return
    summary.textContent = `${rate.label} ${this.formatAmount(rate.amount)}`
  }

  // Checkout only — callers guard with !onlyExpressCheckout(), because on the
  // cart this element is the page summary, which stays at the pre-shipping
  // amount. Duplicates payments.js's unexported setTotalPayable.
  updateOrderTotal(formattedAmount) {
    if (!formattedAmount) return
    document.querySelectorAll('[data-order-cart-total-payable]').forEach((elem) => {
      elem.textContent = formattedAmount
    })
  }

  // Multi-step and async rather than a native form submit, so double-submit
  // has to be gated here.
  async pay() {
    if (this._submitting) return
    if (this._pendingMutations > 0) return // belt-and-braces; button should already be disabled
    if (this._shippingInvalid) {
      // A failed address change left the cart's shipping unvalidated; never
      // capture against it. Recovery: a later successful address+rate apply.
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.shipping_incomplete'), {
        resetButton: false,
        metadata: { fastlane: 'pay', message: 'shipping invalid after failed update' },
      })
      return
    }
    this._submitting = true
    this.payButton.disabled = true
    document.dispatchEvent(new CustomEvent('store-connect.payment-processing-start'))
    let token
    try {
      if (this.paymentForm.onlyExpressCheckout()) await this._confirmCustomerInformation()
      token = await this.fastlane.getPaymentToken()
    } catch {
      this._submitting = false
      this._maybeEnablePayButton()
      document.dispatchEvent(new CustomEvent('store-connect.payment-processing-end'))
      return // the failing step already surfaced its error
    }
    this.fastlane.submit(token)
  }

  // Cart only: checkout collects customer information in its own steps, but
  // here the Fastlane profile is the only source, so it has to reach the cart
  // before capture. Field shapes follow customer_information_params.
  async _confirmCustomerInformation() {
    // A failed address PUT leaves the cart without validated shipping; the
    // profile address alone must not be captured against. Fail fast instead.
    if (
      this.paymentForm.offerShipping() &&
      (!this._appliedAddress || this._appliedRateId == null)
    ) {
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.confirm_failed'), {
        resetButton: false,
        metadata: { fastlane: 'confirm', message: 'no applied address or rate' },
      })
      throw new Error('fastlane confirm without applied address/rate')
    }
    const profile = this.fastlane.profileData
    const shippingAddress = this._appliedAddress || profile?.shippingAddress
    const address = shippingAddress?.address || {}
    const name =
      shippingAddress?.name?.fullName ||
      profile?.name?.fullName ||
      [profile?.name?.firstName, profile?.name?.lastName].filter(Boolean).join(' ')
    const addressPayload = {
      line1: address.addressLine1,
      line2: address.addressLine2,
      city: address.adminArea2,
      state: address.adminArea1,
      postal_code: address.postalCode,
      country: address.countryCode,
    }
    const payload = {
      billing_details: {
        name,
        email: this.emailInput.value.trim(),
        phone: shippingAddress?.phoneNumber?.nationalNumber || null,
        address: addressPayload,
      },
      shipping_address: { address: addressPayload },
    }
    // A virtual-goods cart never applies a rate, and the guard above only runs
    // when the cart offers shipping, so omit the key rather than sending null.
    if (this._appliedRateId != null) {
      payload.shipping_rate = { id: this._appliedRateId }
    }
    try {
      await putJSON(storePathUrl('/express_checkout/carts'), payload)
    } catch (error) {
      this.paymentForm.showError(this.paymentForm.i18n('fastlane.errors.confirm_failed'), {
        resetButton: false,
        metadata: { fastlane: 'confirm', message: error?.message },
      })
      throw error
    }
  }
}
