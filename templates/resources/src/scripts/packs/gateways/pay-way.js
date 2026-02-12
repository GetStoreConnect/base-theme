import { PaymentForm } from './payment-form'
import { onDomChange } from '../../theme/utils/init'

// Register onDomChange handler to detect and initialize PayWay forms
onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="PayWay"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initPayWay({ form })
    }
  })
})

// Internal initialization function
function initPayWay({ form }) {
  const paymentForm = new PaymentForm(form, {
    onSubmit: () => onSubmit(paymentForm),
  })

  const apiKey = paymentForm.apiKey()
  let creditCardFrame = null

  const tokenCallback = function (err, data) {
    if (err) {
      paymentForm.showError('Invalid: ' + err.message)
    } else {
      const payload = {
        paymentSource: {
          singleUseTokenId: data.singleUseTokenId,
        },
      }
      paymentForm.submitData({ payload })
    }
  }

  const createdCallback = function (err, frame) {
    if (err) {
      console.error('Error creating frame: ' + err.message)
    } else {
      creditCardFrame = frame
    }
  }

  const options = {
    publishableApiKey: apiKey,
    tokenMode: 'callback',
    onValid: function () {
      paymentForm.setPayButton(true)
    },
    onInvalid: function () {
      paymentForm.setPayButton(false)
    },
  }

  function initializePayWayIframe() {
    payway.createCreditCardFrame(options, createdCallback)
  }

  function onSubmit() {
    creditCardFrame.getToken(tokenCallback)
  }

  initializePayWayIframe()
}
