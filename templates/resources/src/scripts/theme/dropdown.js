import { onDomChange } from './utils/init'

onDomChange(init)

function init(node) {
  ;[...node.querySelectorAll('[data-dropdown-trigger]')].forEach((trigger) => start(trigger))
}

let activeDropdown = null

function start(trigger) {
  const dropdown = trigger.parentNode
  const menu = dropdown.querySelector('[data-dropdown-target]')
  const options = [...dropdown.querySelectorAll('[data-dropdown-option]')]
  const label = trigger.querySelector('[data-dropdown-selection]')

  trigger.addEventListener('click', () => {
    dropdown === activeDropdown ? close(dropdown) : open(dropdown)
  })

  trigger.addEventListener('close', () => {
    close(dropdown)
  })

  options.map((option) =>
    option.addEventListener('click', () => {
      if (option.type === 'checkbox') return
      if (menu.hasAttribute('data-dropdown-ignore-clicks')) return
      if (label) label.innerText = option.value || label.dataset.default
      close(dropdown)
    })
  )
}

function open(dropdown) {
  const menu = dropdown.querySelector('[data-dropdown-target]')

  if (activeDropdown) close(activeDropdown)
  activeDropdown = dropdown
  document.addEventListener('click', closeIfClickOutsideMenu)
  dropdown.classList.add('is-active')
  dropdown.querySelector('[data-dropdown-trigger]').classList.add('is-active')
  menu.classList.remove('sc-hide')
  menu.classList.add('is-active')
  menu.setAttribute('aria-expanded', 'true')
}

function close(dropdown) {
  const menu = dropdown.querySelector('[data-dropdown-target]')

  activeDropdown = null
  document.removeEventListener('click', closeIfClickOutsideMenu)
  dropdown.classList.remove('is-active')
  dropdown.querySelector('[data-dropdown-trigger]').classList.remove('is-active')
  menu.classList.remove('is-active')
  menu.classList.add('sc-hide')
  menu.setAttribute('aria-expanded', 'false')
}

function closeIfClickOutsideMenu(event) {
  if (activeDropdown.parentNode.contains(event.target)) return

  // specifically for the booking calendar, which is actually in
  // the activeDropdown.parentNode but reports as outside
  if (event.target.closest('[data-dropdown-in-menu]')) return

  event.preventDefault()
  close(activeDropdown)
}
