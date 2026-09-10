import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

const NMI_FORM_SELECTOR = 'form[data-provider="Nmi"], form[data-provider="StoreConnectPay"]'

onDomChange((node) => {
  const forms = node.querySelectorAll(NMI_FORM_SELECTOR)
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initNmi({ form })
    }
  })
})

function initNmi({ form }) {
  let isCollectJsReady = false
  let isConfiguring = false
  let isPaymentInProgress = false

  const paymentForm = new PaymentForm(form, {
    onSubmit: () => {
      isPaymentInProgress = true
      return requestToken(paymentForm)
    },
  })

  // A note about nmi.js versus other payment gateway scripts:
  // NMI does not like it if we allow submission of the form before
  // Collect.js has fully initialized and the fields are ready and valid.
  // Therefore, we disable the submit button by default and only
  // enable it once all fields (including Collect.js fields) are valid.

  // Track validation state for all fields
  const validationState = {
    card_number: false,
    card_expiry: false,
    card_verification: false,
    card_name: false,
  }

  // Show or hide field-specific error message
  function showFieldError(fieldName, message) {
    const errorEl = form.querySelector(`[data-field-error="${fieldName}"]`)
    const fieldContainer = paymentForm.formFieldElement(fieldName)?.closest('.SC-Field')

    if (errorEl && message) {
      errorEl.textContent = message
      errorEl.classList.remove('sc-hide')
      fieldContainer?.classList.add('has-error')
    }
  }

  function hideFieldError(fieldName) {
    const errorEl = form.querySelector(`[data-field-error="${fieldName}"]`)
    const fieldContainer = paymentForm.formFieldElement(fieldName)?.closest('.SC-Field')

    if (errorEl) {
      errorEl.textContent = ''
      errorEl.classList.add('sc-hide')
      fieldContainer?.classList.remove('has-error')
    }
  }

  // Map Collect.js field names to our field names
  function mapFieldName(collectJsField) {
    const fieldMap = {
      ccnumber: 'card_number',
      ccexp: 'card_expiry',
      cvv: 'card_verification',
    }
    return fieldMap[collectJsField] || collectJsField
  }

  function updateValidationState(fieldName, isValid, errorMessage = null) {
    const mappedField = mapFieldName(fieldName)

    if (mappedField in validationState) {
      validationState[mappedField] = isValid

      // Show or hide field error based on validation status
      if (isValid) {
        hideFieldError(mappedField)
      } else if (errorMessage) {
        showFieldError(mappedField, errorMessage)
      }
    }
  }

  function checkAllFieldsAndUpdateButton() {
    const allValid = Object.values(validationState).every((valid) => valid === true)

    // Don't re-enable button if payment/3DS flow is in progress
    if (!isPaymentInProgress) {
      paymentForm.setPayButton(allValid)
    }
  }

  // Disable submit button by default until all fields are valid
  paymentForm.setPayButton(false)

  // Check for sandbox + production conflicts in same page
  if (paymentForm.hasConflict({ selector: NMI_FORM_SELECTOR })) {
    return
  }

  function configureCollectJs() {
    // Skip once fields are injected (fieldsAvailableCallback sets isCollectJsReady).
    // Until then whenLaidOut re-fires on each reveal so we retry — a configure()
    // against a 0×0 field injects nothing and reports no error. isConfiguring stops
    // a rapid re-reveal from configuring again while one attempt is in flight; it
    // clears on a timeout so a genuinely failed attempt can still retry. card_name
    // is wired separately, so retries here don't stack duplicate listeners.
    if (isCollectJsReady || isConfiguring) return
    try {
      // Verify elements exist before configuring
      const cardNumberEl = paymentForm.formFieldElement('card_number')
      const cardExpiryEl = paymentForm.formFieldElement('card_expiry')
      const cardCvcEl = paymentForm.formFieldElement('card_verification')

      if (!cardNumberEl || !cardExpiryEl || !cardCvcEl) {
        paymentForm.reportError('NMI form elements not found', {
          cardNumber: !!cardNumberEl,
          cardExpiry: !!cardExpiryEl,
          cardCvc: !!cardCvcEl,
        })
        return
      }

      // Collect.js builds an internal PaymentRequestAbstraction at configure
      // time for any wallet (Apple Pay / Google Pay) enabled on the merchant
      // account. It requires price/country/currency to do so, and logs
      // "Could not create PaymentRequestAbstraction" to the console when they
      // are missing — harmless for the card flow, but noisy in CI logs.
      const totalPayable = paymentForm.totalPayable()
      const price = totalPayable ? parseFloat(totalPayable).toFixed(2) : '0.00'
      const country = form.dataset.billingCountry || 'US'
      const currency = paymentForm.currency() || 'USD'

      // Use PaymentForm helpers to get element IDs for selectors
      // Pattern from stripe.js: `#${paymentForm.formFieldElement('card_number').id}`
      const config = {
        variant: 'inline',
        price,
        country,
        currency,
        fields: {
          ccnumber: {
            selector: `#${cardNumberEl.id}`,
            title: paymentForm.i18n('form.card_number'),
            placeholder: '0000 0000 0000 0000',
            enableCardBrandPreviews: true,
          },
          ccexp: {
            selector: `#${cardExpiryEl.id}`,
            title: paymentForm.i18n('form.expiry'),
            placeholder: 'MM / YY',
          },
          cvv: {
            selector: `#${cardCvcEl.id}`,
            title: paymentForm.i18n('form.verification'),
            placeholder: '***',
          },
        },
        customCss: {
          'border-color': 'transparent',
          'border-width': '0',
          cursor: 'pointer',
          height: '100%',
        },
        validationCallback: (field, status, message) => {
          // Update validation state - will show/hide per-field error
          updateValidationState(field, status, message)

          // Update button state
          checkAllFieldsAndUpdateButton()
        },
        fieldsAvailableCallback: () => {
          // Fields are ready and injected into the DOM
          isCollectJsReady = true
          isConfiguring = false

          // Re-check button state in case all fields were already valid
          checkAllFieldsAndUpdateButton()
        },
        // Fires after the user clicks submit
        callback: (response) => {
          handleToken(response, paymentForm)
        },
        // Fires if the tokenization request times out
        timeoutCallback: () => {
          paymentForm.reportError('Tokenization request timed out')
          paymentForm.showError(paymentForm.i18n('errors.request_timeout'))
        },
      }

      isConfiguring = true
      CollectJS.configure(config)
      // Clear the in-flight flag if fields never become ready, so a later reveal retries.
      setTimeout(() => {
        if (!isCollectJsReady) isConfiguring = false
      }, 3000)
    } catch (error) {
      isConfiguring = false
      paymentForm.reportError('Failed to configure NMI Collect.js', { error })
    }
  }

  // card_name is a plain input (not a Collect.js iframe). Wired once at init,
  // outside configureCollectJs, so the retry-on-reveal loop can't stack listeners.
  function setupCardNameValidation() {
    const cardNameEl = paymentForm.formFieldElement('card_name')
    if (!cardNameEl) {
      paymentForm.reportError('NMI card_name element not found')
      return
    }

    cardNameEl.addEventListener('input', (e) => {
      const value = e.target.value.trim()
      const isValid = value.length > 0
      const errorMessage = isValid ? null : paymentForm.i18n('errors.cardholder_name_required')

      updateValidationState('card_name', isValid, errorMessage)
      checkAllFieldsAndUpdateButton()
    })

    cardNameEl.addEventListener('blur', (e) => {
      // Only show error after user leaves field if it's still empty
      const value = e.target.value.trim()
      if (value.length === 0) {
        updateValidationState(
          'card_name',
          false,
          paymentForm.i18n('errors.cardholder_name_required')
        )
      }
    })

    // Check initial state (in case field has value from browser autofill)
    if (cardNameEl.value.trim().length > 0) {
      updateValidationState('card_name', true)
    }
  }

  setupCardNameValidation()

  function handleToken(response, paymentForm) {
    if (response.token) {
      // Extract card metadata from Collect.js response
      // Note: response.card.number is already masked (e.g., "411111******1111")
      const cardMetadata = {
        card_number: response.card?.number, // Already masked: "411111******1111"
        card_expiry: response.card?.exp, // Format: "MMYY" (e.g., "0330")
        card_type: response.card?.type, // e.g., "visa"
        card_bin: response.card?.bin, // First 6 digits
      }

      // Check if 3DS is enabled
      if (form.dataset.threeDSecure === 'true') {
        prepareThreeDSecurePayload({ tokenResponse: response, cardMetadata, paymentForm })
      } else {
        const payload = {
          payment_source: {
            tok_id: response.token,
            ...cardMetadata,
          },
        }

        paymentForm.submitData({ payload })
      }
    } else {
      isPaymentInProgress = false

      const errorMessage = response.error || paymentForm.i18n('errors.tokenization_failed')
      paymentForm.reportError('No token in NMI response', { response })
      paymentForm.showError(errorMessage)
    }
  }

  function prepareThreeDSecurePayload({ tokenResponse, cardMetadata, paymentForm }) {
    try {
      const firstname = form.dataset.contactFirstname
      const lastname = form.dataset.contactLastname
      const email = form.dataset.contactEmail
      const phone = form.dataset.contactPhone
      const billingStreet = form.dataset.billingStreet
      const billingCity = form.dataset.billingCity
      const billingState = form.dataset.billingState
      const billingCountry = form.dataset.billingCountry
      const billingPostalCode = form.dataset.billingPostalCode

      // NMI Gateway.js 3DS expects amount as a string in minor units (e.g. "1000" = $10.00).
      const amount = Math.round(parseFloat(paymentForm.totalPayable() || '0') * 100).toString()

      if (typeof Gateway === 'undefined') {
        throw new Error('Gateway.js not loaded')
      }

      const gatewayKey = paymentForm.apiKey()
      if (!gatewayKey) {
        throw new Error('Gateway key not provided')
      }

      const gateway = Gateway.create(gatewayKey)
      const threeDSecureService = gateway.get3DSecure()

      // NMI docs: https://docs.nmi.com/docs/payer-authentication-3ds (Running 3DS with Collect.js)
      // Field names are camelCase; amount is a string in minor units.
      const threeDSecureOptions = {
        paymentToken: tokenResponse.token,
        amount: amount,
        currency: paymentForm.currency() || 'USD',
        firstName: firstname,
        lastName: lastname,
        email: email,
        phone: phone,
        address1: billingStreet,
        city: billingCity,
        state: billingState,
        postalCode: billingPostalCode,
        country: billingCountry,
      }

      // Mount the 3DS frame inside a dim-backdrop overlay so the
      // ACS-rendered challenge UI (which we can't restyle) is visually
      // isolated from the checkout page. The ACS iframe already renders its
      // own card with title and chrome, so we deliberately do NOT wrap it in
      // SC-Modal_inner — that would duplicate the header and add dead space.
      // The overlay starts hidden; fingerprinting runs at 0x0 invisibly, and
      // only when the challenge fires do we reveal the backdrop + iframe.
      // NMI's start() takes a selector string, so the mount needs a stable id.
      const providerId = form.dataset.providerId || ''
      const mountId = `sc-nmi-threeds-${providerId}`
      const modalId = `${mountId}-modal`
      let threeDSecureModal = document.querySelector(`[data-modal="${modalId}"]`)
      let threeDSecureContainer = threeDSecureModal?.querySelector(`#${mountId}`) || null
      if (!threeDSecureModal) {
        threeDSecureModal = document.createElement('div')
        threeDSecureModal.className = 'SC-Modal SC-Modal--threeds'
        threeDSecureModal.setAttribute('data-modal', modalId)
        threeDSecureModal.setAttribute('data-ref', 'threeds-modal')
        threeDSecureModal.innerHTML = `<div class="SC-Modal_overlay SC-Modal_overlay--dark-blur"></div>`
        threeDSecureContainer = document.createElement('div')
        threeDSecureContainer.id = mountId
        threeDSecureContainer.className = 'SC-Modal--threeds_mount'
        threeDSecureContainer.setAttribute('data-ref', 'threeds-container')
        threeDSecureModal.appendChild(threeDSecureContainer)
        document.body.appendChild(threeDSecureModal)
      }

      function cancelThreeDSecure(reason) {
        failThreeDSecure(paymentForm.i18n('three_d_secure.cancelled'), {
          reason,
        })
      }

      function handleEscapeKey(event) {
        if (event.key === 'Escape') {
          cancelThreeDSecure('user_escape_key')
        }
      }

      function showThreeDSecureModal() {
        threeDSecureModal.classList.add('is-active')
        document.body.style.overflow = 'hidden'

        // Click on the dim backdrop (but not the iframe mount) cancels.
        threeDSecureModal
          .querySelector('.SC-Modal_overlay')
          ?.addEventListener('click', () => cancelThreeDSecure('user_backdrop_click'))

        document.addEventListener('keydown', handleEscapeKey)
      }

      function removeThreeDSecureModal() {
        document.removeEventListener('keydown', handleEscapeKey)
        // Tell NMI to tear down its internal ThreeDSecureUI state. Without
        // this, removing the DOM node alone leaves NMI thinking the UI is
        // still mounted, and the next createUI/start trips its "Another
        // ThreeDSecureUI was started but has since been removed from the
        // DOM" guard. Wrap in try/catch because NMI may have already
        // unmounted itself on complete/failure/error.
        try {
          threeDSecureInterface?.unmount()
        } catch (_) {
          // Ignore — interface was already unmounted by NMI.
        }
        if (threeDSecureModal) {
          threeDSecureModal.remove()
          threeDSecureModal = null
          threeDSecureContainer = null
        }
        document.body.style.overflow = ''
      }

      // Per NMI docs: createUI(options) returns an interface, then start(selector) mounts it.
      // Event listeners must be attached to the interface, not the service.
      const threeDSecureInterface = threeDSecureService.createUI(threeDSecureOptions)

      // Watchdog: if Gateway.js never fires a terminal event (e.g. cmpiLookUp 400
      // due to a misconfigured public key or an account not enabled for 3DS
      // sandbox), the Pay Now button would stay in "Processing…" forever.
      // Cancel on any terminal/challenge event below.
      let threeDSecureWatchdog = setTimeout(() => {
        threeDSecureWatchdog = null
        failThreeDSecure(paymentForm.i18n('three_d_secure.confirmation_failed'), {
          reason: 'watchdog_timeout',
        })
      }, 15000)

      // Once 'complete' has fired we've already handed the payload to
      // submitData; any later Gateway.js error is a no-op for the user. Without
      // this flag, a late gateway-level error would tear down state and
      // re-enable the Pay button mid-submission, inviting duplicate orders.
      let threeDSecureSettled = false

      function clearThreeDSecureWatchdog() {
        if (threeDSecureWatchdog) {
          clearTimeout(threeDSecureWatchdog)
          threeDSecureWatchdog = null
        }
      }

      function failThreeDSecure(message, context = {}) {
        if (threeDSecureSettled) {
          paymentForm.reportError('NMI 3DS late error after settle', context)
          return
        }
        threeDSecureSettled = true
        clearThreeDSecureWatchdog()
        isPaymentInProgress = false

        removeThreeDSecureModal()

        paymentForm.showError(message)
        paymentForm.reportError('NMI 3DS failed', context)
      }

      threeDSecureInterface.on('challenge', () => {
        // Challenge UI is displayed — reveal the modal so the iframe is
        // visible. Fingerprinting (which happens before this) stayed hidden.
        clearThreeDSecureWatchdog()
        showThreeDSecureModal()
      })

      threeDSecureInterface.on('complete', (threeDSecureData) => {
        threeDSecureSettled = true
        clearThreeDSecureWatchdog()
        removeThreeDSecureModal()

        // Build payload with 3DS authentication data.
        // NMI returns camelCase property names in the complete event payload.
        const payload = {
          payment_source: {
            tok_id: tokenResponse.token,
            ...cardMetadata,
            cavv: threeDSecureData.cavv,
            eci: threeDSecureData.eci,
            xid: threeDSecureData.xid,
            directory_server_id: threeDSecureData.directoryServerId,
            cardholder_auth: threeDSecureData.cardHolderAuth,
            three_ds_version: threeDSecureData.threeDsVersion,
          },
        }

        paymentForm.submitData({ payload })
      })

      threeDSecureInterface.on('failure', (error) => {
        failThreeDSecure(error?.message || paymentForm.i18n('errors.verifying_payment'), {
          reason: 'interface_failure',
          error: error?.message,
        })
      })

      // NMI docs list an interface-level "error" event for unknown/timeout
      // scenarios (e.g. test card 4000000000002990). Without this handler the
      // event was silently dropped.
      threeDSecureInterface.on('error', (error) => {
        failThreeDSecure(error?.message || paymentForm.i18n('three_d_secure.confirmation_failed'), {
          reason: 'interface_error',
          error: error?.message,
        })
      })

      threeDSecureInterface.start(`#${mountId}`)

      // Listen for Gateway.js errors (API key errors, configuration issues)
      gateway.on('error', (error) => {
        failThreeDSecure(
          error?.message || paymentForm.i18n('three_d_secure.configuration_failed'),
          {
            reason: 'gateway_error',
            error: error?.message,
          }
        )
      })
    } catch (error) {
      isPaymentInProgress = false

      const errorMessage =
        error.message === 'Gateway.js not loaded'
          ? paymentForm.i18n('three_d_secure.library_failed')
          : error.message === 'Gateway key not provided'
            ? paymentForm.i18n('three_d_secure.configuration_failed')
            : paymentForm.i18n('three_d_secure.confirmation_failed')

      paymentForm.showError(errorMessage)
      paymentForm.reportError('NMI 3DS initialization failed', {
        error: error.message,
      })
    }
  }

  function requestToken(paymentForm) {
    try {
      if (typeof CollectJS === 'undefined' || !CollectJS.startPaymentRequest) {
        throw new Error('CollectJS not available')
      }

      if (!isCollectJsReady) {
        throw new Error('CollectJS fields not ready yet')
      }

      // Check if CollectJS is properly configured
      if (typeof CollectJS.configure === 'undefined') {
        throw new Error('CollectJS.configure is not available - SDK may not be loaded correctly')
      }

      CollectJS.startPaymentRequest()
    } catch (error) {
      isPaymentInProgress = false

      paymentForm.showError(paymentForm.i18n('errors.form_not_ready'))
      paymentForm.reportError('Failed to start NMI payment request', {
        error: error.message,
        isReady: isCollectJsReady,
      })
    }
  }

  // Load Collect.js SDK with tokenization key
  // Note: Script must have data-tokenization-key attribute
  const apiKey = paymentForm.apiKey()

  paymentForm
    .loadScript({
      url: paymentForm.scriptUrl(),
      attributes: {
        'data-tokenization-key': apiKey,
      },
      onload: () => {
        // Collect.js measures the iframe at configure time and gets stuck
        // at height:0 if it runs against a display:none ancestor.
        paymentForm.whenLaidOut(paymentForm.formFieldElement('card_number'), configureCollectJs)
      },
    })
    .catch((error) => {
      // Surface a failed load instead of an uncaught promise rejection.
      paymentForm.showError(paymentForm.i18n('errors.form_not_ready'))
      paymentForm.reportError('Failed to load NMI Collect.js', {
        url: paymentForm.scriptUrl(),
        error,
      })
    })

  // Load Gateway.js for 3DS support (in parallel with Collect.js).
  // URL comes from the server so sandbox and reseller hosts load from the
  // matching origin instead of the production NMI host.
  if (form.dataset.threeDSecure === 'true') {
    const gatewayJsUrl = form.dataset.gatewayJsUrl
    if (gatewayJsUrl) {
      paymentForm.loadScript({ url: gatewayJsUrl }).catch((error) => {
        // Keep a failed 3DS load from becoming an uncaught rejection.
        paymentForm.reportError('Failed to load NMI Gateway.js (3DS)', {
          url: gatewayJsUrl,
          error,
        })
      })
    } else {
      paymentForm.reportError('NMI 3DS enabled but data-gateway-js-url missing')
    }
  }
}
