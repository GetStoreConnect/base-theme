import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  const billingForm = node.querySelector('[data-billing-form]')
  const billingCheckbox = node.querySelector('[data-billing-checkbox] input[type=checkbox]')

  if (!billingForm || !billingCheckbox) {
    return
  }

  if (billingCheckbox.checked) {
    // remove required attribute from all inputs
    billingForm.querySelectorAll('input, select').forEach((input) => {
      input.removeAttribute('required')
    })
  } else {
    // add required attribute to all inputs if it is contained in a div with the class "required"
    billingForm.querySelectorAll('.required input, .required select').forEach((input) => {
      input.setAttribute('required', '')
    })
  }

  billingCheckbox.addEventListener('change', function () {
    billingForm.classList.toggle('is-hidden')
  })
}
