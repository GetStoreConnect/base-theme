import Rails from '@rails/ujs'
import { init, formFieldElement, showError, submitData, refreshForm } from './common'
import { apiKey } from './form';
import { loadStripe } from '@stripe/stripe-js/pure';

window.StoreConnect = window.StoreConnect || {}
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {}

window.StoreConnect.Gateways.StripeAch = function ({ providerId }) {
  init('StripeAch', providerId, stripeCreatePaymentIntent)
  let stripe;

  function collectBankAccountForMicrodeposit(response) {
    const paymentIntentSecret = response.payment_intent

    stripe.confirmUsBankAccountPayment(paymentIntentSecret, {
      payment_method: {
        billing_details: {
          name: formFieldElement('ach_account_name').value,
          email: formFieldElement('ach_email').value
        },
        us_bank_account: {
          account_number: formFieldElement('ach_account_number').value,
          routing_number: formFieldElement('ach_routing_number').value,
          account_holder_type: formFieldElement('ach_account_holder_type').value,
        }
      },
    })
      .then(({ paymentIntent, error }) => {
        if (error) {
          showError(error.message)
        } else {
          const payload = {
            payment_source: {
              tok_id: paymentIntent.id,
            }
          }
          submitData({ payload })
        }
      })
  }

  function stripeCreatePaymentIntent(form) {
    let data = {
      payment: {
        provider_id: providerId,
        method: 'StripeAch'
      },
      payment_details: {
        name: formFieldElement('ach_account_name').value,
        email: formFieldElement('ach_email').value,
        account_number: formFieldElement('ach_account_number').value,
        routing_number: formFieldElement('ach_routing_number').value,
        account_holder_type: formFieldElement('ach_account_holder_type').value,
        terms: formFieldElement('ach_terms').checked,
      }
    }

    const url = `${form.getAttribute('action')}/ach`

    Rails.ajax({
      url: url,
      type: 'post',
      beforeSend(xhr, options) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        options.data = JSON.stringify(data)
        return true
      },
      success: (function (response, _textStatus, _jqXHR) {
        if (response.redirect_url) {
          window.location = response.redirect_url
        } else if (response.error_message) {
          refreshForm(response.error_message)
        } else {
          collectBankAccountForMicrodeposit(response)
        }
      }),
      error: (function (_response, _textStatus, jqXHR) {
        if (jqXHR.status == 0) {
          return
        }

        const error = document.querySelector("[data-general-error-message]").getAttribute("data-general-error-message")
        showError(error)
      })
    })
  }

  async function initializeStripe() {
    stripe = await loadStripe(apiKey());
  }

  initializeStripe();
}
