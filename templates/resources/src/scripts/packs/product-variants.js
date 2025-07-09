import { startLoader, stopLoader } from '../theme/loader'
import { onDomChange } from '../theme/utils/init'

onDomChange(init)

window.addEventListener('popstate', popVariantPathFromHistory)

let clearButton, resetButton, selectionPrompt, variantSelector

function init(node) {
  const variantOptions = [...node.querySelectorAll('[data-variant-option]')]

  if (variantOptions.length == 0) return

  variantSelector = variantOptions[0].closest('[data-variant-option-selector]')

  clearButton = variantSelector.querySelector('[data-variant-clear-button]')
  resetButton = variantSelector.querySelector('[data-variant-reset-button]')
  selectionPrompt = variantSelector.querySelector('[data-variant-selection-prompt]')

  // Event listeners
  variantOptions.map((option) => {
    option.addEventListener('change', (event) => {
      configureOptions(event.target)
    })
  })

  variantSelector.querySelectorAll('[data-variant-type] select').forEach((selectElem) => {
    selectElem.addEventListener('change', (event) => {
      configureOptions(event.target)
    })
  })

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      clearSelectedOptions()
      if (resetButton) resetButton.classList.remove('is-hidden')
      if (selectionPrompt) selectionPrompt.classList.remove('is-hidden')
    })
  }

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      resetSelectedOptions()
      configureOptions()
      resetButton.classList.add('is-hidden')
      if (selectionPrompt) selectionPrompt.classList.remove('is-hidden')
    })
  }

  configureOptions()
}

function configureOptions(target = null) {
  if (!window.variantData) return

  const targetType = target ? target.dataset.type : null

  const selectedOptions = getSelectedOptions()
  if (Object.keys(selectedOptions).length == 0) return

  const types = window.variantData['types']
  const products = window.variantData['products'].filter((product) => {
    for (const selectedOption of selectedOptions) {
      if (product[selectedOption.type] != selectedOption.value) {
        return false
      }
    }
    return true
  })

  const enabledValuesByType = {}
  for (const product of products) {
    for (const availableType of types) {
      if (target && targetType == availableType) continue
      enabledValuesByType[availableType] = enabledValuesByType[availableType] || new Set()
      enabledValuesByType[availableType].add(product[availableType])
    }
  }

  if (types.length > 1) {
    for (const enabledType of Object.keys(enabledValuesByType)) {
      variantSelector
        .querySelectorAll(`[data-variant-type="${enabledType}"] [data-variant-option]`)
        .forEach((optElem) => {
          disable(optElem, !enabledValuesByType[enabledType].has(optElem.value))
        })
    }
  }

  const selectedProduct = checkForSelectedProduct(selectedOptions)
  if (selectedProduct) {
    load(selectedProduct.path)
  } else {
    if (resetButton) resetButton.classList.remove('is-hidden')
    if (selectionPrompt) selectionPrompt.classList.add('is-hidden')
  }
}

function getSelectedOptions() {
  const selectedOptions = []
  variantSelector
    .querySelectorAll('[data-variant-type] [data-variant-option]')
    .forEach((option) => {
      if (option.selected || option.checked) {
        selectedOptions.push({ type: option.dataset.type, value: option.value })
      }
    })
  return selectedOptions
}

function clearSelectedOptions() {
  const path = clearButton.dataset.clearPath
  if (path) {
    load(path)
  } else {
    variantSelector
      .querySelectorAll('[data-variant-type] [data-variant-option]')
      .forEach((option) => {
        if (option.selected != undefined) {
          const select = option.closest('select')
          if (select) {
            const options = select.querySelectorAll('option')
            if (options.length > 0) options[0].selected = true
          }
        }
        if (option.checked != undefined) {
          option.checked = false
        }
        disable(option, false)
      })
  }
}

function resetSelectedOptions() {
  variantSelector
    .querySelectorAll('[data-variant-type] [data-variant-option]')
    .forEach((option) => {
      if (option.selected != undefined) {
        option.selected = option.dataset.selected == 'true'
      }
      if (option.checked != undefined) {
        option.checked = option.dataset.checked == 'true'
      }
      disable(option, false)
    })
}

function checkForSelectedProduct(selectedOptions) {
  const types = window.variantData['types']
  const products = window.variantData['products']

  for (const type of types) {
    if (!selectedOptions.find((option) => option.type == type)) {
      return false
    }
  }

  const selectedProduct = products.find((product) => {
    for (const option of selectedOptions) {
      if (product[option.type] != option.value) {
        return false
      }
    }
    return true
  })

  return selectedProduct
}

function load(path, callback) {
  if (window.location.pathname != path) {
    if (path == null) {
      path = window.location.pathname
    }

    const element = document.querySelector('[data-remote-target="product"]')

    startLoader(element)

    fetch(path, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        pushVariantPathToHistory(path)

        if (element) element.innerHTML = json['html']
        callback && callback()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        stopLoader(element)
      })
  }
}

function pushVariantPathToHistory(path) {
  if (window.location.pathname === path) {
    return
  }
  window.history.pushState(path, null, path)
}

function popVariantPathFromHistory(_event) {
  load(null)
}

function disable(option, bool) {
  option.disabled = bool
}
