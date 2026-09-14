import { onDomChange } from '../theme/utils/init'
import { attachCurrencySanitizer } from '../theme/utils/currency'

onDomChange((node) => {
  const inputs = node.querySelectorAll?.('[data-checkout-deposit-input]') || []
  inputs.forEach(setupDepositInput)
})

function setupDepositInput(input) {
  if (input.dataset.depositBound) return
  input.dataset.depositBound = 'true'

  const form = input.closest('form')
  if (!form) return

  // Keep the field numeric, positive and to the currency's decimal places as the
  // customer types or pastes.
  const decimals = attachCurrencySanitizer(input)

  // Clamp to the allowed range and submit once the customer commits a value.
  input.addEventListener('change', () => commitDeposit(input, form, decimals))
}

function commitDeposit(input, form, decimals) {
  const min = parseFloat(input.dataset.min) || 0
  const max = parseFloat(input.dataset.max)
  const messageEl = form.querySelector('[data-checkout-deposit-message]')
  let value = parseFloat(input.value)

  hideMessage(messageEl)

  // Empty or zero clears the deposit — the customer pays the full total.
  if (isNaN(value) || value <= 0) {
    input.value = ''
    form.requestSubmit()
    return
  }

  if (!isNaN(max) && value > max) value = max

  if (min > 0 && value < min) {
    value = min
    showMessage(messageEl, input.dataset.belowMinMessage)
  }

  input.value = value.toFixed(decimals)
  form.requestSubmit()
}

function showMessage(el, text) {
  if (!el || !text) return
  el.textContent = text
}

function hideMessage(el) {
  if (!el) return
  el.textContent = ''
}

// After the deposit is updated, sync any payment form's data-total-payable.
document.addEventListener('sc.deposit-updated', (event) => {
  const data = event.detail?.data
  if (!data) return

  const totalPayable = data.checkout_deposit_amount || data.checkout_full_total
  document.querySelectorAll('form[data-total-payable]').forEach((form) => {
    form.dataset.totalPayable = totalPayable
  })
})
