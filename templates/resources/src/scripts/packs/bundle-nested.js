/**
 * Bundle Nested - Handles nested bundle configuration within parent bundles
 * Communicates with bundle-v2.js via custom events
 */

import { onDomChange } from '../theme/utils/init'
import storePathUrl from '../theme/store-path-url'
import fetchWithResponseHandler from '../theme/utils/fetch'

onDomChange(init)

function init(node) {
  const BundleNested = {
    parentNode: null,
    activeModal: null,
    activeComponentId: null,

    init() {
      this.parentNode = node
      this.setupEventListeners()
    },

    setupEventListeners() {
      const configureButtons = node.querySelectorAll('[data-configure-nested-parent-bundle-id]')
      if (configureButtons.length === 0) return

      configureButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          const componentId = button.getAttribute('data-configure-nested-parent-bundle-id')
          const bundleProductId = button.getAttribute('data-bundle-product')
          const bundleName = button.getAttribute('data-bundle-name')
          this.openNestedBundleModal(componentId, bundleProductId, bundleName)
        })
      })

      // Modal event listeners
      this.setupModalListeners()
    },

    setupModalListeners() {
      const modal = node.querySelector('[data-nested-modal]')
      if (!modal) return

      const cancelButton = modal.querySelector('[data-cancel-nested-bundle]')
      cancelButton.addEventListener('click', () => {
        this.closeNestedBundleModal()
      })

      const saveButton = modal.querySelector('[data-save-nested-bundle]')
      saveButton.addEventListener('click', () => {
        this.saveNestedBundleConfiguration()
      })
    },

    openNestedBundleModal(componentId, bundleProductId, bundleName) {
      const modal = node.querySelector('[data-nested-modal]')
      if (!modal) return

      this.activeModal = modal
      this.activeComponentId = componentId

      const modalBundleName = modal.querySelector('[data-modal-bundle-name]')
      modalBundleName.textContent = bundleName

      this.showModalLoading(modal)

      modal.classList.remove('sc-hide')
      modal.classList.add('is-active')
      modal.classList.add('sc-display-block')
      document.body.style.overflow = 'hidden' // Prevent background scrolling

      this.loadNestedBundleConfigurator(modal, bundleProductId, componentId)
    },

    closeNestedBundleModal() {
      const modal = this.activeModal
      if (!modal) return

      modal.classList.add('sc-hide')
      document.body.style.overflow = '' // Restore scrolling

      this.activeModal = null
      this.activeComponentId = null

      const configurator = modal.querySelector('[data-nested-bundle-configurator]')
      if (configurator) {
        configurator.innerHTML = ''
        configurator.classList.add('sc-hide')
      }
    },

    loadNestedBundleConfigurator(modal, bundleProductId, componentId) {
      const configurator = modal.querySelector('[data-nested-bundle-configurator]')
      const loading = modal.querySelector('[data-modal-loading]')
      const error = modal.querySelector('[data-modal-error]')

      const bundleSection = node.querySelector('[data-bundle-product]')
      const parentBundleId = bundleSection?.getAttribute('data-bundle-identifier') || 'unknown'

      const url = storePathUrl(`/bundles/${bundleProductId}/nested_configurator`)
      const params = new URLSearchParams({
        parent_bundle_id: parentBundleId,
        component_id: componentId,
      })

      fetchWithResponseHandler(`${url}?${params}`, {
        method: 'GET',
        headers: {
          Accept: 'text/html',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then((html) => {
          if (loading) loading.classList.add('sc-hide')
          if (error) error.classList.add('sc-hide')

          if (configurator) {
            configurator.innerHTML = html
            configurator.classList.remove('sc-hide')

            this.initializeNestedConfigurator(configurator)
          }

          const saveButton = modal.querySelector('[data-save-nested-bundle]')
          if (saveButton) {
            saveButton.disabled = false
          }
        })
        .catch((err) => {
          if (loading) loading.classList.add('sc-hide')
          if (configurator) configurator.classList.add('sc-hide')

          if (error) {
            error.classList.remove('sc-hide')
          }
        })
    },

    initializeNestedConfigurator(configuratorElement) {
      const componentCards = configuratorElement.querySelectorAll('[data-component-id]')
      componentCards.forEach((card) => {
        const quantityInputs = card.querySelectorAll('[data-qty-picker-input]')

        quantityInputs.forEach((input) => {
          input.addEventListener('change', () => {
            this.updateNestedBundleTotal()
          })
        })
      })

      const variantRadios = configuratorElement.querySelectorAll('[data-component-variant]')
      variantRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
          this.updateNestedBundleTotal()
        })
      })

      // Update initial total
      this.updateNestedBundleTotal()
    },

    updateNestedBundleTotal() {
      // Calculate and update the nested bundle total in the modal footer
      const modal = this.activeModal
      if (!modal) return

      const totalElement = modal.querySelector('[data-modal-bundle-total]')
      if (!totalElement) return

      // Calculate total from configurator
      let total = 0
      const configurator = modal.querySelector('[data-nested-bundle-configurator]')

      if (configurator) {
        const quantityInputs = configurator.querySelectorAll('[data-qty-picker-input]')
        quantityInputs.forEach((input) => {
          const quantity = parseInt(input.value) || 0
          const unitPrice =
            parseFloat(input.closest('[data-component-id]')?.getAttribute('data-unit-price')) || 0
          total += quantity * unitPrice
        })
      }

      const currencySymbol = node
        .querySelector('[data-store-currency]')
        .getAttribute('data-store-currency')
      totalElement.textContent = `${currencySymbol}${total.toFixed(2)}`
    },

    saveNestedBundleConfiguration() {
      if (!this.activeComponentId || !this.activeModal) return

      const componentId = this.activeComponentId
      const modal = this.activeModal
      const configurator = modal.querySelector('[data-nested-bundle-configurator]')

      if (!configurator) return

      // Get the BundleV2 instance for this nested configurator
      // The instance is stored on the nested-bundle-configurator-content div
      const nestedContent = configurator.querySelector('[data-nested-bundle-id]')
      const bundleV2Instance = nestedContent?.bundleV2Instance

      if (!bundleV2Instance) return

      // Use BundleV2's validation
      const isValid = bundleV2Instance.validateComponentGroups()

      if (!isValid) {
        // Validation errors are already displayed by validateComponentGroups()
        // Scroll to errors in the nested modal
        const errorContainer = nestedContent.querySelector('[data-bundle-validation-errors]')
        if (errorContainer) {
          errorContainer.classList.remove('sc-hide')
          errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        return
      }

      try {
        const configuration = bundleV2Instance.serializeBundleConfiguration()

        const total =
          bundleV2Instance.basePrice +
          Array.from(bundleV2Instance.selectedVariants.values()).reduce(
            (sum, v) => sum + v.price,
            0
          ) +
          Array.from(bundleV2Instance.selectedComponents.values()).reduce(
            (sum, c) => sum + c.price,
            0
          )

        const summary = this.generateConfigurationSummary(bundleV2Instance)

        // Notify parent bundle via custom event
        this.dispatchNestedBundleConfigured(componentId, {
          isConfigured: true,
          total: total,
          summary: summary,
          configuration: configuration,
        })

        this.closeNestedBundleModal()
      } catch (error) {
        console.error('Failed to save configuration: ' + error.message)
      }
    },

    generateConfigurationSummary(bundleV2Instance) {
      const summaryItems = []

      try {
        const configuration = bundleV2Instance.serializeBundleConfiguration()

        if (configuration.selected_components && configuration.selected_components.length > 0) {
          configuration.selected_components.forEach((component) => {
            const componentId = component.product_component_id
            const productName = component.product_name

            if (productName) {
              const quantity = component.quantity || 1
              summaryItems.push({
                name: productName,
                quantity: quantity,
              })
            }
          })
        }

        return summaryItems
      } catch (error) {
        console.error('Failed to generate configuration summary: ' + error.message)
        return []
      }
    },

    dispatchNestedBundleConfigured(componentId, config) {
      // Dispatch custom event to notify parent bundle
      const event = new CustomEvent('nested-bundle-configured', {
        detail: {
          componentId: componentId,
          config: config,
        },
      })

      this.parentNode.dispatchEvent(event)
    },

    showModalLoading(modal) {
      const loading = modal.querySelector('[data-modal-loading]')
      const configurator = modal.querySelector('[data-nested-bundle-configurator]')
      const error = modal.querySelector('[data-modal-error]')

      if (loading) loading.classList.remove('sc-hide')
      if (configurator) configurator.classList.add('sc-hide')
      if (error) error.classList.add('sc-hide')
    },
  }

  BundleNested.init()
}
