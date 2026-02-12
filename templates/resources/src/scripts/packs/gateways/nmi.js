import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

const NMI_FORM_SELECTOR = 'form[data-provider="Nmi"]'

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

  const paymentForm = new PaymentForm(form, {
    onSubmit: () => {
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
    paymentForm.setPayButton(allValid)
  }

  // Disable submit button by default until all fields are valid
  paymentForm.setPayButton(false)

  // Check for sandbox + production conflicts in same page
  if (paymentForm.hasConflict({ selector: NMI_FORM_SELECTOR })) {
    return
  }

  function configureCollectJs() {
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

      // Use PaymentForm helpers to get element IDs for selectors
      // Pattern from stripe.js: `#${paymentForm.formFieldElement('card_number').id}`
      const config = {
        variant: 'inline',
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

      CollectJS.configure(config)

      // Setup validation for card_name field (regular input, not tokenized)
      const cardNameEl = paymentForm.formFieldElement('card_name')
      if (cardNameEl) {
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
        const initiallyValid = cardNameEl.value.trim().length > 0
        if (initiallyValid) {
          updateValidationState('card_name', true)
        }
      } else {
        paymentForm.reportError('NMI card_name element not found')
      }
    } catch (error) {
      paymentForm.reportError('Failed to configure NMI Collect.js', { error: error.message })
    }
  }

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

      const payload = {
        payment_source: {
          tok_id: response.token,
          ...cardMetadata, // Spread card metadata into payment_source
        },
      }

      paymentForm.submitData({ payload })
    } else {
      const errorMessage = response.error || paymentForm.i18n('errors.tokenization_failed')
      paymentForm.reportError('No token in NMI response', { response })
      paymentForm.showError(errorMessage)
    }
  }

  function requestToken(paymentForm) {
    // Collect.js handles tokenization automatically on form submit
    // when configured with variant: 'inline'
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

  paymentForm.loadScript({
    url: 'https://secure.nmi.com/token/Collect.js',
    attributes: {
      'data-tokenization-key': apiKey,
    },
    onload: () => {
      configureCollectJs()
    },
  })
}
