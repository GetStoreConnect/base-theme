import { mediumAndUp } from '../theme/viewport'
import Loader from '../theme/loader'
import { onDomChange } from '../theme/utils/init'

window.StoreConnectUI = window.StoreConnectUI || {}

window.StoreConnectUI.Filters = (function () {
  let isVisible, loader

  onDomChange(init)

  function init(node) {
    isVisible = mediumAndUp() ? true : false
    loader = Loader({ target: null, contextual: false })

    if (mediumAndUp() && node.querySelector('[data-filters-trigger]')) {
      document.querySelector('[data-filters-button-hide]').classList.remove('is-hidden')
      document.querySelector('[data-filters-button-show]').classList.add('is-hidden')
    }
  }

  function show() {
    isVisible = true

    if (mediumAndUp()) {
      document.querySelector('[data-product-sidebar]').classList.remove('is-hidden')
      document.querySelector('[data-product-grid]').classList.remove('is-expanded')
      document.querySelector('[data-filters-button-show]').classList.add('is-hidden')
      document.querySelector('[data-filters-button-hide]').classList.remove('is-hidden')

      if (document.querySelector('[data-card-grid]')) {
        document.querySelector('[data-card-grid]').classList.add('is-offset-by-sidebar')
      }
    } else {
      document.querySelector('[data-filters]').classList.add('is-active')
    }
  }

  function hide() {
    isVisible = false

    if (mediumAndUp()) {
      document.querySelector('[data-product-sidebar]').classList.add('is-hidden')
      document.querySelector('[data-product-grid]').classList.add('is-expanded')
      document.querySelector('[data-filters-button-show]').classList.remove('is-hidden')
      document.querySelector('[data-filters-button-hide]').classList.add('is-hidden')

      if (document.querySelector('[data-card-grid]')) {
        document.querySelector('[data-card-grid]').classList.remove('is-offset-by-sidebar')
      }
    } else {
      document.querySelector('[data-filters]').classList.remove('is-active')
    }
  }

  return {
    toggle: () => (isVisible ? hide() : show()),

    reset: () => document.querySelector('[data-filters]').reset(),

    submit: () => {
      if (mediumAndUp()) {
        loader.on()
        document.querySelector('[data-filters]').submit()
      }
    },
  }
})()
