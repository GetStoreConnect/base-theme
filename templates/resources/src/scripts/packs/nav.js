import hoverintent from 'hoverintent/dist/hoverintent.min'
import { largeAndUp } from '../theme/viewport'
import { onDomChange } from '../theme/utils/init'

onDomChange(init)

let prevNav

/**
 * Initialise event listeners
 */

function init(node) {
  const triggers = [...node.querySelectorAll('[data-nav-trigger]')]

  if (largeAndUp()) {
    triggers.forEach((trigger) => {
      hoverintent(trigger.parentNode, show, hide)
    })
  } else {
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', open)
    })
  }

  ;[...node.querySelectorAll('[data-nav-close]')].forEach((btn) => {
    btn.addEventListener('click', close)
  })
}

/**
 * Desktop event handlers
 */

function show(e) {
  const rootNav = document.querySelector('[data-nav=root]')
  const navTrigger = e.target.parentNode
  const nav = navTrigger.querySelector('[data-nav]') || rootNav

  // Unset previously active
  prevNav?.classList?.remove('is-active')
  prevNav = nav

  e.target.classList.add('is-active')
  nav.classList.add('is-active')
  navTrigger.classList.add('is-active')
}

function hide(e) {
  prevNav?.classList?.remove('is-active')

  e.target.parentNode.classList.remove('is-active')
  e.target.parentNode.querySelector('[data-nav-trigger]')?.classList?.remove('is-active')
}

/**
 * Handheld event handlers
 */

function open(event) {
  const navTrigger = event.target
  const navId = navTrigger.getAttribute('data-nav-trigger')
  const nav = document.querySelector('[data-nav="' + navId + '"]')

  if (nav) {
    event.preventDefault()
    prevNav = nav
    nav.classList.add('is-active')
    document.querySelector('body').style.overflow = 'hidden'
  }
}

function close(event) {
  const prevNavId = event.target.getAttribute('data-nav-close')

  prevNav.classList.remove('is-active')

  if (prevNavId) {
    prevNav = document.querySelector('[data-nav="' + prevNavId + '"]')
  } else {
    prevNav = null
    document.querySelector('body').style.overflow = 'visible'
  }
}
