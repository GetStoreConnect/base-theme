import Rails from '@rails/ujs'

export let providerName, providerId, form
export let dedicatedCartProductId
let paymentPayloadCallback, setPayButtonCallback
window.StoreConnect = window.StoreConnect || {}

export function basicInit(form_) {
  form = form_
  providerName = form.dataset.provider
  providerId = form.dataset.providerId

  // Allow "Processing..." disabled buttons to be reverted
  form.querySelectorAll('input[data-disable-with], button[data-disable-with]').forEach((button) => {
    const value = button.tagName === 'INPUT' ? button.value : button.innerHTML
    button.setAttribute('data-enable-with', value)
  })
}

export function init(form_, paymentPayloadCallback_, setPayButtonCallback_) {
  basicInit(form_)
  paymentPayloadCallback = paymentPayloadCallback_
  setPayButtonCallback = setPayButtonCallback_

  dedicatedCartProductId = form.dataset.dedicatedCartProductId

  form.addEventListener('submit', submitHandler, false)
}

export function elementProviderId() {
  if (dedicatedCartProductId) {
    return `${providerId}Product${dedicatedCartProductId}`
  }
  return providerId
}

export function errorElement() {
  const errorElement = document.getElementById(`${providerName}PaymentError${elementProviderId()}`)
  if (!errorElement) {
    console.warn(
      `Provider '${providerName}' does not have a #${providerName}PaymentError${elementProviderId()} div container`
    )
  }
  return errorElement
}

export function scriptsElement() {
  return document.getElementById(`${providerName}ScriptBlock${elementProviderId()}`)
}

export function formFieldElement(name) {
  return document.getElementById(`${name}__payment__${providerId}`)
}

export function submitElement() {
  return document.getElementById(`${providerName}PaymentButton${providerId}`)
}

export async function loadScript({ url, onload, id }) {
  const script = document.createElement('script')
  script.src = url
  if (onload) {
    script.onload = onload
  }
  if (id) {
    script.id = id
  }
  if (scriptsElement()) {
    scriptsElement().appendChild(script)
  } else {
    showError(`Missing #${providerName}ScriptBlock${elementProviderId()} div container`)
  }
}

export function setPayButton(enabled) {
  const payButton = submitElement()

  if (setPayButtonCallback) {
    setPayButtonCallback(payButton, enabled)
    return
  }

  if (payButton) {
    const originalText = payButton.getAttribute('data-enable-with')

    setTimeout(() => {
      if (payButton.disabled == enabled) {
        payButton.disabled = !enabled
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
export function showError(error, options = {}) {
  const { replace = true, errorContainer: errorContainerOption } = options
  setPayButton(true)

  let errorContainer
  if (typeof errorContainerOption === 'string') {
    errorContainer = document.getElementById(errorContainerOption)
  } else if (errorContainerOption instanceof Element) {
    errorContainer = errorContainerOption
  } else {
    errorContainer = errorElement()
  }

  if (errorContainer) {
    if (replace) {
      errorContainer.innerText = error
    }
    if (error) {
      errorContainer.classList.remove('sc-hide')
    }
  } else {
    console.error(error)
  }
}

export function hideError() {
  errorElement()?.classList.add('sc-hide')
}

function submitHandler(e) {
  e.preventDefault()

  prepareSubmit(() => {
    if (paymentPayloadCallback) {
      paymentPayloadCallback(form)
    }
  })
}

export function prepareSubmit(callback) {
  setPayButton(false)
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
 * submitData({payload});
 *
 * A response from the server includes a `redirect_url` attribute if the payment was successful.
 */
export function submitData({ payload, handleSuccess }) {
  hideError()

  payload.payment = payload.payment || {}
  payload.payment.provider_id = providerId
  payload.payment.method = providerName

  extractAdditionalFormPayload(payload)

  const formMethod = form._method ? form._method.value : form.getAttribute('method')

  // Bypass the form action if the checkout URL is specified in the payload.
  const checkoutUrl = payload.url ? payload.url : form.getAttribute('action')
  Rails.ajax({
    url: checkoutUrl,
    type: formMethod || payload.method,
    beforeSend(xhr, options) {
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
      options.data = JSON.stringify(payload)
      return true
    },
    success: function (response, _textStatus, _jqXHR) {
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
          refreshForm(response.error_message)
        }
      } else if (response.redirect_url) {
        window.location = response.redirect_url
      } else if (response.error_message) {
        refreshForm(response.error_message)
      } else if (response.payment_response && handleSuccess) {
        handleSuccess(response.payment_response.action)
      }
    },
    error: function (_response, _textStatus, jqXHR) {
      if (jqXHR.status === 0) {
        return
      }

      const error = document.querySelector('[data-general-error-message]')
      if (error) {
        showError(error.getAttribute('data-general-error-message'))
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
export function extractAdditionalFormPayload(payload) {
  payload = payload || {}

  const customerNotes = document.getElementById(`customer_notes__payment__${providerId}`)
  if (customerNotes && customerNotes.value.trim() !== '') {
    payload.customer_notes = customerNotes.value
  }
  const assistedBy = document.getElementById(`assisted_by_user_id__payment__${providerId}`)
  if (assistedBy) {
    const assistedByOption = assistedBy.options[assistedBy.selectedIndex]
    if (assistedByOption && !assistedByOption.disabled) {
      payload.assisted_by_user_id = assistedBy.value
    }
  }

  const formData = new FormData(form)

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

export function refreshForm(error) {
  if (error) {
    showError(error)
  } else {
    hideError()
  }

  setPayButton(true)
}
