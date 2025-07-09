import { init, loadScript, showError, setPayButton, submitData } from './common'
import { apiKey, isProduction } from './form'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="SecurePay"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initSecurePay({ form, providerId })
    }
  })
})

// Default input styles if not provided via data attribute
function defaultInputStyles() {
  return {
    backgroundColor: 'transparent',
    label: {
      font: {
        family: '-apple-system, BlinkMacSystemFont, sans-serif',
        size: '16px',
        color: '#4d4d4d',
      },
    },
    input: {
      font: {
        family: '-apple-system, BlinkMacSystemFont, sans-serif',
        size: '15px',
      },
    },
  }
}

function initSecurePay({ form, providerId }) {
  var mySecurePayUI

  init(form, function () {
    mySecurePayUI.tokenise()
  })

  // Get inputStyles from the data attribute, if available
  const inputStyles = form.dataset.inputStyles
    ? JSON.parse(form.dataset.inputStyles)
    : defaultInputStyles()

  const scriptId = `SecurePayScript${providerId}`

  var securepayUiUrl = isProduction()
    ? 'https://payments.auspost.net.au/v3/ui/client/securepay-ui.min.js'
    : 'https://payments-stest.npe.auspost.zone/v3/ui/client/securepay-ui.min.js'

  loadScript({
    url: securepayUiUrl,
    id: scriptId,
    onload: function () {
      const merchantCode = form.dataset.merchantCode

      setPayButton(false)

      function tokeniseSuccessful(tokenisedCard) {
        const payload = {
          payment_source: {
            tok_id: tokenisedCard.token,
          },
        }
        submitData({ payload })
      }

      function tokeniseFailed(errors) {
        // error while tokenising card
        const errorMessage = JSON.parse(errors).errors[0].detail
        showError(errorMessage)
      }

      function initStyles() {
        // this removes border around the iframe object
        form.getElementsByClassName('securepay-ui-iframe')[0].classList.add('sc-border-none')
      }

      function loadComplete() {
        initStyles()
        setPayButton(true)
      }

      mySecurePayUI = new securePayUI.init({
        containerId: `SecurePayContainer${providerId}`,
        scriptId: scriptId,
        clientId: apiKey(),
        merchantCode,
        card: {
          onTokeniseSuccess: tokeniseSuccessful,
          onTokenizeError: tokeniseFailed,
        },
        style: inputStyles,
        onLoadComplete: loadComplete,
      })
    },
  })
}
