import { onDomChange } from '../theme/utils/init'
import Cookie from 'js-cookie'
window.StoreConnect = window.StoreConnect || {}

// Update checkout summary panel
onDomChange((node) => {
  if (
    !node.querySelector('#select-and-payment') &&
    !node.querySelector('[data-checkout-summary]')
  ) {
    return
  }

  resetPaymentCookieIfNecessary()

  const tabTriggers = node.querySelectorAll('[data-tab-trigger]')

  ;[...tabTriggers].map((tab) => {
    tab.addEventListener('click', (event) => {
      const providerId = event.target.getAttribute('data-tab-trigger')

      if (providerId) {
        showPaymentForm(providerId)
      }
    })
  })

  let currentProviderId = Cookie.get('last-used-payment-provider')

  if (currentProviderId && providerIdTabExists(currentProviderId)) {
    showPaymentForm(currentProviderId)
  } else {
    currentProviderId = null

    // Check if current subscription has a payment provider preference
    const paymentProviders = document.querySelector("section[data-tabs='payment']")
    if (paymentProviders) {
      const defaultProviderId = paymentProviders.getAttribute('data-default-payment-provider')

      if (defaultProviderId && providerIdTabExists(defaultProviderId)) {
        currentProviderId = defaultProviderId
        showPaymentForm(currentProviderId)
      } else if (paymentProviders.querySelector('[data-tab]')) {
        // If there is no default provider, we'll show the first one if it is available
        currentProviderId = paymentProviders.querySelector('[data-tab]').getAttribute('data-tab')
        if (currentProviderId) {
          showPaymentForm(currentProviderId)
        }
      }
    }
  }

  // If no payment provider is selected,
  // e.g. vouchers/credit covers the entire order
  // we still need to setTotalPayable + setTotalTax
  if (!currentProviderId) {
    activateSurcharge()
  }
})

// Once a payment is processed, reset the payment provider cookie;
// Or if the user starts the checkout process again.
// The data-reset-cookie-checkout attribute should appear on these pages.
function resetPaymentCookieIfNecessary() {
  if (document.querySelector('[data-reset-cookie-checkout]')) {
    Cookie.remove('last-used-payment-provider')
  }
}

function providerIdTabExists(providerId) {
  return document.querySelector(`[data-tab='${providerId}']`)
}

function showPaymentForm(providerId) {
  document.querySelectorAll('[data-tab]').forEach((tab) => tab.classList.add('sc-hide'))
  document
    .querySelectorAll('[data-tab-trigger]')
    .forEach((tab) => tab.classList.remove('is-active'))

  const tab = document.querySelector(`[data-tab='${providerId}']`)
  const trigger = document.querySelector(`[data-tab-trigger='${providerId}']`)

  // Store the selected payment provider for 1 day
  Cookie.set('last-used-payment-provider', providerId, { sameSite: 'Lax', expires: 1 })

  if (tab) {
    tab.classList.remove('sc-hide')
  }
  if (trigger) {
    trigger.classList.add('is-active')
  }
  activateSurcharge(providerId)
}

// providerId may be null if there is no payment provider selected
// e.g. vouchers/credit covers the entire order
function activateSurcharge(providerId) {
  // Prefer the checkout summary block as the source of truth for totals.
  const summary = document.querySelector('[data-checkout-summary]')
  const totalPayableElem =
    summary?.querySelector('[data-order-cart-total-payable]') ||
    document.querySelector('[data-order-cart-total-payable]')
  const totalTaxElem =
    summary?.querySelector('[data-order-tax-amount]') ||
    document.querySelector('[data-order-tax-amount]')

  document.querySelectorAll(`[data-surcharge-id]`).forEach((elem) => elem.classList.add('sc-hide'))

  let elem = null
  if (providerId) {
    const selector = `[data-surcharge-id="${providerId}"]`
    document.querySelectorAll(selector).forEach((elem) => elem.classList.remove('sc-hide'))

    elem = document.querySelector(selector)
  }

  if (elem) {
    setTotalPayable(elem.getAttribute('data-surcharge-cart-total-payable'))
    setTotalTax(elem.getAttribute('data-surcharge-cart-total-tax'))
  } else {
    if (totalPayableElem) {
      setTotalPayable(totalPayableElem.getAttribute('data-order-cart-total-payable'))
    }

    if (totalTaxElem) {
      setTotalTax(totalTaxElem.getAttribute('data-order-tax-amount'))
    }
  }
}

function setTotalPayable(amount) {
  document.querySelectorAll('[data-order-cart-total-payable]').forEach((elem) => {
    elem.innerHTML = amount
  })
}

function setTotalTax(amount) {
  document.querySelectorAll('[data-order-tax-amount]').forEach((elem) => {
    elem.innerHTML = amount
  })
}

function disablePaymentTabs() {
  document.querySelectorAll('[data-tab-trigger]').forEach((tab) => {
    tab.disabled = true
  })
}

function enablePaymentTabs() {
  document.querySelectorAll('[data-tab-trigger]').forEach((tab) => {
    tab.disabled = false
  })
}

document.addEventListener('store-connect.payment-processing-start', disablePaymentTabs)
document.addEventListener('store-connect.payment-processing-end', enablePaymentTabs)

// Saved payment methods at checkout: toggle between the saved-card quick-pay
// form and the full provider forms, and submit saved-card payments as JSON.
// Markup and config (payment URL, labels) come from
// checkout/payment_information/saved_payment_methods.liquid data attributes.
onDomChange((node) => {
  const savedCardSection = node.querySelector('[data-saved-card-section]')
  const toggleLink = node.querySelector('[data-toggle-other-methods]')
  const otherMethods = node.querySelector('[data-other-methods]')
  if (!savedCardSection || !toggleLink || !otherMethods) return

  const savedCardForm = savedCardSection.querySelector('[data-saved-card-form]')

  toggleLink.addEventListener('click', (event) => {
    event.preventDefault()
    otherMethods.classList.remove('sc-hide')
    savedCardForm.classList.add('sc-hide')
    toggleLink.classList.add('sc-hide')
  })

  // "Use this card" buttons for non-default saved cards
  node.querySelectorAll('[data-use-saved-card]').forEach((btn) => {
    btn.addEventListener('click', () => {
      savedCardForm.querySelector('[name="payment[payment_method_id]"]').value =
        btn.dataset.paymentMethodId
      savedCardForm.querySelector('[name="payment[method]"]').value = btn.dataset.providerCode
      savedCardForm.querySelector('[name="payment[provider_id]"]').value = btn.dataset.providerId

      // Update the description text to reflect the selected card
      const prefix = savedCardSection.querySelector('[data-saved-card-prefix]')
      const brand = savedCardSection.querySelector('[data-saved-card-brand]')
      const lastFour = savedCardSection.querySelector('[data-saved-card-last-four]')
      if (prefix) prefix.textContent = savedCardSection.dataset.useSavedLabel
      if (brand) brand.textContent = btn.dataset.cardBrand
      if (lastFour) lastFour.textContent = btn.dataset.lastFour

      savedCardForm.classList.remove('sc-hide')
      otherMethods.classList.add('sc-hide')
      toggleLink.classList.remove('sc-hide')
    })
  })

  // Submit the saved-card payment as JSON
  const savedCardSubmit = savedCardSection.querySelector('[data-saved-card-submit]')
  if (!savedCardSubmit) return

  savedCardSubmit.addEventListener('click', () => {
    const errorEl = savedCardForm.querySelector('[data-ref="saved-card-error"]')

    savedCardSubmit.disabled = true
    const originalText = savedCardSubmit.textContent
    savedCardSubmit.textContent = savedCardSubmit.dataset.disableWith || 'Processing...'
    errorEl.classList.add('sc-hide')

    const showError = (message) => {
      errorEl.textContent = message
      errorEl.classList.remove('sc-hide')
      savedCardSubmit.disabled = false
      savedCardSubmit.textContent = originalText
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (csrfToken) headers['X-CSRF-Token'] = csrfToken.content

    fetch(savedCardSection.dataset.paymentUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        payment: {
          payment_method_id: savedCardForm.querySelector('[name="payment[payment_method_id]"]')
            .value,
          method: savedCardForm.querySelector('[name="payment[method]"]').value,
          provider_id: savedCardForm.querySelector('[name="payment[provider_id]"]').value,
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.redirect_url) {
          window.location = data.redirect_url
        } else if (data.error_message) {
          showError(data.error_message)
        }
      })
      .catch(() => showError(savedCardSection.dataset.generalErrorMessage))
  })
})
