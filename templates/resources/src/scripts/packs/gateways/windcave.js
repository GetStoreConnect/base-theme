import { init } from './common'
import { callbackUrl, cacheFormParamsAndOnSubmit } from './form'
import { onDomChange } from '../../theme/utils/init'

// Register onDomChange handler to detect and initialize Windcave forms
onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Windcave"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initWindcave({ form })
    }
  })
})

// Internal initialization function
function initWindcave({ form }) {
  init(form, onClick)

  function onClick() {
    fetch(callbackUrl(), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (result) {
        cacheFormParamsAndOnSubmit(() => {
          location.href = result.form_url
        })
      })
  }
}
