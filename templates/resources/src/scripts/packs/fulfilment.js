import { onDomChange } from '../theme/utils/init'

window.StoreConnectUI = window.StoreConnectUI || {}

window.StoreConnectUI.Fulfilment = (function () {
  let prevSubset

  onDomChange(init)

  function init(node) {
    ;[...node.querySelectorAll('[data-fulfilment-option-trigger]')].forEach((trigger) =>
      trigger.addEventListener('click', choose)
    )
  }

  function choose(event) {
    const choice = event.currentTarget.parentNode
    const subset = choice.querySelector('[data-fulfilment-option-subset]')

    // We manually handle checking inputs
    // to avoid multiple events firing
    event.preventDefault()

    // If there is a previously opened subset of options
    // we close it when a new choice is made
    if (prevSubset && !prevSubset.contains(choice)) {
      close(prevSubset)
    }

    // If our chosen option has a subset of options we
    // open the subset. Otherwise, we select the option.
    subset ? open(subset) : select(choice)

    enableSubmitButton()
  }

  function select(option) {
    ;[...document.querySelectorAll('[data-fulfilment-option]')].map((option) =>
      option.classList.remove('is-selected')
    )
    option.classList.add('is-selected')
    option.querySelector('input[type=radio]').checked = true
  }

  function close(subset) {
    subset.classList.remove('is-active')
    subset.parentNode.classList.remove('is-active')
  }

  function open(subset) {
    subset.classList.add('is-active')
    subset.parentNode.classList.add('is-active')
    prevSubset = subset
  }

  function enableSubmitButton() {
    const button = document.querySelector('[data-fulfilment-button]')
    const form = button.closest('form')

    if (form.checkValidity() && !form.querySelector('[data-pending]')) {
      document.querySelector('[data-fulfilment-button]').removeAttribute('disabled')
    }
  }
})()
