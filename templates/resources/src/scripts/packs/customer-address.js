import { postForm } from '../theme/utils/fetch'
import storePath from '../theme/store-path-url'
import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  ;[...node.querySelectorAll('[data-checkout-address-container]')].forEach((element) => {
    configure(element)
  })
}

function configure(element) {
  const country_select = document.getElementById(element.getAttribute('data-country-id'))
  const state_id = element.getAttribute('data-state-id')
  const address_type = element.getAttribute('data-address-type')
  const billing_same_as_shipping_element = document.getElementById(
    element.getAttribute('data-billing-same-id')
  )

  if (country_select) {
    updateStates(country_select.value)

    country_select.addEventListener('change', function (event) {
      const countryId = event.target.value
      updateStates(countryId)
      updateRequired(countryId)
    })
  }

  const saved_select = element.querySelector('[data-saved-address-select]')
  const save_to_address_book_field = element.querySelector('[data-save-to-address-book-field]')

  // Offering to save an address the customer picked from the book is
  // meaningless, so hide it — and uncheck, since back-navigation can restore a
  // stale tick. Duplicates aren't the concern: find_or_create_address dedups.
  function syncSaveToBookVisibility() {
    if (!save_to_address_book_field || !saved_select) return
    const hasSelection = saved_select.value !== ''
    save_to_address_book_field.hidden = hasSelection
    if (hasSelection) {
      const cb = save_to_address_book_field.querySelector('input[type="checkbox"]')
      if (cb) cb.checked = false
    }
  }

  if (saved_select) {
    saved_select.addEventListener('change', function (event) {
      const option = event.target.selectedOptions[0]
      // The blank "enter a new address" option is the only one without a value.
      const picked = option && option.value

      // Keep a typed draft so returning to "enter a new address" restores it.
      // Only when actually typed: the fields may hold a server-side prefill from
      // the cart, and restoring that leaves a populated form after the customer
      // asked for a blank one. Flags sit on the element, not this closure, since
      // onDomChange can wire the same container more than once.
      if (picked && element._addressTouched && element._savedAddressDraft === undefined) {
        element._savedAddressDraft = readAddressFields()
      }

      if (!picked) {
        applyAddressFields(element._savedAddressDraft || {})
        delete element._savedAddressDraft
        syncSaveToBookVisibility()
        return
      }

      applyAddressFields({
        city: option.dataset.city,
        postal_code: option.dataset.postalCode,
        state: option.dataset.state,
        country: option.dataset.country,
        address_lines: addressLinesFrom(option),
      })

      syncSaveToBookVisibility()
    })

    // A server-side pre-select fires no change event, so reconcile now.
    syncSaveToBookVisibility()

    // An edit means the form no longer represents the picked entry, so reset the
    // selector. Only genuine edits reach this: programmatic population assigns
    // `.value` and dispatches `change`, never `input`.
    element.querySelectorAll('input, select').forEach((field) => {
      if (field === saved_select) return
      field.addEventListener('input', function () {
        // Before the early return: typing while already on "enter a new address"
        // is exactly the draft worth keeping.
        element._addressTouched = true
        if (saved_select.value === '') return
        saved_select.value = ''
        syncSaveToBookVisibility()
      })
    })
  }

  function readAddressFields() {
    const state_input = document.getElementById(state_id)
    return {
      city: fieldValue(`${address_type}_city`),
      postal_code: fieldValue(`${address_type}_postal_code`),
      state: state_input ? state_input.value : '',
      country: country_select ? country_select.value : '',
      address_lines: currentAddressLines(),
    }
  }

  // Also the clear path: an empty object blanks everything, since the setters
  // coerce undefined to "".
  function applyAddressFields(values) {
    setFieldByName(`${address_type}_city`, values.city)
    setFieldByName(`${address_type}_postal_code`, values.postal_code)
    setAddressLines(values.address_lines || [])

    // The state select is populated asynchronously by updateStates() after the
    // country change fires. Set data-selected BEFORE dispatching so
    // buildStatesDropdown picks up the right option when its fetch resolves.
    const state_input = document.getElementById(state_id)
    if (state_input) state_input.setAttribute('data-selected', values.state || '')

    if (country_select) {
      country_select.value = values.country || ''
      country_select.dispatchEvent(new Event('change'))
    }
  }

  // getAttribute, not dataset: dataset only camel-cases a hyphen followed by a
  // letter, so the key would be the unusable `addressLine-1`. Blank lines are
  // still attributes, so only the end returns null — which also lets padding
  // lines clear their input.
  function addressLinesFrom(option) {
    const lines = []
    for (let i = 1; option.getAttribute(`data-address-line-${i}`) !== null; i++) {
      lines.push(option.getAttribute(`data-address-line-${i}`))
    }
    return lines
  }

  function setFieldByName(name, value) {
    const input = element.querySelector(`[name="${name}"]`)
    if (input) input.value = value || ''
  }

  function fieldValue(name) {
    const input = element.querySelector(`[name="${name}"]`)
    return input ? input.value : ''
  }

  function currentAddressLines() {
    return [...element.querySelectorAll(`input[name="${address_type}_address_lines[]"]`)].map(
      (input) => input.value
    )
  }

  function setAddressLines(lines) {
    const inputs = element.querySelectorAll(`input[name="${address_type}_address_lines[]"]`)
    inputs.forEach((input, idx) => {
      input.value = lines[idx] || ''
    })
  }

  if (billing_same_as_shipping_element) {
    billing_same_as_shipping_element.addEventListener('change', () => {
      if (country_select) {
        updateRequired(country_select.value)
      }
    })
  }

  if (country_select) {
    updateRequired(country_select.value)
  }

  function billing_same_as_shipping() {
    return billing_same_as_shipping_element ? billing_same_as_shipping_element.checked : false
  }

  function updateRequiredFields(fields) {
    ;[
      ...document.querySelectorAll(
        '[data-required-fields-form] input, [data-required-fields-form] select'
      ),
    ].forEach((input) => {
      const name = input.name
      if (name && input.name.includes(address_type)) {
        let required = fields.includes(name)
        if (address_type === 'billing' && billing_same_as_shipping()) {
          required = false
        }

        // If name=shipping_address_lines[] then only check if first one is required
        if (name.includes('address_lines')) {
          const form = input.form
          const index = Array.from(form.querySelectorAll(`input[name="${input.name}"]`)).indexOf(
            input
          )
          if (index === 0) {
            required = fields.includes(name.replace(`[]`, ``))
          }
        }

        if (required) {
          input.required = true
          input.dataset.required = true
          if (input.labels) {
            input.labels.forEach((label) => {
              label.dataset.required = true
            })
          }
        } else {
          input.required = false
          delete input.dataset.required
          if (input.labels) {
            input.labels.forEach((label) => {
              delete label.dataset.required
              const inputContainer = label.parentElement
              if (inputContainer) {
                inputContainer.classList.remove('required')
              }
            })
          }
        }
      }
    })
  }

  async function updateRequired(country_id) {
    try {
      const data = await postForm(storePath('/checkout/required_fields'), {
        country_id: country_id,
        billing_same_as_shipping: billing_same_as_shipping(),
      })
      updateRequiredFields(data)
    } catch (error) {
      console.error('Error updating required fields:', error)
    }
  }

  async function updateStates(id) {
    if (id === '') {
      return false
    }

    try {
      const data = await postForm(storePath('/checkout/find_states'), { country_id: id })
      buildStatesDropdown(data)
    } catch (error) {
      console.error('Error updating states:', error)
    }
  }

  function buildStatesDropdown(data) {
    const state = document.getElementById(state_id)
    if (state) {
      const selected_value = state.getAttribute('data-selected')

      state.options.length = 0
      data.unshift(['', state.getAttribute('placeholder')])

      data.forEach((element) => {
        const newOption = document.createElement('option')
        const optionText = document.createTextNode(element[1])
        newOption.appendChild(optionText)
        newOption.setAttribute('value', element[0])
        if (element[0] === selected_value) {
          newOption.setAttribute('selected', true)
        }
        state.appendChild(newOption)
      })
    }
  }
}
