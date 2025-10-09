import Rails from '@rails/ujs'
window.Rails = Rails

if (!window._rails_loaded) Rails.start()

import Bugsnag from '@bugsnag/js'
import BugsnagPerformance from '@bugsnag/browser-performance'

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
