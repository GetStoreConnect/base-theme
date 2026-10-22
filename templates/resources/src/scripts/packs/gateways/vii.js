import { PaymentForm } from './payment-form'
import storePathUrl from '../../theme/store-path-url'
import { onDomChange } from '../../theme/utils/init'
import { postJSON } from '../../theme/utils/fetch'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="Vii"]')
  forms.forEach((form) => {
    if (form.dataset.providerId) {
      initVii({ form })
    }
  })
})

function initVii({ form }) {
  const container = form.closest('[data-provider-container]') || form
  const cardInput = container.querySelector('[data-vii-field="card-number"]')
  const pinInput = container.querySelector('[data-vii-field="pin"]')
  const balanceInput = container.querySelector('[data-vii-field="available-balance"]')
  const checkButton = container.querySelector('[data-vii-check-balance]')
  const checkButtonContainer = container.querySelector('[data-vii-check-balance-container]')
  const balanceInfo = container.querySelector('[data-vii-balance-info]')

  if (!cardInput || !pinInput || !checkButton || !balanceInfo) return

  const paymentForm = new PaymentForm(form, {
    onSubmit: () => {
      paymentForm.submitData({
        payload: {
          payment_source: {
            card_number: cardInput.value.trim(),
            pin: pinInput.value.trim(),
          },
        },
      })
    },
  })
  const submitButton = paymentForm.submitElement()

  function showCheckBalanceStep() {
    checkButtonContainer?.classList.remove('sc-hide')
    submitButton?.classList.add('sc-hide')
    paymentForm.setPayButton(false)
  }

  function showPayStep() {
    checkButtonContainer?.classList.add('sc-hide')
    submitButton?.classList.remove('sc-hide')
    paymentForm.setPayButton(true)
  }

  function clearBalance() {
    if (balanceInput) balanceInput.value = ''
    balanceInfo.classList.add('sc-hide')
    balanceInfo.textContent = ''
  }

  showCheckBalanceStep()
  ;[cardInput, pinInput].forEach((input) => {
    input.addEventListener('input', () => {
      clearBalance()
      paymentForm.hideError()
      showCheckBalanceStep()
    })
  })

  checkButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const cardNumber = cardInput.value.trim()
    const pin = pinInput.value.trim()
    if (!cardNumber || !pin) {
      paymentForm.showError(
        paymentForm.i18n('vii.missing_fields') || 'Enter your card number and PIN.'
      )
      return
    }

    paymentForm.hideError()
    clearBalance()
    checkButton.disabled = true

    try {
      const body = await postJSON(storePathUrl('/balance_checks'), {
        provider_id: paymentForm.getProviderId(),
        card_number: cardNumber,
        pin: pin,
      })
      onBalanceResult(body)
    } catch (error) {
      paymentForm.showError(error.message)
    } finally {
      checkButton.disabled = false
    }
  })

  function onBalanceResult(result) {
    const balance = result ? Number(result.balance) : NaN

    if (!result || !result.success || isNaN(balance)) {
      const message =
        (result && result.message) || paymentForm.i18n('vii.invalid_card') || 'Invalid card.'
      paymentForm.showError(message)
      showCheckBalanceStep()
      return
    }

    if (balanceInput) balanceInput.value = formatMoney(balance)
    const total = parseFloat(paymentForm.totalPayable())
    if (!isNaN(total) && Math.round(balance * 100) >= Math.round(total * 100)) {
      showPayStep()
      return
    }

    balanceInfo.classList.remove('sc-hide', 'SC-Alert--info')
    balanceInfo.classList.add('SC-Alert--error')
    balanceInfo.textContent = formatInsufficientMessage(paymentForm, balance, total)
    showCheckBalanceStep()
  }
}

function formatInsufficientMessage(paymentForm, balance, total) {
  const template =
    paymentForm.i18n('vii.insufficient_balance') ||
    'Card balance %{balance} is less than the order total %{total}.'
  return template
    .replace('%{balance}', formatMoney(balance))
    .replace('%{total}', formatMoney(total))
}

function formatMoney(value) {
  if (typeof value !== 'number' || isNaN(value)) return String(value)
  return value.toFixed(2)
}
