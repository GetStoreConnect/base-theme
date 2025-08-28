import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Bambora"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initBambora({ form, providerId })
    }
  })
})

function initBambora({ form, providerId }) {
  const cardNumberSelector = `card_number__payment__${providerId}`
  const cardVerificationSelector = `card_verification__payment__${providerId}`
  const cardExpirySelector = `card_expiry__payment__${providerId}`

  var checkout
  var isCardNumberComplete
  var isCVVComplete
  var isExpiryComplete

  const paymentForm = new PaymentForm(form, {
    onSubmit: () => createToken(paymentForm),
  })

  function createToken(paymentForm) {
    checkout.createToken((response) => createTokenCallback(response, paymentForm))
  }

  function createTokenCallback(response, paymentForm) {
    if (response.error) {
      paymentForm.showError(response.error.message)
    } else {
      const payload = {
        payment_source: {
          tok_id: response.token,
          last_digits: response.last4,
          month: response.exp_month,
          year: response.exp_year,
        },
      }
      paymentForm.submitData({ payload })
    }
  }

  function hideErrorForId(id) {
    const element = document.getElementById(id)

    if (element !== null) {
      const errorElement = document.getElementById(`${id}-error`)
      if (errorElement !== null) {
        errorElement.innerHTML = ''
      }

      const bootStrapParent = document.getElementById(`${id}-bootstrap`)
      if (bootStrapParent !== null) {
        bootStrapParent.classList.remove('has-error')
        bootStrapParent.classList.add('has-success')
      }
    }
  }

  function showErrorForId(id, message) {
    const element = document.getElementById(id)

    if (element !== null) {
      const errorElement = document.getElementById(`${id}-error`)
      if (errorElement !== null) {
        errorElement.innerHTML = message
      }

      const bootStrapParent = document.getElementById(`${id}-bootstrap`)
      if (bootStrapParent !== null) {
        bootStrapParent.classList.add('has-error')
        bootStrapParent.classList.remove('has-success')
      }
    }
  }

  function createCheckoutInputs() {
    const style = {
      base: {
        color: '#333333',
        fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        padding: '16px',
      },
    }
    const options = {
      style: style,
    }

    // Create and mount the inputs
    // 4030000010001234
    options.placeholder = '0000 0000 0000 0000'
    checkout.create('card-number', options).mount(`#${cardNumberSelector}`)

    // 123
    options.placeholder = 'CVC'
    checkout.create('cvv', options).mount(`#${cardVerificationSelector}`)

    // 12/24
    options.placeholder = 'MM / YY'
    checkout.create('expiry', options).mount(`#${cardExpirySelector}`)
  }

  function addCheckoutListeners() {
    checkout.on('empty', function (event) {
      if (event.empty) {
        switch (event.field) {
          case 'card-number':
            isCardNumberComplete = false
            break
          case 'cvv':
            isCVVComplete = false
            break
          case 'expiry':
            isExpiryComplete = false
            break
        }
        paymentForm.setPayButton({ enabled: false })
      }
    })

    checkout.on('complete', function (event) {
      if (event.field === 'card-number') {
        isCardNumberComplete = true
        hideErrorForId(cardNumberSelector)
      } else if (event.field === 'cvv') {
        isCVVComplete = true
        hideErrorForId(cardVerificationSelector)
      } else if (event.field === 'expiry') {
        isExpiryComplete = true
        hideErrorForId(cardExpirySelector)
      }

      paymentForm.setPayButton({
        enabled: isCardNumberComplete && isCVVComplete && isExpiryComplete,
      })
    })

    checkout.on('error', function (event) {
      if (event.field === 'card-number') {
        isCardNumberComplete = false
        showErrorForId(cardNumberSelector, event.message)
      } else if (event.field === 'cvv') {
        isCVVComplete = false
        showErrorForId(cardVerificationSelector, event.message)
      } else if (event.field === 'expiry') {
        isExpiryComplete = false
        showErrorForId(cardExpirySelector, event.message)
      }
      paymentForm.setPayButton({ enabled: true })
    })
  }

  paymentForm.loadScript({
    url: 'https://libs.na.bambora.com/customcheckout/1/customcheckout.js',
    onload: function () {
      checkout = customcheckout()
      createCheckoutInputs()
      addCheckoutListeners()
    },
  })
}
