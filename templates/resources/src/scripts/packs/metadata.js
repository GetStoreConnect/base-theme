import storePathUrl from '../theme/store-path-url'
import { postForm } from '../theme/utils/fetch'

document.addEventListener('DOMContentLoaded', async function () {
  if (document.querySelector('body[data-customer-metadata]')) {
    const data = {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: window.navigator.language,
      screen_resolution: `${window.screen.width * window.devicePixelRatio} X ${window.screen.height * window.devicePixelRatio}`,
    }

    try {
      await postForm(storePathUrl('/cart/customer_metadata'), data)
      document.body.removeAttribute('data-customer-metadata')
    } catch (error) {
      console.error('Error submitting customer metadata:', error)
    }
  }
})
