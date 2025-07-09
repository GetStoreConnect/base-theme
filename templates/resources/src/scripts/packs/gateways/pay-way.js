import { init, submitData, submitElement } from './common'
import { onDomChange } from '../../theme/utils/init'
import Rails from '@rails/ujs'

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
  init(form, onSubmit)

  const apiKey = form.dataset.apiKey
  const payButton = submitElement()
  let creditCardFrame = null

  const tokenCallback = function (err, data) {
    if (err) {
      Rails.enableElement(payButton)
      const div = document.getElementById(`PayWayPaymentError${providerId}`)

      div.innerHTML = 'Invalid: ' + err.message
    } else {
      const payload = {
        paymentSource: {
          singleUseTokenId: data.singleUseTokenId,
        },
      }
      submitData({ payload })
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
      Rails.enableElement(payButton)
    },
    onInvalid: function () {
      Rails.disableElement(payButton)
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
