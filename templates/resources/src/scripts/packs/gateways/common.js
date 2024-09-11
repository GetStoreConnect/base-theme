import Rails from '@rails/ujs';

export let providerName, providerId;
export let dedicatedCartProductId;
let paymentPayloadCallback, setPayButtonCallback;
window.StoreConnect = window.StoreConnect || {};

export function basicInit(providerName_, providerId_) {
  providerName = providerName_;
  providerId = providerId_;
}

export function init(providerName_, providerId_, paymentPayloadCallback_, setPayButtonCallback_, dedicatedCartProductId_) {
  providerName = providerName_;
  providerId = providerId_;
  paymentPayloadCallback = paymentPayloadCallback_;
  setPayButtonCallback = setPayButtonCallback_;
  dedicatedCartProductId = dedicatedCartProductId_;

  formElement().addEventListener('submit', submitHandler, false);
}

export function elementProviderId() {
  if (dedicatedCartProductId) {
    return `${providerId}Product${dedicatedCartProductId}`;
  }
  return providerId;
}

export function errorElement() {
  return document.getElementById(`${providerName}PaymentError${elementProviderId()}`);
}

export function scriptsElement() {
  return document.getElementById(`${providerName}ScriptBlock${elementProviderId()}`);
}

export function formElement() {
  return document.getElementById(`${providerName}PaymentForm${elementProviderId()}`);
}

export function formFieldElement(name) {
  return document.getElementById(`${name}__payment__${providerId}`);
}

function submitElement() {
  return document.getElementById(`${providerName}PaymentButton${providerId}`);
}

export async function loadScript({ url, onload, id }) {
  const script = document.createElement("script");
  script.src = url;
  if (onload) { script.onload = onload; }
  if (id) { script.id = id; }
  scriptsElement().appendChild(script);
}

export function setPayButton(enabled) {
  const payButton = submitElement();

  if (setPayButtonCallback) {
    setPayButtonCallback(payButton, enabled);
    return;
  }

  if (payButton) {
    if (enabled) {
      payButton.removeAttribute('data-loading');
      payButton.disabled = false;
      // No idea why but stripe payButton.disabled is not getting caught normally
      setTimeout(() => { payButton.disabled = false; }, 500);
    } else {
      payButton.setAttribute('data-loading', true);
      payButton.disabled = true;
    }
  }
}

export function showError(error, replace = true) {
  const errorContainer = errorElement();
  if (errorContainer) {
    if (replace) {
      errorContainer.innerText = error;
    }
    if (error) {
      errorContainer.classList.remove('sc-hide');
    }
  } else {
    if (providerName) {
      console.warn(`Provider '${providerName}' does not have a #${providerName}PaymentError${providerId} div container`);
    } else {
      console.warn(`Run init(providerName, providerId) before calling showError(error)`);
    }
    console.error(error);
  }

  setPayButton(true);
}

function hideError() {
  errorElement()?.classList.add('sc-hide');
}

function submitHandler(e) {
  e.preventDefault();

  prepareSubmit(() => {
    if (paymentPayloadCallback) {
      paymentPayloadCallback(formElement());
    }
  });
}

export function prepareSubmit(callback) {
  setPayButton(false);
  document.dispatchEvent(new CustomEvent('store-connect.payment-processing-start'));

  callback();
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
  hideError();
  const form = formElement();

  payload.payment = payload.payment || {}
  payload.payment.provider_id = providerId;
  payload.payment.method = providerName;

  const customerNotes = document.getElementById(`_checkout_customer_notes_${providerId}`);
  if (customerNotes) {
    payload.customer_notes = customerNotes.value;
  }
  const assistedBy = document.getElementById(`_checkout_assisted_by_user_id_${providerId}`);
  if (assistedBy) {
    payload.assisted_by_user_id = assistedBy.value;
  }

  const formData = new FormData(form)

  payload.answers = {}

  formData.forEach((value, key) => {
    const matches = key.match(/answers\[(.*)\]\[answer\]/)
    if(matches) {
      payload.answers[matches[1]] = { answer: value }
    }
  })

  const formMethod = form._method ? form._method.value : form.getAttribute('method');

  // Bypass the form action if the checkout URL is specified in the payload.
  const checkoutUrl = payload.url ? payload.url : form.getAttribute('action');
  Rails.ajax({
    url: checkoutUrl,
    type: formMethod || payload.method,
    beforeSend(xhr, options) {
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      options.data = JSON.stringify(payload);
      return true;
    },
    success: function (response, _textStatus, _jqXHR) {
      if (response.sf) {
        window.parent.postMessage({ type: 'payment_status', status: 'success', message: response.paymentId }, '*');
      } else if (response.redirect_url) {
        window.location = response.redirect_url;
      } else if (response.error_message) {
        refreshForm(response.error_message)
      } else if (response.payment_response && handleSuccess) {
        handleSuccess(response.payment_response.action)
      }
    },
    error: function (_response, _textStatus, jqXHR) {
      if (jqXHR.status === 0) {
        return;
      }

      const error = document.querySelector("[data-general-error-message]")
      if (error) {
        showError(error.getAttribute("data-general-error-message"));
      }
    },
  });
}

export function refreshForm(error) {
  if (error) {
    showError(error)
  } else {
    hideError();
  }

  setPayButton(true)
}
