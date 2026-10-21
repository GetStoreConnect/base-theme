import Rails from '@rails/ujs'
window.Rails = Rails

if (!window._rails_loaded) Rails.start()

import Bugsnag from '@bugsnag/js'
import BugsnagPerformance from '@bugsnag/browser-performance'

// An uncaught value that isn't an Error has no message or stack to act on,
// whichever script threw it. Handled reports are deliberate, so always keep them.
function isLegitimateError(event) {
  if (!event.unhandled) return true

  const value = event.originalError
  return value instanceof Error || Object.prototype.toString.call(value) === '[object Error]'
}

window.StoreConnect = window.StoreConnect || {}
window.StoreConnect.configure = function (ENV) {
  if (ENV.BUGSNAG_RELEASE_STAGE === 'test') {
    return
  }
  if (!ENV.BUGSNAG_KEY) {
    throw new Error('Failed to configure Bugsnag, missing BUGSNAG_KEY')
  }

  window.bugsnagClient = Bugsnag
  Bugsnag.start({
    apiKey: ENV.BUGSNAG_KEY,
    appVersion: ENV.STORE_CONNECT_VERSION,
    notifyReleaseStages: ['production', 'staging'],
    releaseStage: ENV.BUGSNAG_RELEASE_STAGE,
    appType: 'client',
    plugins: [],
    onError: isLegitimateError,
  })

  if (ENV.BUGSNAG_PERFORMANCE_FRONTEND === 'true') {
    BugsnagPerformance.start({
      apiKey: ENV.BUGSNAG_KEY,
      appVersion: ENV.STORE_CONNECT_VERSION,
      bugsnag: Bugsnag,
      logger: null,
      notifyReleaseStages: ['production', 'staging', 'development'],
      releaseStage: ENV.BUGSNAG_RELEASE_STAGE,
    })
  }
}
