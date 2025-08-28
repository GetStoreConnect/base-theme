import fetchWithResponseHandler from '../../theme/utils/fetch'
import storePathUrl from '../../theme/store-path-url'

const Rails = window.Rails

export class PaymentForm {
  constructor(form, options = {}) {
    this.form = form
    this.providerName = form.dataset.provider
    this.providerId = form.dataset.providerId
    this.dedicatedCartProductId = form.dataset.dedicatedCartProductId
    this.onSubmit = options.onSubmit
    this.setPayButtonCallback = options.setPayButtonCallback

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

  elementProviderId() {
    if (this.dedicatedCartProductId) {
      return `${this.providerId}Product${this.dedicatedCartProductId}`
    }
    return this.providerId
  }

  errorElement() {
    const errorElement = document.getElementById(
      `${this.providerName}PaymentError${this.elementProviderId()}`
    )
    if (!errorElement) {
      console.warn(
        `Provider '${this.providerName}' does not have a #${this.providerName}PaymentError${this.elementProviderId()} div container`
      )
    }
    return errorElement
  }

  scriptsElement() {
    return document.getElementById(`${this.providerName}ScriptBlock${this.elementProviderId()}`)
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

  submitElement() {
    return document.getElementById(`${this.providerName}PaymentButton${this.providerId}`)
  }

  async loadScript({ url, onload, id }) {
    const script = document.createElement('script')
    script.src = url
    if (onload) {
      script.onload = onload
    }
    if (id) {
      script.id = id
    }
    if (this.scriptsElement()) {
      this.scriptsElement().appendChild(script)
    } else {
      this.showError(
        `Missing #${this.providerName}ScriptBlock${this.elementProviderId()} div container`
      )
    }
  }

  setPayButton(enabled) {
    // Support both boolean parameter and named argument { enabled: boolean }
    const isEnabled = typeof enabled === 'object' ? enabled.enabled : enabled
    const payButton = this.submitElement()

    if (this.setPayButtonCallback) {
      this.setPayButtonCallback(payButton, isEnabled)
      return
    }

    if (payButton) {
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
   */
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
    } = options
    this.setPayButton(true)

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
  submitData({ payload, handleSuccess }) {
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
          this.refreshForm(response.error_message)
        } else if (response.payment_response && handleSuccess) {
          handleSuccess(response.payment_response.action)
        }
      },
      error: (_response, _textStatus, jqXHR) => {
        if (jqXHR.status === 0) {
          return
        }

        const error = document.querySelector('[data-general-error-message]')
        if (error) {
          this.showError(error.getAttribute('data-general-error-message'))
        }
      },
    })
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
  }

  // Form data utility functions
  callbackUrl() {
    return this.form.dataset.callbackUrl
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

  allowedShippingCountries() {
    return JSON.parse(this.form.dataset.shippingCountries || '[]')
  }

  formAuthentityToken() {
    return this.form.querySelector("input[name='authenticity_token']")?.value
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

  cacheFormParamsAndOnSubmit(onSubmit) {
    const payload = this.extractAdditionalFormPayload()

    if (Object.keys(payload).length > 0) {
      fetchWithResponseHandler(storePathUrl('/cache_form_params'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(() => {
          onSubmit()
        })
        .catch((error) => {
          console.error('Error caching questions:', error)
        })
    } else {
      onSubmit()
    }
  }
}
