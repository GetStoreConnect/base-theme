import { onDomChange } from './utils/init'

onDomChange(init)

function init(node) {
  ;[...node.querySelectorAll('[data-modal-trigger]')].map((trigger) => {
    trigger.addEventListener('click', toggle)
  })
}

function toggle(event) {
  const id = event.currentTarget.getAttribute('data-modal-trigger'),
    modal = document.querySelector(`[data-modal="${id}"]`)

  if (modal.classList.contains('is-active')) {
    modal.classList.remove('is-active')
    document.querySelector('body').style.overflow = 'visible'
  } else {
    modal.classList.add('is-active')
    document.querySelector('body').style.overflow = 'hidden'
  }
}
