import { form, extractAdditionalFormPayload } from './common'
import fetchWithResponseHandler from '../../theme/utils/fetch'
import storePathUrl from '../../theme/store-path-url'

export function callbackUrl() {
  return form.dataset.callbackUrl
}

export function apiKey() {
  return form.dataset.apiKey
}

// Environment of payment provider, e.g. 'sandbox' or 'production'
export function isProduction() {
  if (!form) {
    console.error('No `form` object found')
    return false
  }

  return form.dataset.apiMode === 'production'
}

export function showWallets() {
  return Boolean(form.dataset.showWallets)
}

export function totalPayable() {
  return form.dataset.totalPayable
}

export function currency() {
  return form.dataset.currencyCode
}

export function merchantCountryCode() {
  return form.dataset.merchantCountryCode
}

/**
 * Wraps an element in a div with classes
 * @param {object} args - The arguments object.
 * @param {HTMLElement} args.element - The element to wrap.
 * @param {string|string[]} [args.classNames] - Class names to add to the wrapper.
 * @returns {HTMLElement} The wrapper div.
 */
export function wrapOuterElement(args) {
  const { element, classNames } = args
  const wrapper = document.createElement('div')

  if (classNames) {
    if (Array.isArray(classNames)) {
      wrapper.classList.add(...classNames)
    } else {
      wrapper.classList.add(classNames)
    }
  }
  wrapper.appendChild(element)
  return wrapper
}

export function addFormInput({ form, name, value }) {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = name
  input.value = value
  form.appendChild(input)
}

export function cacheFormParamsAndOnSubmit(onSubmit) {
  const payload = extractAdditionalFormPayload()

  if (Object.keys(payload).length > 0) {
    fetchWithResponseHandler(storePathUrl('/cache_form_params'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((data) => {
        onSubmit()
      })
      .catch((error) => {
        console.error('Error caching questions:', error)
      })
  } else {
    onSubmit()
  }
}
