import hoverintent from 'hoverintent/dist/hoverintent.min'
import { largeAndUp } from '../theme/viewport'
import { onDomChange } from '../theme/utils/init'

onDomChange(init)

/* Separating handlers for different events */
/* To Do: Remove function after resolving DOM events on variants */
function init(node) {
  menuTriggers(node)
}

window.addEventListener('resize', () => menuTriggers(document))

/**
 * Initialise event listeners
 */

function menuTriggers(scope) {
  const triggers = [...scope.querySelectorAll('[data-menu-init]')]
  const backBtns = [...scope.querySelectorAll('[data-menu-x]')]

  triggers.forEach((btn) => btn.removeEventListener('click', open))
  backBtns.forEach((btn) => btn.removeEventListener('click', close))

  backBtns.map((btn) => btn.addEventListener('click', close))

  // Desktop events
  if (largeAndUp()) {
    triggers.map((trigger) => {
      hoverintent(menuGroup(trigger), show, hide)
    })
  }

  // Handheld events
  else {
    triggers.map((trigger) => {
      trigger.addEventListener('click', open)
    })
  }
}

/**
 * Desktop event handlers
 */

function menuGroup(el) {
  return el.closest('[data-menu-group]') || el.closest('li')
}

function show(event) {
  const group = menuGroup(event.target)
  const menu = group.querySelector('[data-menu]')

  if (menu) {
    group.classList.add('is-active')
    menu.classList.add('is-active')
  }
}

function hide(event) {
  const group = menuGroup(event.target)
  const menu = group.querySelector('[data-menu]')

  if (menu) {
    group.classList.remove('is-active')
    menu.classList.remove('is-active')
  }
}

/**
 * Handheld event handlers
 */

function open(event) {
  const menuId = event.target.getAttribute('data-menu-init')
  const menu = document.querySelector(`[data-menu="${menuId}"]`)

  if (menu) {
    event.preventDefault()
    menu.classList.add('is-active')
    document.querySelector('body').style.overflow = 'hidden'
  }
}

function close(event) {
  const body = document.querySelector('body')
  const menu = event.target.closest('[data-menu]')
  const isRoot = menu.classList.contains('tier1')

  menu.classList.remove('is-active')
  if (isRoot) body.style.overflow = 'visible'
}
