import storePathUrl from '../theme/store-path-url'
import { onDomChange } from '../theme/utils/init'
import { postJSON } from '../theme/utils/fetch'

// Drives the Vii gift card apply form in the checkout vouchers
// section: check the card balance via /balance_checks, then reveal the
// amount input (defaulted to min(card balance, amount payable); the
// customer can change it) and the Apply submit.
onDomChange((node) => {
  node.querySelectorAll('[data-vii-voucher]').forEach((container) => {
    initViiVoucher(container)
  })
})

function initViiVoucher(container) {
  const cardInput = container.querySelector('[data-vii-voucher-field="card-number"]')
  const pinInput = container.querySelector('[data-vii-voucher-field="pin"]')
  const amountInput = container.querySelector('[data-vii-voucher-field="amount"]')
  const checkButton = container.querySelector('[data-vii-voucher-check-balance]')
  const balanceInfo = container.querySelector('[data-vii-voucher-balance-info]')
  const applyStep = container.querySelector('[data-vii-voucher-apply-step]')

  if (!cardInput || !pinInput || !checkButton || !balanceInfo || !applyStep) return

  // Resolve the apply form from the button — the section may also contain
  // remove-voucher forms for applied rows, so the first <form> in the
  // container is not necessarily the apply form.
  const form = checkButton.closest('form')
  if (!form) return

  const providerId = form.querySelector('input[name="provider_id"]')?.value
  const outstanding = parseFloat(container.dataset.viiVoucherOutstanding)

  function showError(message) {
    balanceInfo.classList.remove('sc-hide', 'SC-Notice')
    balanceInfo.classList.add('SC-Alert')
    balanceInfo.textContent = message
  }

  function hideCheckBalanceStep() {
    applyStep.classList.add('sc-hide')
    balanceInfo.classList.add('sc-hide')
    balanceInfo.textContent = ''
  }

  function showApplyStep(balance) {
    const defaultAmount = isNaN(outstanding) ? balance : Math.min(balance, outstanding)

    // Default to as much of the card as the order can take; the customer can
    // change it. The field starts blank when nothing is payable, and there is
    // no max attribute — the server validates the amount, and re-applying the
    // same card overwrites its entry (crediting the previous amount back), so
    // a hard client-side cap would wrongly block legitimate re-applies.
    if (amountInput) {
      amountInput.value = defaultAmount > 0 ? defaultAmount.toFixed(2) : ''
    }

    balanceInfo.classList.remove('sc-hide', 'SC-Alert')
    balanceInfo.classList.add('SC-Notice')
    balanceInfo.textContent = (
      container.dataset.i18nBalance || 'Available balance: %{balance}'
    ).replace('%{balance}', balance.toFixed(2))
    applyStep.classList.remove('sc-hide')
  }

  ;[cardInput, pinInput].forEach((input) => {
    input.addEventListener('input', hideCheckBalanceStep)
  })

  checkButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const cardNumber = cardInput.value.trim()
    const pin = pinInput.value.trim()
    if (!cardNumber || !pin) {
      showError(container.dataset.i18nMissingFields || 'Enter your gift card number and PIN.')
      return
    }

    hideCheckBalanceStep()
    checkButton.disabled = true

    try {
      const body = await postJSON(storePathUrl('/balance_checks'), {
        provider_id: providerId,
        card_number: cardNumber,
        pin: pin,
      })
      const balance = body ? Number(body.balance) : NaN

      if (body && body.success && !isNaN(balance)) {
        if (balance > 0) {
          showApplyStep(balance)
        } else {
          showError(container.dataset.i18nNoBalance || 'This card has no remaining balance.')
        }
      } else {
        showError((body && body.message) || container.dataset.i18nInvalidCard || 'Invalid card.')
      }
    } catch (error) {
      showError(error.message)
    } finally {
      checkButton.disabled = false
    }
  })
}
