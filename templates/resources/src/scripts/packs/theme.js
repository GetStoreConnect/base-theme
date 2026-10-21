import '../theme/click-blocker'
import '../theme/dropdown'
import '../theme/format-date'
import '../theme/liquid-components'
import '../theme/loader'
import '../theme/modal'
import '../theme/remote-forms'
import storePathUrl from '../theme/store-path-url'
import '../theme/tabs'
import '../theme/toggle-visibility'

// The sanctioned way for a theme's own code to build a storefront request path
// in the store's renamed words. Client code should call this rather than swap
// segments by hand, which cannot tell a real segment from a matching slug.
window.StoreConnect = window.StoreConnect || {}
window.StoreConnect.storePath = storePathUrl
