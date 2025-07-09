require('@rails/ujs').start()

import Bugsnag from '@bugsnag/js'

window.StoreConnect = window.StoreConnect || {}
window.StoreConnect.configure = function (ENV) {
  if (ENV.BUGSNAG_KEY) {
    window.bugsnagClient = Bugsnag
    Bugsnag.start({
      apiKey: ENV.BUGSNAG_KEY,
      appVersion: ENV.STORE_CONNECT_VERSION,
      notifyReleaseStages: ['production', 'staging'],
      releaseStage: ENV.BUGSNAG_RELEASE_STAGE,
      appType: 'client',
      plugins: [],
    })
  } else {
    throw new Error('Failed to configure Bugsnag, missing BUGSNAG_KEY')
  }
}
