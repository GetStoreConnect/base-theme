import storePathUrl from '../theme/store-path-url'
import fetchWithResponseHandler from '../theme/utils/fetch'

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('body[data-customer-metadata]')) {
    const data = {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: window.navigator.language,
      screen_resolution: `${window.screen.width * window.devicePixelRatio} X ${window.screen.height * window.devicePixelRatio}`,
    }

    fetchWithResponseHandler(storePathUrl('/cart/customer_metadata'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString(),
    }).then((_response) => {
      document.body.removeAttribute('data-customer-metadata')
    })
  }
})
