import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

const NMI_ACH_FORM_SELECTOR =
  'form[data-provider="NmiAch"], form[data-provider="StoreConnectPayAch"]'

onDomChange((node) => {
  const forms = node.querySelectorAll(NMI_ACH_FORM_SELECTOR)
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initNmiAch({ form })
    }
  })
})

function initNmiAch({ form }) {
  let isCollectJsReady = false
  let isConfiguring = false

  const paymentForm = new PaymentForm(form, {
    onSubmit: () => {
      return requestToken(paymentForm)
    },
  })

  const validationState = {
    ach_account_number: false,
    ach_routing_number: false,
    ach_account_name: false,
    ach_account_type: true, // Select fields have default values
    ach_account_holder_type: true, // Select fields have default values
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
      checkaccount: 'ach_account_number',
      checkaba: 'ach_routing_number',
      checkname: 'ach_account_name',
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
  if (paymentForm.hasConflict({ selector: NMI_ACH_FORM_SELECTOR })) {
    return
  }

  function configureCollectJs() {
    // Skip once fields are injected (fieldsAvailableCallback sets isCollectJsReady).
    // Until then whenLaidOut re-fires on each reveal so we retry — a configure()
    // against a 0×0 field injects nothing and reports no error. isConfiguring
    // stops a rapid re-reveal from configuring again while one attempt is in
    // flight; it clears on a timeout so a genuinely failed attempt can still retry.
    if (isCollectJsReady || isConfiguring) return
    try {
      // Verify elements exist before configuring
      const accountNumberEl = paymentForm.formFieldElement('ach_account_number')
      const routingNumberEl = paymentForm.formFieldElement('ach_routing_number')
      const accountNameEl = paymentForm.formFieldElement('ach_account_name')

      if (!accountNumberEl || !routingNumberEl || !accountNameEl) {
        paymentForm.reportError('NMI ACH form elements not found', {
          accountNumber: !!accountNumberEl,
          routingNumber: !!routingNumberEl,
          accountName: !!accountNameEl,
        })
        return
      }

      const config = {
        variant: 'inline',
        fields: {
          checkaccount: {
            selector: `#${accountNumberEl.id}`,
            title: paymentForm.i18n('form.account_number'),
            placeholder: paymentForm.i18n('form.ach_account_number_placeholder'),
          },
          checkaba: {
            selector: `#${routingNumberEl.id}`,
            title: paymentForm.i18n('form.routing_number'),
            placeholder: paymentForm.i18n('form.ach_routing_number_placeholder'),
          },
          checkname: {
            selector: `#${accountNameEl.id}`,
            title: paymentForm.i18n('form.name_on_account'),
            placeholder: paymentForm.i18n('form.name_on_account_placeholder'),
          },
        },
        customCss: {
          'border-color': 'transparent',
          'border-width': '0',
          cursor: 'pointer',
          height: '100%',
        },
        validationCallback: (field, status, message) => {
          updateValidationState(field, status, message)
          checkAllFieldsAndUpdateButton()
        },
        fieldsAvailableCallback: () => {
          isCollectJsReady = true
          isConfiguring = false
          checkAllFieldsAndUpdateButton()
        },
        callback: (response) => {
          handleToken(response, paymentForm)
        },
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
      paymentForm.reportError('Failed to configure NMI ACH Collect.js', { error })
    }
  }

  function handleToken(response, paymentForm) {
    if (response.token) {
      // Get account type and holder type from form selects
      const accountTypeEl = paymentForm.formFieldElement('ach_account_type')
      const accountHolderTypeEl = paymentForm.formFieldElement('ach_account_holder_type')

      const payload = {
        payment_source: {
          tok_id: response.token,
          account_type: accountTypeEl?.value || 'checking',
          account_holder_type: accountHolderTypeEl?.value || 'personal',
          checkname: response.check?.name,
        },
      }

      paymentForm.submitData({ payload })
    } else {
      const errorMessage = response.error || paymentForm.i18n('errors.tokenization_failed_ach')
      paymentForm.reportError('No token in NMI ACH response', { response })
      paymentForm.showError(errorMessage)
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

      if (typeof CollectJS.configure === 'undefined') {
        throw new Error('CollectJS.configure is not available - SDK may not be loaded correctly')
      }

      CollectJS.startPaymentRequest()
    } catch (error) {
      paymentForm.showError(paymentForm.i18n('errors.form_not_ready'))
      paymentForm.reportError('Failed to start NMI ACH payment request', {
        error: error.message,
        isReady: isCollectJsReady,
      })
    }
  }

  // Load Collect.js SDK with tokenization key
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
        paymentForm.whenLaidOut(
          paymentForm.formFieldElement('ach_account_number'),
          configureCollectJs
        )
      },
    })
    .catch((error) => {
      // Surface a failed load instead of an uncaught promise rejection.
      paymentForm.showError(paymentForm.i18n('errors.form_not_ready'))
      paymentForm.reportError('Failed to load NMI ACH Collect.js', {
        url: paymentForm.scriptUrl(),
        error,
      })
    })
}
