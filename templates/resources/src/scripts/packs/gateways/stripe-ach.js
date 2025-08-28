import { PaymentForm } from './payment-form'
import { loadStripe } from '@stripe/stripe-js/pure'
import { onDomChange } from '../../theme/utils/init'

const Rails = window.Rails

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="StripeAch"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initStripeAch({ form, providerId })
    }
  })
})

function initStripeAch({ form, providerId }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => stripeCreatePaymentIntent(paymentForm),
  })
  let stripe

  function collectBankAccountForMicrodeposit(response) {
    const paymentIntentSecret = response.payment_intent

    stripe
      .confirmUsBankAccountPayment(paymentIntentSecret, {
        payment_method: {
          billing_details: {
            name: paymentForm.getFieldValue('ach_account_name'),
            email: paymentForm.getFieldValue('ach_email'),
          },
          us_bank_account: {
            account_number: paymentForm.getFieldValue('ach_account_number'),
            routing_number: paymentForm.getFieldValue('ach_routing_number'),
            account_holder_type: paymentForm.getFieldValue('ach_account_holder_type'),
          },
        },
      })
      .then(({ paymentIntent, error }) => {
        if (error) {
          paymentForm.showError(error.message)
        } else {
          const payload = {
            payment_source: {
              tok_id: paymentIntent.id,
            },
          }
          paymentForm.submitData({ payload })
        }
      })
  }

  function stripeCreatePaymentIntent(paymentForm) {
    let data = {
      payment: {
        provider_id: providerId,
        method: 'StripeAch',
      },
      payment_details: {
        name: paymentForm.getFieldValue('ach_account_name'),
        email: paymentForm.getFieldValue('ach_email'),
        account_number: paymentForm.getFieldValue('ach_account_number'),
        routing_number: paymentForm.getFieldValue('ach_routing_number'),
        account_holder_type: paymentForm.getFieldValue('ach_account_holder_type'),
        terms: paymentForm.formFieldElement('ach_terms').checked,
      },
    }

    const url = `${paymentForm.form.getAttribute('action')}/ach`

    Rails.ajax({
      url: url,
      type: 'post',
      beforeSend(xhr, options) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        options.data = JSON.stringify(data)
        return true
      },
      success: function (response, _textStatus, _jqXHR) {
        if (response.redirect_url) {
          window.location = response.redirect_url
        } else if (response.error_message) {
          paymentForm.refreshForm(response.error_message)
        } else {
          collectBankAccountForMicrodeposit(response)
        }
      },
      error: function (_response, _textStatus, jqXHR) {
        if (jqXHR.status == 0) {
          return
        }

        const error = document
          .querySelector('[data-general-error-message]')
          .getAttribute('data-general-error-message')
        paymentForm.showError(error)
      },
    })
  }

  async function initializeStripe() {
    stripe = await loadStripe(paymentForm.apiKey())
  }

  initializeStripe()
}
