import { postJSON } from '../../theme/utils/fetch'
import storePathUrl from '../../theme/store-path-url'
import { loadScript as loadExternalScript } from '../../theme/load-script'

const Rails = window.Rails

export class PaymentForm {
  constructor(form, options = {}) {
    this.form = form
    this.providerName = form.dataset.provider
    this.providerId = form.dataset.providerId
    this.dedicatedCartProductId = form.dataset.dedicatedCartProductId
    this.onSubmit = options.onSubmit
    this.setPayButtonCallback = options.setPayButtonCallback
    this.legacySubmitElementId = options.legacySubmitElementId

    this._setupForm()
    if (this.onSubmit) {
      this._attachSubmitHandler()
    }
  }

  _setupForm() {
    this.form
      .querySelectorAll('input[data-disable-with], button[data-disable-with]')
      .forEach((button) => {
        const value = button.tagName === 'INPUT' ? button.value : button.innerHTML
        button.setAttribute('data-enable-with', value)
      })

    this._watchCustomAmount()
  }

  _watchCustomAmount() {
    const customAmountInput = document.getElementById('custom-payment-amount')
    if (!customAmountInput) return

    this._originalTotalPayable = this.form.dataset.totalPayable

    // The input's `max` attribute reflects the order's full remaining balance
    // (`order.total_payable`), which may exceed `data-total-payable` on deposit
    // orders where the form's default total is the deposit amount. Clamp to
    // the input's max so customers can pay above the deposit when they want to.
    const parsedMax = parseFloat(customAmountInput.max)
    const maxAmount =
      customAmountInput.max !== '' && !isNaN(parsedMax)
        ? parsedMax
        : parseFloat(this._originalTotalPayable)

    // Restore typed-but-not-yet-submitted value across soft reloads. The server
    // already pre-fills `value=` from session for failed-submit cases, so only
    // restore if the input is currently empty. Skip stale values above the
    // current max (e.g. a partial payment shrunk the balance between reloads).
    const orderRef = customAmountInput.dataset.orderRef
    const storageKey = orderRef && `additional_payment_custom_amount_${orderRef}`
    if (storageKey && !customAmountInput.value) {
      const saved = sessionStorage.getItem(storageKey)
      if (saved && parseFloat(saved) <= maxAmount) {
        customAmountInput.value = saved
        this.form.dataset.totalPayable = saved
      }
    }

    customAmountInput.addEventListener('input', () => {
      const value = parseFloat(customAmountInput.value)
      if (!isNaN(value) && value > 0) {
        const clamped = Math.min(value, maxAmount)
        this.form.dataset.totalPayable = clamped.toString()
        if (storageKey) sessionStorage.setItem(storageKey, customAmountInput.value)
      } else {
        this.form.dataset.totalPayable = this._originalTotalPayable
        if (storageKey) sessionStorage.removeItem(storageKey)
      }
    })
  }

  _attachSubmitHandler() {
    this.form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault()
        this.prepareSubmit(() => {
          if (this.onSubmit) {
            this.onSubmit(this.form)
          }
        })
      },
      false
    )
  }

  /**
   * Returns the outer container element for this payment provider form.
   */
  containerElement() {
    return this.form.closest('[data-provider-container]')
  }

  /**
   * Returns the payment error display element.
   * Prefers data-ref="payment-error" but falls back to legacy ID-based lookup.
   */
  errorElement() {
    if (this._errorElement) return this._errorElement

    let element = this.refElement('payment-error', 'PaymentError', { required: false })
    if (!element) {
      element = document.createElement('div')
      element.setAttribute('data-ref', 'payment-error')
      element.classList.add('SC-Field', 'SC-Alert', 'sc-hide')
      this.form.prepend(element)
    }
    this._errorElement = element
    return element
  }

  /**
   * Returns the payment form submit button element.
   * Prefers data-ref="submit-button" but falls back to legacy ID-based lookup.
   */
  submitElement() {
    if (this.legacySubmitElementId) {
      return this.refElement('submit-button', {
        legacyId: this.legacySubmitElementId,
        required: false,
      })
    } else {
      return this.refElement('submit-button', 'PaymentButton', { required: false })
    }
  }

  /**
   * Returns an element by data-ref attribute within the provider container.
   * This is useful for provider-specific UI elements like card field containers.
   * @param {string} refName - The value of the data-ref attribute to search for
   * @param {string|object} [legacyNameOrOptions] - Optional legacy ID (string) or options object
   * @param {object} [options] - Options object when legacy name is provided
   * @param {boolean} [options.required=true] - If true, throws an error when element is not found
   * @param {boolean} [options.legacyId] - If set, declares legacy element ID to look for.
   * @returns {Element|null} The element with the specified data-ref, or null if not found
   * @throws {Error} When required is true and element is not found
   */
  refElement(refName, legacyNameOrOptions, options) {
    // Handle flexible arguments
    let legacyName, opts

    if (typeof legacyNameOrOptions === 'object') {
      // Called as: refElement('name', { required: true })
      legacyName = null
      opts = legacyNameOrOptions || {}
    } else {
      // Called as: refElement('name', 'Legacy', { required: true })
      // or: refElement('name', 'Legacy')
      legacyName = legacyNameOrOptions
      opts = options || {}
    }

    const { required = true } = opts

    const container = this.containerElement()
    const refSelector = `[data-ref="${refName}"]`
    let element = container?.querySelector(refSelector)

    // Fall back to legacy ID if provided and element not found
    let legacyId = legacyName
      ? `${this.providerName}${legacyName}${this.elementProviderId()}`
      : null
    if (opts.legacyId) {
      legacyId = opts.legacyId
      legacyName = opts.legacyId
    }
    if (legacyName) {
      if (!element) {
        element = document.getElementById(legacyId)

        // TODO: client needs a deprecation warning/report and link to documentation
      }
    }

    // Some code, or 3rd party libs, expect a DOM to have an id, so provide all
    // with a unique id.
    if (element && !element.id) {
      element.id = `${this.providerName}-${refName}-${this.elementProviderId()}`
    }

    // Throw error if required element is missing
    if (required && !element) {
      const legacyInfo = legacyName ? ` (legacy: ${legacyId})` : ''
      throw new Error(`Required element not found in theme: data-ref="${refName}"${legacyInfo}`)
    }

    return element
  }

  formFieldElement(name) {
    return document.getElementById(`${name}__payment__${this.providerId}`)
  }

  getFieldValue(name) {
    const element = this.formFieldElement(name)
    if (!element) {
      console.error(`Form field element '${name}' not found for provider ${this.providerId}`)
      return undefined
    }
    return element.value
  }

  async loadScript({ url, onload, id, attributes }) {
    // Use an explicit scripts container if available, otherwise fall back to document head
    let scriptBlock = this.refElement('script-block', 'ScriptBlock', { required: false })
    if (!scriptBlock) {
      scriptBlock = document.getElementsByTagName('head')[0]
    }

    await loadExternalScript({ url, onload, id, attributes, container: scriptBlock })
  }

  // Calls `callback` each time `probe` becomes laid out (immediately if already,
  // then on every hidden→shown transition). Gateways use this to defer SDK init
  // that misbehaves when run against a display:none ancestor (e.g. an iframe
  // measured as 0×0).
  //
  // Watches class/style/hidden on the ancestor chain as it exists now — assumes
  // the reveal is such a toggle, not reparenting or a stylesheet-only rule change.
  // Stays armed rather than firing once: a one-shot observer fires on the brief
  // layout blip during load, burns the caller's single attempt, and disconnects
  // before the real reveal. Re-firing lets the caller retry until it takes. If the
  // form is never revealed the observer lives until page unload.
  whenLaidOut(probe, callback) {
    if (!probe) {
      callback()
      return
    }

    const isLaidOut = () => probe.offsetWidth > 0 && probe.offsetHeight > 0

    let wasLaidOut = isLaidOut()
    if (wasLaidOut) callback()

    const observer = new MutationObserver(() => {
      const nowLaidOut = isLaidOut()
      if (nowLaidOut && !wasLaidOut) callback()
      wasLaidOut = nowLaidOut
    })

    for (let node = probe; node && node !== document.documentElement; node = node.parentElement) {
      observer.observe(node, { attributes: true, attributeFilter: ['class', 'style', 'hidden'] })
    }
  }

  setPayButton(enabled) {
    // Support both boolean parameter and named argument { enabled: boolean }
    const isEnabled = typeof enabled === 'object' ? enabled.enabled : enabled
    const payButton = this.submitElement()
    if (!payButton) return
    if (this.setPayButtonCallback) {
      this.setPayButtonCallback(payButton, isEnabled)
      return
    }

    const originalText = payButton.getAttribute('data-enable-with')

    setTimeout(() => {
      if (payButton.disabled == isEnabled) {
        payButton.disabled = !isEnabled
        if (payButton.tagName === 'INPUT') {
          payButton.value = originalText
        } else {
          payButton.innerHTML = originalText
        }
      }
    }, 100)
  }

  /**
   * Reports an error to console and Bugsnag without showing it to the user.
   * Use this for internal/technical errors that shouldn't be displayed.
   *
   * Bugsnag is configured in app/liquid/theme/resources/src/scripts/packs/configure.js
   *
   * @param {string|Error} error - The error to report
   * @param {object} metadata - Optional metadata to include with the report
   */
  reportError(error, metadata = {}) {
    console.error(error)
    if (window.bugsnagClient) {
      const errorObj = error instanceof Error ? error : new Error(error)
      window.bugsnagClient.notify(errorObj, (event) => {
        if (Object.keys(metadata).length > 0) {
          event.addMetadata('payment', metadata)
        }
      })
    }
  }

  /**
   * Displays an error message to the user.
   *
   * @param {string} error - The error message to display.
   * @param {object} options - Optional parameters.
   * @param {boolean} [options.replace=true] - Whether to replace the existing content of the error container.
   * @param {string|Element} [options.errorContainer] - The container element for the error message.
   *   If a string, it's treated as an ID to get the element. Otherwise, the element itself is used.
   *   Defaults to the element returned by `errorElement()`.
   * @param {boolean} [options.report=true] - Whether to report the error to console/Bugsnag.
   * @param {object} [options.metadata={}] - Optional metadata for error reporting.
   */
  showError(error, options = {}) {
    const {
      replace = true,
      errorContainer: errorContainerOption,
      report = true,
      metadata = {},
      resetButton = true,
    } = options
    if (resetButton && !this.onlyExpressCheckout()) {
      this.setPayButton(true)
    }

    // Report error if requested
    if (report) {
      this.reportError(error, metadata)
    }

    let errorContainer
    if (typeof errorContainerOption === 'string') {
      errorContainer = document.getElementById(errorContainerOption)
    } else if (errorContainerOption instanceof Element) {
      errorContainer = errorContainerOption
    } else {
      errorContainer = this.errorElement()
    }

    if (errorContainer) {
      if (replace) {
        errorContainer.innerText = error
      }
      if (error) {
        errorContainer.classList.remove('sc-hide')
      }
    }
  }

  hideError() {
    this.errorElement()?.classList.add('sc-hide')
  }

  prepareSubmit(callback) {
    this.setPayButton(false)
    document.dispatchEvent(new CustomEvent('store-connect.payment-processing-start'))

    callback()
  }

  /**
   * Submit the payment payload to the server for processing via AJAX.
   *
   * Generally, this payload will be obtained from user inputs on a payment form.
   *
   * This function will submit to the URL specified in the form's `action` attribute, unless overridden by the `url` attribute in the payload.
   *
   * Usage:
   *
   * let payload = { payment_source: { tok_id: "some_token", last_digits: "1234", month: "05", year: "2023" } };
   * paymentForm.submitData({payload});
   *
   * A response from the server includes a `redirect_url` attribute if the payment was successful.
   */
  submitData({ payload, handleSuccess, handleError } = {}) {
    this.hideError()

    payload.payment = payload.payment || {}
    payload.payment.provider_id = this.providerId
    payload.payment.method = this.providerName

    this.extractAdditionalFormPayload(payload)

    const formMethod = this.form._method
      ? this.form._method.value
      : this.form.getAttribute('method')

    // Bypass the form action if the checkout URL is specified in the payload.
    const checkoutUrl = payload.url ? payload.url : this.form.getAttribute('action')

    Rails.ajax({
      url: checkoutUrl,
      type: formMethod || payload.method,
      beforeSend(xhr, options) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        options.data = JSON.stringify(payload)
        return true
      },
      success: (response, _textStatus, _jqXHR) => {
        if (response.sf) {
          if (response.paymentId) {
            window.parent.postMessage(
              { type: 'payment_status', status: 'success', message: response.paymentId },
              '*'
            )
          } else {
            window.parent.postMessage(
              { type: 'payment_status', status: 'error', message: response.error_message },
              '*'
            )
            this.refreshForm(response.error_message)
          }
        } else if (response.redirect_url) {
          window.location = response.redirect_url
        } else if (response.error_message) {
          if (handleError) {
            handleError({ error: response.error_message })
            return
          }
          this.refreshForm(response.error_message)
        } else if (response.payment_response && handleSuccess) {
          handleSuccess(response.payment_response.action)
        }
      },
      error: (_response, _textStatus, jqXHR) => {
        this.handleAjaxError(jqXHR)
      },
    })
  }

  handleAjaxError(jqXHR) {
    const isTimeoutOrServerError =
      jqXHR.status === 0 ||
      jqXHR.status === 408 ||
      jqXHR.status === 502 ||
      jqXHR.status === 503 ||
      jqXHR.status === 504

    if (isTimeoutOrServerError) {
      const el = document.querySelector('[data-timeout-error-message]')
      const message = el
        ? el.getAttribute('data-timeout-error-message')
        : "We couldn't confirm your payment status. Please check your email or Orders page before trying again."
      this.showError(message, { resetButton: false })
      return
    }

    const el = document.querySelector('[data-general-error-message]')
    if (el) {
      this.showError(el.getAttribute('data-general-error-message'))
    }
  }

  // Potentially extends payload if additional form fields are present:
  // {
  //   customer_notes: 'hi',
  //   assisted_by_user_id: 'BESSIE',
  //   answers: {
  //     '0010k00000jD9gpey9': {
  //       answer: 'StoreConnect',
  //     },
  //   },
  // }
  extractAdditionalFormPayload(payload) {
    payload = payload || {}

    const customAmountInput = document.getElementById('custom-payment-amount')
    if (customAmountInput && customAmountInput.value) {
      const customAmount = parseFloat(customAmountInput.value)
      if (!isNaN(customAmount) && customAmount > 0) {
        payload.custom_amount = customAmount
      }
    }

    const customerNotes = document.getElementById(`customer_notes__payment__${this.providerId}`)
    if (customerNotes && customerNotes.value.trim() !== '') {
      payload.customer_notes = customerNotes.value
    }
    const assistedBy = document.getElementById(`assisted_by_user_id__payment__${this.providerId}`)
    if (assistedBy) {
      const assistedByOption = assistedBy.options[assistedBy.selectedIndex]
      if (assistedByOption && !assistedByOption.disabled) {
        payload.assisted_by_user_id = assistedBy.value
      }
    }

    const formData = new FormData(this.form)

    formData.forEach((value, key) => {
      const matches = key.match(/answers\[(.*)\]\[answer\]/)
      if (matches) {
        if (!payload.answers) {
          payload.answers = {}
        }
        payload.answers[matches[1]] = { answer: value }
      }
    })

    return payload
  }

  refreshForm(error) {
    if (error) {
      this.showError(error)
    } else {
      this.hideError()
    }

    this.setPayButton(true)
    document.dispatchEvent(new CustomEvent('store-connect.payment-processing-end'))
  }

  // Form data utility functions
  paymentSessionUrl() {
    let url = this.form.dataset.paymentSessionUrl
    const customAmountInput = document.getElementById('custom-payment-amount')
    if (customAmountInput && customAmountInput.value) {
      const customAmount = parseFloat(customAmountInput.value)
      if (!isNaN(customAmount) && customAmount > 0) {
        const separator = url.includes('?') ? '&' : '?'
        url += `${separator}custom_amount=${customAmount}`
      }
    }
    return url
  }

  apiKey() {
    return this.form.dataset.apiKey
  }

  // Environment of payment provider, e.g. 'sandbox' or 'production'
  isProduction() {
    if (!this.form) {
      console.error('No `form` object found')
      return false
    }

    return this.form.dataset.apiMode === 'production'
  }

  showWallets() {
    return Boolean(this.form.dataset.showWallets)
  }

  totalPayable() {
    return this.form.dataset.totalPayable
  }

  currency() {
    return this.form.dataset.currencyCode
  }

  merchantCountryCode() {
    return this.form.dataset.merchantCountryCode
  }

  googleMerchantId() {
    return this.form.dataset.googleMerchantId
  }

  googleMerchantName() {
    return this.form.dataset.googleMerchantName
  }

  merchantName() {
    return this.form.dataset.merchantName
  }

  merchantId() {
    return this.form.dataset.merchantId
  }

  appleMerchantId() {
    return this.form.dataset.appleMerchantId
  }

  appleMerchantName() {
    return this.form.dataset.appleMerchantName
  }

  getProviderId() {
    return this.form.dataset.providerId
  }

  secureCardCaptureKey() {
    return this.form.dataset.secureCardCaptureKey
  }

  scriptUrl() {
    return this.form.dataset.scriptUrl
  }

  onlyExpressCheckout() {
    return this.form.dataset.onlyExpressCheckout === 'true'
  }

  enabledExpressCheckout() {
    return this.form.dataset.expressCheckoutEnabled === 'true'
  }

  storeName() {
    return this.form.dataset.storeName
  }

  offerShipping() {
    return this.form.dataset.offerShipping === 'true'
  }

  requiresContactInfo() {
    return this.form.dataset.requiresContactInfo === 'true'
  }

  saveCustomerTokenOnly() {
    return this.form.dataset.saveCustomerTokenOnly === 'true'
  }

  allowedShippingCountries() {
    const raw = this.form.dataset.shippingCountries
    if (!raw) return []

    try {
      const parsed = JSON.parse(raw)
      // Ensure parsed is an array of strings
      if (!Array.isArray(parsed) || !parsed.every((v) => typeof v === 'string')) {
        throw new Error('shippingCountries must be a JSON array of strings')
      }
      return parsed
    } catch (exception) {
      // If JSON.parse failed due to invalid JSON, wrap and re-throw with a clearer message
      if (exception instanceof SyntaxError) {
        throw new Error(`shippingCountries contains invalid JSON: ${exception.message}`)
      }
      throw new Error(`shippingCountries must be a JSON array of strings: ${exception.message}`)
    }
  }

  /**
   * Get internationalized string from data attributes
   * @param {string} key - The i18n key in dot notation (e.g., 'wallets.free', 'errors.error_occurred')
   * @returns {string} Translated string
   */
  i18n(key) {
    // Convert 'wallets.free' or 'errors.error_occurred' to camelCase
    const words = key.split(/[._]/)
    const camelKey = words
      .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join('')

    // Prefix with 'i18n' and capitalize first letter
    const datasetKey = 'i18n' + camelKey.charAt(0).toUpperCase() + camelKey.slice(1)

    return this.form.dataset[datasetKey]
  }

  /**
   * Wraps an element in a div with classes
   * @param {object} args - The arguments object.
   * @param {HTMLElement} args.element - The element to wrap.
   * @param {string|string[]} [args.classNames] - Class names to add to the wrapper.
   * @returns {HTMLElement} The wrapper div.
   */
  wrapOuterElement(args) {
    const { element, classNames } = args
    const wrapper = document.createElement('div')

    if (classNames) {
      if (Array.isArray(classNames)) {
        wrapper.classList.add(...classNames)
      } else {
        wrapper.classList.add(classNames)
      }
    }
    wrapper.appendChild(element)
    return wrapper
  }

  addHiddenField({ name, value }) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    this.form.appendChild(input)
  }

  async cacheFormParamsAndOnSubmit(onSubmit) {
    const payload = this.extractAdditionalFormPayload()

    if (Object.keys(payload).length > 0) {
      try {
        await postJSON(storePathUrl('/cache_form_params'), payload)
        onSubmit()
      } catch (error) {
        console.error('Error caching questions:', error)
      }
    } else {
      onSubmit()
    }
  }

  // Disable this form if it is a sandbox env, and there are production forms
  hasConflict(options = {}) {
    const { selector } = options
    const providerCode = this.providerName

    if (this.isProduction()) {
      return false
    }

    // For non-production forms, check if any production forms exist
    // Use provided selector or default to forms with same provider
    const formSelector = selector || `form[data-provider="${providerCode}"]`
    const allForms = document.querySelectorAll(formSelector)

    // Check if any other form (not this one) is in production mode
    const hasProductionConflict = Array.from(allForms).some(
      (form) => form !== this.form && form.dataset.apiMode === 'production'
    )

    if (hasProductionConflict) {
      const message = `${providerCode} sandbox/test mode is disabled because production mode is already active on this page.`
      this.showError(message)
      this.disableForm()
      return true
    }

    return false
  }

  // Disable the form using existing CSS classes
  disableForm() {
    this.form.classList.add('is-disabled', 'sc-pointer-events-none')
    this.setPayButton(false)
  }

  // ============================================================================
  // LEGACY METHODS - For backward compatibility with old Liquid templates
  // ============================================================================

  /**
   * Returns the provider ID suffix used for legacy ID construction.
   * LEGACY: This is only used for backward compatibility with old Liquid templates
   * that explicitly construct IDs like "StripePaymentFormpp-1Product123".
   * @private
   */
  elementProviderId() {
    if (this.dedicatedCartProductId) {
      return `${this.providerId}Product${this.dedicatedCartProductId}`
    }
    return this.providerId
  }
}
