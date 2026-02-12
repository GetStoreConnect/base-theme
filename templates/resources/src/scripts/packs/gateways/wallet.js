import { postJSON, putJSON } from '../../theme/utils/fetch'
import storePathUrl from '../../theme/store-path-url'

export class Wallet {
  constructor(paymentForm) {
    this.paymentForm = paymentForm
  }

  walletsContainer() {
    return this.paymentForm.refElement('wallets-container', { legacyId: this.walletsContainerId() })
  }

  /**
   * Returns the ID of the wallet buttons element, generating one if needed.
   * This is required for some payment SDKs (e.g., Stripe Elements) that need
   * an ID selector to mount to.
   */
  walletsElementId() {
    const element = this.walletsElement()
    if (!element) return null

    // If element already has an ID (from legacy Liquid or previous generation), return it
    if (element.id) {
      return element.id
    }

    // Generate a unique ID for this element (for data-ref approach)
    const uniqueId = `${this.paymentForm.providerName}-wallet-${this.paymentForm.providerId}-${Date.now()}`
    element.id = uniqueId
    return uniqueId
  }

  /**
   * Helper to query for data-ref within the wallets container.
   * @private
   */
  // TODO: use PaymentForm refElement but relative to walletsContainer()
  // Perhaps refElement goes into global helper
  _refElement(refName) {
    return this.walletsContainer()?.querySelector(`[data-ref="${refName}"]`)
  }

  walletsElementExists() {
    const container = this.walletsContainer()
    if (!container) {
      return false
    }
    const element = this._refElement('wallet-buttons')
    if (!element) {
      return false
    }
    return true
  }

  walletsElement() {
    // Always query using data-ref (works for both new and legacy approaches)
    const walletsElement = this._refElement('wallet-buttons')
    if (!walletsElement) {
      this.paymentForm.reportError(
        `Cannot setup wallets: no wallet buttons element found [data-ref="wallet-buttons"] in container #${this.walletsContainerId()}`,
        { containerId: this.walletsContainerId() }
      )
    }
    return walletsElement
  }

  walletsErrorElement() {
    // Always query using data-ref (works for both new and legacy approaches)
    let walletsErrorElement = this._refElement('wallet-error')
    if (!walletsErrorElement) {
      this.paymentForm.reportError(
        `Cannot setup wallets: no wallet error element found [data-ref="wallet-error"] in container #${this.walletsContainerId()}`,
        { containerId: this.walletsContainerId() }
      )
      walletsErrorElement = this.paymentForm.errorElement()
    }
    return walletsErrorElement
  }

  showWalletsError(error, options = {}) {
    options.errorContainer = this.walletsErrorElement()
    this.paymentForm.showError(error, options)
  }

  async prepareProductCartWithAddToCartData() {
    if (!this.paymentForm.dedicatedCartProductId) {
      return {
        amount: Math.round(this.paymentForm.totalPayable() * 100),
        didError: false,
      }
    }

    try {
      const response = await postJSON(storePathUrl(`/express_checkout/carts`), {
        add_to_cart_form_data: this.addToCartFormData(),
        dedicated_cart_product_id: this.paymentForm.dedicatedCartProductId,
      })

      return {
        amount: Math.round(response.cart.amount * 100),
        didError: false,
      }
    } catch (error) {
      this.showWalletsError(error.message || this.paymentForm.i18n('errors.error_occurred'))
      return { amount: null, didError: true }
    }
  }

  // PUT /express_checkout/shipping_methods
  // {"shipping":{"methods":["pick_up","regular_post","express_post","courier"],"rates":[{"id":"Custom Shipping_custom-shppng-1","label":"Standard shipping","amount":10.0},{"id":"Australia Post_PARCEL POST + SIGNATURE","label":"PARCEL POST + SIGNATURE","amount":"17.14"},{"id":"Australia Post_EXPRESS POST + SIGNATURE","label":"EXPRESS POST + SIGNATURE","amount":"17.4"}]}}
  async fetchShippingRates(address) {
    let params = {
      address,
    }
    if (this.paymentForm.dedicatedCartProductId) {
      params.dedicated_cart_product_id = this.paymentForm.dedicatedCartProductId
      params.add_to_cart_form_data = this.addToCartFormData()
    }

    try {
      const response = await putJSON(storePathUrl(`/express_checkout/shipping_methods`), params)

      let defaultShippingRate = response.shipping.rates.find((rate) => rate.default)

      // Sort the rates by amount, but ensure defaultShippingRate is included in the final list
      // Max 9 cheapest shipping rates for Stripe
      const shippingRates = response.shipping.rates
        .sort((a, b) => {
          if (a.default) return -1
          if (b.default) return 1
          return a.amount - b.amount
        })
        .slice(0, 9)

      // Default to the cheapest rate if no .default specified above
      if (!defaultShippingRate) {
        defaultShippingRate = shippingRates[0]
      }

      // Map to ApplePay format id, amount, displayName
      return {
        amount: Math.round(response.cart.amount * 100),
        defaultShippingRateId: defaultShippingRate.id,
        shippingRates: shippingRates.map((rate) => {
          return {
            id: rate.id,
            amount: Math.round(rate.amount * 100),
            displayName: rate.label,
            deliveryEstimate: rate.description,
          }
        }),
      }
    } catch (error) {
      return {
        error: { message: error.message || this.paymentForm.i18n('errors.error_occurred') },
      }
    }
  }

  async setShippingRate(shippingRate) {
    try {
      const response = await putJSON(storePathUrl(`/express_checkout/carts`), {
        dedicated_cart_product_id: this.paymentForm.dedicatedCartProductId,
        shipping_rate: shippingRate,
      })

      return {
        amount: Math.round(response.cart.amount * 100),
      }
    } catch (error) {
      return {
        error: { message: error.message || this.paymentForm.i18n('errors.error_occurred') },
      }
    }
  }

  loadingShippingRates() {
    return [
      {
        id: 'loading',
        displayName: this.paymentForm.i18n('wallets.loading'),
        amount: 0,
      },
    ]
  }

  // We need the Qty field, and the optional variable Price field data
  // Returns {quantity: "1", price: "100.0", _ufid, authenticity_token}
  addToCartFormData() {
    const form = document.querySelector(`form[data-cart-form="true"]`)

    const formData = new FormData(form)

    // Create an object to hold the form values
    const formValues = {}

    // Iterate through the FormData entries
    formData.forEach((value, key) => {
      formValues[key] = value
    })

    return formValues
  }

  removeWalletsContainer() {
    const walletsContainer = this.walletsContainer()
    if (walletsContainer) {
      walletsContainer.remove()
    }
  }

  // ============================================================================
  // LEGACY METHODS - For backward compatibility with old Liquid templates
  // ============================================================================

  /**
   * Returns the ID used for legacy Liquid templates that explicitly set IDs.
   * LEGACY: This is only used as a fallback for payment providers that haven't
   * been migrated to use data-ref attributes. Returns IDs like "StripeWalletsContainerpp-1".
   * @private
   */
  walletsContainerId() {
    return `${this.paymentForm.providerName}WalletsContainer${this.paymentForm.elementProviderId()}`
  }
}

// Export standalone functions for backwards compatibility
export function fetchShippingRates(address) {
  throw new Error('fetchShippingRates should now be called as a method on a Wallet instance')
}

export function setShippingRate(shippingRate) {
  throw new Error('setShippingRate should now be called as a method on a Wallet instance')
}

export function walletsElement() {
  throw new Error('walletsElement should now be called as a method on a Wallet instance')
}

export function showWalletsError(error, options = {}) {
  throw new Error('showWalletsError should now be called as a method on a Wallet instance')
}

export function walletsElementExists() {
  throw new Error('walletsElementExists should now be called as a method on a Wallet instance')
}

export function removeWalletsContainer() {
  throw new Error('removeWalletsContainer should now be called as a method on a Wallet instance')
}

export function loadingShippingRates() {
  throw new Error('loadingShippingRates should now be called as a method on a Wallet instance')
}

export function prepareProductCartWithAddToCartData() {
  throw new Error(
    'prepareProductCartWithAddToCartData should now be called as a method on a Wallet instance'
  )
}

export function walletsElementId() {
  throw new Error('walletsElementId should now be called as a method on a Wallet instance')
}
