import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  ;[...node.querySelectorAll('[data-price-picker]')].forEach((picker) => {
    const trigger = picker.querySelector('[data-price-picker-trigger]')
    if (!trigger) return

    trigger.addEventListener('click', () => open(picker))

    buttons = [...picker.querySelectorAll('[data-price-picker-btn]')]

    buttons.map((button) => {
      button.addEventListener('click', (e) => {
        set(e, picker)
      })

      if (button.hasAttribute('data-price-picker-btn-other')) {
        button.addEventListener('click', (e) => {
          manualEntry(picker)
        })
      }
    })
    document.addEventListener('click', (e) => {
      closeIfClickElsewhere(e, picker)
    })
  })
}

function validateInput(input) {
  if (input.dataset.validationAttached) return
  input.dataset.validationAttached = 'true'

  const errorBox = document.querySelector(`[data-error-for="${input.name}"]`)

  input.addEventListener('input', () => {
    const min = input.min ? Number(input.min) : null
    const max = input.max ? Number(input.max) : null
    const value = Number(input.value)

    const hasMin = !isNaN(min) && min !== null
    const hasMax = !isNaN(max) && max !== null

    let hasError = false

    if (hasMin && hasMax) {
      if (value < min || value > max) hasError = true
    } else if (hasMin) {
      if (value < min) hasError = true
    } else if (hasMax) {
      if (value > max) hasError = true
    }

    let finalMessage = ''
    if (hasError) {
      let message = ''

      if (hasMin && hasMax) {
        message = input.dataset.errorBetween
      } else if (hasMin) {
        message = input.dataset.errorAtLeast
      } else if (hasMax) {
        message = input.dataset.errorAtMost
      }

      finalMessage = input.dataset.errorMessage.replace('%{message}', message)
    }

    input.classList.toggle('is-error', hasError)
    input.setCustomValidity(finalMessage)

    if (errorBox) {
      errorBox.classList.toggle('has-error', hasError)
      errorBox.textContent = finalMessage
    }
  })
}

function set(e, picker) {
  const input = picker.querySelector('[data-price-picker-input]')

  input.value = e.target.value
  picker.querySelector('[data-price-picker-value]').innerText = e.target.innerText
  if (input.value) input.dispatchEvent(new Event('change'))
  close(picker)
}

function manualEntry(picker) {
  const input = picker.querySelector('[data-price-picker-input]')

  input.classList.add('is-active')
  validateInput(input)
  input.focus()
  picker.querySelector('[data-price-picker-trigger]').classList.add('is-hidden')
  close(picker)
}

function open(picker) {
  closeOpenPickers()

  const pickerList = picker.querySelector('[data-price-picker-list]')

  pickerList.classList.add('is-active')
  pickerList.setAttribute('aria-hidden', false)
}

function close(picker) {
  const pickerList = picker.querySelector('[data-price-picker-list]')

  pickerList.classList.remove('is-active')
  pickerList.setAttribute('aria-hidden', true)
}

function closeIfClickElsewhere(e, picker) {
  if (!picker.contains(e.target)) {
    close(picker)
  }
}

function closeOpenPickers() {
  const pickerLists = document.querySelectorAll('[data-price-picker-list].is-active')

  ;[...pickerLists].forEach((pickerList) => close(pickerList.closest('[data-price-picker]')))
}
