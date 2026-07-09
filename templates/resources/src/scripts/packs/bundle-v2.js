import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  const BundleV2 = {
    container: null,
    basePrice: 0,
    bundleQuantity: 1,
    selectedVariants: new Map(),
    selectedComponents: new Map(),
    componentGroups: new Map(),
    errors: [],
    // Nested Bundle state
    nestedBundleConfigurations: new Map(), // componentId -> nested bundle config

    init() {
      this.container = node.querySelector('[data-bundle-pricing]')
      if (!this.container) return

      const bundleSection = node.querySelector('[data-bundle-product]')
      this.bundleIdentifier = bundleSection?.getAttribute('data-bundle-identifier')
      this.isEditMode = !!this.bundleIdentifier

      this.basePrice =
        parseFloat(
          this.container.querySelector('[data-bundle-total]')?.getAttribute('data-bundle-total')
        ) || 0

      // Determine bundle price strategy
      this.bundlePriceStrategy = bundleSection?.getAttribute('data-bundle-price-strategy')
      this.isFlatPricedBundle = this.bundlePriceStrategy === 'flat_price'

      this.initializeComponentGroups()

      if (this.isEditMode) {
        this.prePopulateFromEditConfiguration()
      } else {
        this.initializeRequiredComponents()
      }

      this.setupAllListeners()
      this.updateTotalPrice()
    },

    setupAllListeners() {
      this.setupVariantListeners()
      this.setupModalListeners()
      this.setupQuantityListeners()
      this.setupBookingListeners()
      this.setupNestedBundleEventListeners()
      this.setupFormSubmission()
    },

    setupVariantListeners() {
      const variants = node.querySelectorAll('[data-component-variant]')

      const handleVariantChange = (radio) => {
        const componentId = radio.getAttribute('data-component-variant')
        // For flat priced bundles, variants don't affect price
        const variantPrice = this.isFlatPricedBundle
          ? 0
          : parseFloat(radio.getAttribute('data-variant-price')) || 0
        this.selectedVariants.set(componentId, { variantId: radio.value, price: variantPrice })
        this.updateTotalPrice()
      }

      variants.forEach((radio) => {
        if (radio.checked) handleVariantChange(radio)
        radio.addEventListener('change', (e) => e.target.checked && handleVariantChange(e.target))
      })
    },

    setupModalListeners() {
      this.addEventListeners('[data-component-radio]', 'change', (e) => {
        if (e.target.checked) this.updateAddToBundleButton(e.target.closest('[data-modal]'))
      })

      this.addEventListeners('[data-add-option-to-bundle]', 'click', (e) => {
        this.addSelectedComponentToBundle(
          e.target.closest('[data-modal]'),
          e.target.getAttribute('data-modal-trigger')
        )
      })
    },

    setupQuantityListeners() {
      this.addEventListeners('[data-bundle-quantity-form]', 'submit', (e) => e.preventDefault())

      this.addEventListeners('[data-qty-picker-input]', 'change', (e) => {
        const componentId = e.target.getAttribute('data-quantity-picker-component-id')
        const fromComponentGroup = e.target.getAttribute('data-from-component-group') === 'true'
        if (componentId && !fromComponentGroup) {
          this.updateComponentQuantity(componentId, parseInt(e.target.value) || 0)
        }
      })
    },

    setupBookingListeners() {
      // Listen for booking selection changes from bundle-booking.js
      const form = node.querySelector('[data-bundle-form]')
      if (form) {
        form.addEventListener('bundle-booking-changed', (e) => {
          // Re-validate the form when booking selections change
          this.validateComponentGroups()
        })
      }
    },

    setupNestedBundleEventListeners() {
      // Listen for nested bundle configuration events from bundle-nested.js
      node.addEventListener('nested-bundle-configured', (e) => {
        const { componentId, config } = e.detail
        this.handleNestedBundleConfigured(componentId, config)
      })
    },

    // Helper method to reduce repetition in event listener setup
    addEventListeners(selector, event, handler) {
      node.querySelectorAll(selector).forEach((el) => el.addEventListener(event, handler))
    },

    initializeComponentGroups() {
      node.querySelectorAll('[data-component-group]').forEach((el) => {
        const groupId = el.getAttribute('data-component-group')
        this.componentGroups.set(groupId, {
          min: parseInt(el.getAttribute('data-min-components')) || 0,
          max: parseInt(el.getAttribute('data-max-components')) || 1,
          selectedCount: 0,
          isSingleChoice: el.getAttribute('data-is-single-choice') === 'true',
          required: el.getAttribute('data-group-required') === 'true',
          displayName: el.getAttribute('data-display-name'),
          totalQuantity: 0,
          minGroupQuantity: parseInt(el.getAttribute('data-min-group-quantity')) || 0,
          maxGroupQuantity: parseInt(el.getAttribute('data-max-group-quantity')) || null,
          selectedComponents: new Set(),
        })
      })
    },

    initializeRequiredComponents() {
      node.querySelectorAll('[data-component-id]').forEach((card) => {
        const componentId = card.getAttribute('data-component-id')
        const quantityInput = card.querySelector('[data-component-quantity]')
        const hasVariants = parseInt(card.getAttribute('data-variants-size')) > 0
        const defaultQuantity = parseInt(card.getAttribute('data-default-quantity')) || 0
        const freeQuantity = parseInt(card.getAttribute('data-free-quantity')) || 0
        const isPurchaseable = card.getAttribute('data-purchaseable') === 'true'
        let unitPrice = parseFloat(card.getAttribute('data-unit-price')) || 0

        // Skip unavailable components - don't add them to selection
        if (!isPurchaseable) return

        let currentQuantity = quantityInput
          ? parseInt(quantityInput.value) || defaultQuantity
          : defaultQuantity

        if (hasVariants) currentQuantity = 0
        // For flat priced bundles, component prices don't affect total
        if (this.isFlatPricedBundle) unitPrice = 0

        if (!this.selectedComponents.has(componentId)) {
          const chargeableQuantity = Math.max(0, currentQuantity - freeQuantity)
          this.selectedComponents.set(componentId, {
            product_id: card.getAttribute('data-product'),
            price: chargeableQuantity * unitPrice,
            quantity: currentQuantity,
            unitPrice,
            freeQuantity,
            includedAndNonRemovable: card.getAttribute('data-component-included') === 'true',
            required: card.getAttribute('data-component-required') === 'true',
            productName: card.getAttribute('data-product-name'),
            hasVariants,
            groupId: null,
            isPurchaseable,
          })
        }
      })
    },

    updateComponentQuantity(componentId, newQuantity) {
      const card = node.querySelector(`[data-component-id="${componentId}"]`)

      if (card?.hasAttribute('data-nested-bundle')) {
        this.updateNestedBundleQuantity(componentId, newQuantity)
        return
      }

      let component = this.selectedComponents.get(componentId)

      const freeQuantity = parseInt(card?.getAttribute('data-free-quantity')) || 0
      const unitPrice = parseFloat(card?.getAttribute('data-unit-price')) || 0

      // For flat priced bundles, component prices don't affect total
      const calculatedPrice = this.isFlatPricedBundle
        ? 0
        : Math.max(0, newQuantity - freeQuantity) * unitPrice

      if (component) {
        component.quantity = newQuantity
        component.price = calculatedPrice
        this.updateTotalPrice()
      } else if (card) {
        const modal = card.closest('[data-modal]')
        let groupId = modal?.getAttribute('data-modal')

        this.selectedComponents.set(componentId, {
          product_id: card.getAttribute('data-product'),
          price: calculatedPrice,
          quantity: newQuantity,
          unitPrice,
          freeQuantity,
          includedAndNonRemovable: card.getAttribute('data-component-included') === 'true',
          required: card.getAttribute('data-component-required') === 'true',
          productName: card.getAttribute('data-product-name'),
          hasVariants: parseInt(card.getAttribute('data-variants-size')) > 0,
          groupId: groupId,
          isPurchaseable: card.getAttribute('data-purchaseable') === 'true',
        })

        component = this.selectedComponents.get(componentId)
        this.updateTotalPrice()
      }

      if (newQuantity <= 0) {
        this.selectedComponents.delete(componentId)

        if (component.groupId) {
          const groupData = this.componentGroups.get(component.groupId)
          if (groupData) {
            groupData.selectedComponents.delete(componentId)
            groupData.selectedCount = Math.max(0, groupData.selectedCount - 1)
            this.updateGroupTotalQuantity(component.groupId)
            this.updateGroupDisplay(component.groupId)
          }
        }
      } else {
        if (component.groupId) {
          this.updateGroupTotalQuantity(component.groupId)
          this.updateGroupDisplay(component.groupId)
        }
      }

      this.validateComponentGroups()
    },

    readNestedBundleQuantity(componentId) {
      const input = node.querySelector(`[data-quantity-picker-component-id="${componentId}"]`)
      const card = node.querySelector(`[data-component-id="${componentId}"]`)
      const defaultQuantity = parseInt(card?.getAttribute('data-default-quantity')) || 1
      const quantity = input ? parseInt(input.value) || defaultQuantity : defaultQuantity
      return Math.max(1, quantity)
    },

    updateNestedBundleQuantity(componentId, newQuantity) {
      const quantity = Math.max(1, newQuantity)
      const component = this.selectedComponents.get(componentId)

      if (component?.isNestedBundle) {
        component.quantity = quantity
        component.price = component.unitPrice * quantity
        this.updateTotalPrice()
      }

      this.validateComponentGroups()
    },

    updateAddToBundleButton(modal) {
      const addButton = modal.querySelector('[data-add-option-to-bundle]')
      if (!addButton) return

      const selectedRadio = modal.querySelector('[data-component-radio]:checked')
      if (!selectedRadio) {
        addButton.disabled = true
        return
      }

      // Check if selected component is purchaseable
      const componentId = selectedRadio.value
      const componentOption = modal.querySelector(`[data-component-option="${componentId}"]`)
      const isPurchaseable = componentOption?.getAttribute('data-purchaseable') === 'true'

      addButton.disabled = !isPurchaseable
    },

    addSelectedComponentToBundle(modal, groupId) {
      const selectedRadio = modal.querySelector('[data-component-radio]:checked')
      if (!selectedRadio) return

      const componentId = selectedRadio.value
      const componentOption = modal.querySelector(`[data-component-option="${componentId}"]`)
      const { freeQuantity, defaultQuantity, unitPrice } =
        this.extractComponentData(componentOption)

      const quantityInput = node.querySelector(
        `[data-quantity-picker-component-id="${componentId}"]`
      )
      const actualQuantity = quantityInput
        ? parseInt(quantityInput.value) || defaultQuantity
        : defaultQuantity

      // For flat priced bundles, component prices don't affect total
      const calculatedPrice = this.isFlatPricedBundle
        ? 0
        : Math.max(0, actualQuantity - freeQuantity) * unitPrice

      this.selectedComponents.set(componentId, {
        product_id: this.getProductIdForComponent(componentId, componentOption),
        price: calculatedPrice,
        quantity: actualQuantity,
        groupId,
        unitPrice,
        freeQuantity,
        productName: componentOption.getAttribute('data-product-name'),
        isPurchaseable: componentOption?.getAttribute('data-purchaseable') === 'true',
      })

      this.updateGroupData(groupId, componentId)
      this.updateGroupDisplay(groupId)
      this.updateTotalPrice()
      this.validateComponentGroups()
    },

    getProductIdForComponent(componentId, componentOption) {
      // First try to get from the option element in modal (Applies on ProductComponent from Component Group)
      if (componentOption) {
        const productId = componentOption.getAttribute('data-product')
        if (productId) return productId
      }

      // Fallback: look for the component card in the main page
      // (Applies on Ungrouped Product Component (Standalone))
      const componentCard = node.querySelector(`[data-component-id="${componentId}"]`)
      if (componentCard) {
        const productId = componentCard.getAttribute('data-product')
        if (productId) return productId
      }
    },

    extractComponentData(componentOption) {
      const componentPrice = componentOption.getAttribute('data-unit-price') || 0

      return {
        freeQuantity: parseInt(componentOption.getAttribute('data-free-quantity')) || 0,
        defaultQuantity: parseInt(componentOption.getAttribute('data-default-quantity')) || 1,
        unitPrice: parseFloat(componentOption.getAttribute('data-unit-price')) || componentPrice,
      }
    },

    updateGroupData(groupId, componentId) {
      const groupData = this.componentGroups.get(groupId)
      if (!groupData) return

      if (groupData.isSingleChoice) {
        groupData.selectedComponents.clear()
        groupData.selectedCount = 1
      } else {
        if (!groupData.selectedComponents.has(componentId)) {
          groupData.selectedCount += 1
        }
      }
      groupData.selectedComponents.add(componentId)
      // Update total quantity for the group
      this.updateGroupTotalQuantity(groupId)
    },

    removeComponentFromGroup(groupId) {
      const componentToRemove = Array.from(this.selectedComponents.entries()).find(
        ([id, data]) => data.groupId === groupId
      )
      if (componentToRemove) this.removeSpecificComponent(componentToRemove[0], groupId)
    },

    removeSpecificComponent(componentId, groupId) {
      this.selectedComponents.delete(componentId)

      const groupData = this.componentGroups.get(groupId)
      if (groupData) {
        groupData.selectedComponents.delete(componentId)
        groupData.selectedCount = Math.max(0, groupData.selectedCount - 1)
        // Update total quantity for the group
        this.updateGroupTotalQuantity(groupId)
      }

      this.updateGroupDisplay(groupId)
      this.updateTotalPrice()
      this.validateComponentGroups()
    },

    updateGroupDisplay(groupId) {
      const groupData = this.componentGroups.get(groupId)
      const groupElement = node.querySelector(`[data-component-group="${groupId}"]`)
      if (!groupData || !groupElement) return

      const selectedContainer = this.getOrCreateSelectedContainer(groupElement)
      selectedContainer.innerHTML = ''

      groupData.selectedComponents.forEach((componentId) => {
        const componentData = this.selectedComponents.get(componentId)
        if (componentData) {
          selectedContainer.appendChild(
            this.createComponentCard(componentId, componentData, groupId)
          )
        }
      })

      this.updateChooseButton(groupElement, groupData)
    },

    getOrCreateSelectedContainer(groupElement) {
      let container = groupElement.querySelector('.selected-components-container')
      if (!container) {
        container = document.createElement('div')
        container.className = 'selected-components-container'
        groupElement.appendChild(container)
      }
      return container
    },

    updateGroupTotalQuantity(groupId) {
      const groupData = this.componentGroups.get(groupId)
      if (!groupData) return

      let totalQuantity = 0
      groupData.selectedComponents.forEach((componentId) => {
        const componentData = this.selectedComponents.get(componentId)
        if (componentData) {
          totalQuantity += componentData.quantity || 0
        }
      })

      groupData.totalQuantity = totalQuantity
    },

    updateChooseButton(groupElement, groupData) {
      const chooseButton = groupElement.querySelector('[data-modal-trigger]')
      if (!chooseButton) return

      const canAddMore = groupData.selectedCount < groupData.max
      chooseButton.style.display = canAddMore ? 'inline-block' : 'none'

      if (canAddMore && !groupData.isSingleChoice) {
        const buttonSpan = chooseButton.querySelector('span')
        if (buttonSpan) {
          const remainingSlots = groupData.max - groupData.selectedCount
          buttonSpan.textContent =
            groupData.selectedCount > 0 && remainingSlots > 0
              ? `Add ${remainingSlots} more`
              : 'Choose'
        }
      }
    },

    createComponentCard(componentId, componentData, groupId) {
      const template = document.querySelector('[data-component-card-template]')
      if (!template) {
        return document.createElement('div')
      }

      const cardDiv = template.content.cloneNode(true).firstElementChild
      cardDiv.setAttribute('data-selected-component', componentId)

      const { productName, productImage } = this.getComponentDisplayData(componentId, groupId)

      const imageContainer = cardDiv.querySelector('[data-template-image-container]')
      const image = cardDiv.querySelector('[data-template-image]')
      const nameElement = cardDiv.querySelector('[data-template-name]')
      const priceElement = cardDiv.querySelector('[data-template-price]')
      const removeButton = cardDiv.querySelector('[data-template-remove]')
      const freeLabel = priceElement.getAttribute('data-free-label')
      if (productImage && image) {
        image.src = productImage
        image.alt = productName
      } else if (imageContainer) {
        imageContainer.remove()
      }

      // Build display name with free quantity information
      let displayName = productName
      const freeQty = componentData.freeQuantity || 0
      const totalQty = componentData.quantity

      if (totalQty > 1) {
        displayName = `${totalQty}x ${productName}`

        // Show free quantity info if applicable
        if (freeQty > 0 && freeQty < totalQty) {
          displayName += ` (${freeQty} ${freeLabel})`
        }
      }

      nameElement.textContent = displayName

      if (componentData.price > 0) {
        priceElement.textContent = this.formatPrice(componentData.price)
      } else {
        priceElement.textContent = freeLabel
      }

      removeButton.setAttribute('data-remove-component', componentId)
      removeButton.setAttribute('data-group-id', groupId)
      removeButton.addEventListener('click', () =>
        this.removeSpecificComponent(componentId, groupId)
      )

      return cardDiv
    },

    getComponentDisplayData(componentId, groupId) {
      const modal = node.querySelector(`[data-modal="${groupId}"]`)
      const componentOption = modal?.querySelector(`[data-component-option="${componentId}"]`)

      return {
        productName: componentOption?.getAttribute('data-product-name') || '',
        productImage: componentOption?.querySelector('.SC-ProductListCard_image img')?.src || '',
      }
    },

    updateTotalPrice() {
      let totalPrice = this.basePrice
      this.selectedVariants.forEach((variant) => (totalPrice += variant.price))
      this.selectedComponents.forEach((component) => (totalPrice += component.price))
      totalPrice *= this.bundleQuantity

      const priceElement = this.container.querySelector('[data-bundle-total]')
      if (priceElement) priceElement.textContent = this.formatPrice(totalPrice)

      // ALSO update nested modal footer price if we're in a nested context
      const modalPriceElement = document.querySelector('[data-modal-bundle-total]')
      if (modalPriceElement) {
        // Check if this bundle instance is inside the nested modal
        const nestedModal = document.querySelector('[data-nested-modal]')
        if (nestedModal && nestedModal.style.display !== 'none') {
          modalPriceElement.textContent = this.formatPrice(totalPrice)
        }
      }
    },

    formatPrice(price) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: node.querySelector('[data-store-currency]').getAttribute('data-store-currency'),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currencyDisplay: 'narrowSymbol',
      }).format(price)
    },

    validateComponentGroups() {
      const errors = []

      this.clearSubmissionErrors()

      this.componentGroups.forEach((groupData, groupId) => {
        const { min, max, minGroupQuantity, maxGroupQuantity, selectedCount, totalQuantity } =
          groupData

        // Validate component count constraints
        if (selectedCount < min) {
          errors.push(`${groupData.displayName} requires at least ${min} component(s)`)
        }
        if (selectedCount > max) {
          errors.push(`${groupData.displayName} allows maximum ${max} component(s)`)
        }

        // Validate group quantity constraints
        if (totalQuantity < minGroupQuantity) {
          errors.push(
            `${groupData.displayName} requires at least ${minGroupQuantity} total item(s)`
          )
        }
        if (maxGroupQuantity && totalQuantity > maxGroupQuantity) {
          errors.push(`${groupData.displayName} allows maximum ${maxGroupQuantity} total item(s)`)
        }
      })

      const addToCartButton = node.querySelector('[data-bundle-add-to-cart-button]')
      if (addToCartButton) addToCartButton.disabled = errors.length > 0

      if (errors.length > 0) {
        this.displaySubmissionError(errors)
        return false
      }

      return errors.length === 0
    },

    setupFormSubmission() {
      const form = node.querySelector('[data-bundle-form]')
      if (!form) return

      form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.handleFormSubmission(form)
      })
    },

    handleFormSubmission(form) {
      const configInput = form.querySelector('[data-bundle-configuration]')

      try {
        const config = this.serializeBundleConfiguration()

        if (this.errors.length > 0) {
          this.displaySubmissionError(this.errors)
          this.errors = []
          this.resetSubmissionButton()
          return
        }

        if (configInput) {
          configInput.value = JSON.stringify(config)
        }

        this.submitForm(form)
      } catch (error) {
        this.displaySubmissionError([
          configInput.getAttribute('data-failed-to-add-to-cart-message'),
        ])
      }
    },

    serializeBundleConfiguration() {
      // Check if node itself has the bundle ID attributes first, then check children
      const bundleId =
        node.getAttribute?.('data-bundle-id') ||
        node.getAttribute?.('data-nested-bundle-id') ||
        node.querySelector('[data-bundle-form]')?.getAttribute('data-bundle-form')

      if (!bundleId) {
        throw new Error('Bundle product ID not found')
      }

      const quantityInput =
        node.querySelector('input[name="quantity"]') || node.querySelector('#bundle_quantity')
      const bundleQuantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1

      const selectedComponents = []

      this.componentGroups.forEach((groupData, groupId) => {
        if (groupData.required && groupData.selectedCount === 0) {
          this.errors.push(`${groupData.displayName} is required`)
        }
      })

      // Validate nested bundles
      this.validateNestedBundles()

      this.selectedComponents.forEach((componentData, componentId) => {
        // Handle nested bundles differently
        if (componentData.isNestedBundle) {
          // For nested bundles, include the nested bundle configuration
          const nestedConfig = this.nestedBundleConfigurations.get(componentId)
          if (nestedConfig && nestedConfig.isConfigured) {
            const componentObject = {
              product_component_id: componentId,
              product_id: componentData.product_id,
              quantity: componentData.quantity,
              variant_id: null,
              nested_bundle_configuration: nestedConfig.configuration,
              product_name: componentData.productName,
            }
            selectedComponents.push(componentObject)
          }
          return // Skip regular processing for nested bundles
        }

        // Regular component processing
        if (componentData.required && componentData.quantity === 0 && !componentData.hasVariants) {
          this.errors.push(`${componentData.productName} is required`)
        }
        const variant = this.selectedVariants.get(componentId)

        if (
          componentData.required &&
          componentData.quantity === 0 &&
          componentData.hasVariants &&
          variant === undefined
        ) {
          this.errors.push(`Please select a variant for ${componentData.productName}`)
        }

        // Collect booking data for this component if it exists
        const bookingData = this.collectComponentBookingData(componentId)

        const componentObject = {
          product_component_id: componentId, // ProductComponent ID
          product_id: componentData.product_id, // Product SFID
          quantity: componentData.quantity,
          variant_id: variant?.variantId || null, // Variant Product SFID if selected
          booking_data: bookingData, // Booking information if component is bookable
          product_name: componentData.productName,
        }

        // If the component has a quantity of 0 and a variant is selected, set the quantity to 1
        if (componentObject.quantity === 0 && !!componentObject.variant_id) {
          componentObject.quantity = 1
        }

        // If the component has a quantity of 1 or more, or a variant is selected, add the component to the selected components
        // that will be submitted to the cart
        if (componentObject.quantity >= 1 || !!componentObject.variant_id) {
          selectedComponents.push(componentObject)
        }
      })

      return {
        bundle_product_id: bundleId,
        bundle_quantity: bundleQuantity,
        selected_components: selectedComponents,
      }
    },

    collectComponentBookingData(componentId) {
      // Look for booking inputs for this specific component
      const locationInput = document.querySelector(
        `[data-component-booking-location="${componentId}"]`
      )
      const startDateInput = document.querySelector(
        `[data-component-booking-start="${componentId}"]`
      )
      const endDateInput = document.querySelector(`[data-component-booking-end="${componentId}"]`)

      const componentCard = document.querySelector(`[data-component-id="${componentId}"]`)
      const required = componentCard?.getAttribute('data-component-required') === 'true'

      // If no booking inputs found, this component is not bookable
      if (!locationInput || !startDateInput || !endDateInput) {
        return null
      }

      // Check if booking data has been selected
      const location = locationInput.value
      const startDate = startDateInput.value
      const endDate = endDateInput.value

      // If booking is required but not selected, add to errors
      if (required && (!location || !startDate || !endDate)) {
        // Find the component name for error message
        const errorMsg = node
          .querySelector(`[data-component-booking="${componentId}"]`)
          ?.getAttribute('data-required-error-message')
        this.errors.push(errorMsg)
        return null
      }

      return {
        product_bookable_location_id: location,
        booking_start: startDate,
        booking_end: endDate,
      }
    },

    submitForm(form) {
      const button = form.querySelector('[data-bundle-add-to-cart-button]')
      const buttonText = button?.querySelector('[data-button-text]')
      const buttonLoading = button?.querySelector('[data-button-loading]')

      if (button && buttonText && buttonLoading) {
        buttonText.style.display = 'none'
        buttonLoading.style.display = 'inline'
        button.disabled = true
      }

      this.clearSubmissionErrors()
      form.submit()
    },

    displaySubmissionError(messages) {
      const errorContainer = node.querySelector('[data-bundle-validation-errors]')
      const errorList = node.querySelector('[data-bundle-validation-errors-list]')
      const errorTemplate = document.querySelector('[data-error-item-template]')

      if (errorContainer && errorList && errorTemplate) {
        errorList.innerHTML = ''

        Array.from(messages).forEach((message) => {
          const errorItem = errorTemplate.content.cloneNode(true).firstElementChild
          errorItem.textContent = message
          errorList.appendChild(errorItem)
        })

        errorContainer.classList.remove('sc-hide')
      }

      this.resetSubmissionButton()
    },

    clearSubmissionErrors() {
      const errorContainer = node.querySelector('[data-bundle-validation-errors]')
      const errorList = node.querySelector('[data-bundle-validation-errors-list]')

      if (errorContainer && errorList) {
        errorList.innerHTML = ''
        errorContainer.classList.add('sc-hide')
      }
    },

    resetSubmissionButton() {
      const form = node.querySelector('[data-bundle-form]')
      if (!form) return

      const button = form.querySelector('[data-bundle-add-to-cart-button]')
      const buttonText = button?.querySelector('[data-button-text]')
      const buttonLoading = button?.querySelector('[data-button-loading]')

      if (button && buttonText && buttonLoading) {
        buttonText.style.display = 'inline'
        buttonLoading.style.display = 'none'
        button.disabled = false
      }
    },

    prePopulateFromEditConfiguration() {
      const bundleSection = node.querySelector('[data-bundle-product]')
      const configParam = bundleSection?.getAttribute('data-bundle-config')
      if (!configParam) return

      const decodedConfig = atob(configParam) // Base64.decode64 js counterpart
      const bundleConfig = JSON.parse(decodedConfig)

      // Set bundle quantity
      const quantityInput =
        node.querySelector('input[name="quantity"]') || node.querySelector('#bundle_quantity')
      if (quantityInput) {
        const bundleQuantity = bundleConfig?.bundle_quantity || 1

        quantityInput.value = bundleQuantity // Input Value
        quantityInput.parentElement.querySelector('[data-qty-picker-value]').textContent =
          bundleQuantity // Display Value
        this.bundleQuantity = bundleQuantity
      }

      // Pre-populate selected components
      if (bundleConfig.selected_components) {
        bundleConfig.selected_components.forEach((component) => {
          this.prePopulateComponent(component)
        })
      }
    },

    prePopulateComponent(componentConfig) {
      const componentId = componentConfig.product_component_id
      const componentCard = node.querySelector(`[data-component-id="${componentId}"]`)

      if (componentCard) {
        // Handle ungrouped components (individual cards)
        this.prePopulateIndividualComponent(componentCard, componentConfig)
      } else {
        // Handle grouped components (components in modals)
        this.prePopulateGroupedComponent(componentConfig)
      }
    },

    prePopulateIndividualComponent(componentCard, componentConfig) {
      const {
        product_component_id: componentId,
        product_id: productId,
        quantity,
        variant_id: variantId,
      } = componentConfig

      // Set quantity - target the shared quantity picker input field
      let quantityInput = componentCard.querySelector(`#component_quantity_${componentId}`)

      if (quantityInput) {
        quantityInput.value = quantity

        const quantityDisplay = componentCard.querySelector('[data-qty-picker-value]')
        if (quantityDisplay) {
          quantityDisplay.textContent = quantity
        }
      }

      // Select variant if applicable
      if (variantId) {
        const variantRadio = componentCard.querySelector(
          `[data-component-variant="${componentId}"][value="${variantId}"]`
        )
        if (variantRadio) {
          variantRadio.checked = true
        }
      }

      // Add to selected components
      const unitPrice = parseFloat(componentCard.getAttribute('data-unit-price')) || 0
      const freeQuantity = parseInt(componentCard.getAttribute('data-free-quantity')) || 0
      const chargeableQuantity = Math.max(0, quantity - freeQuantity)

      // For flat priced bundles, component prices don't affect total
      const calculatedPrice = this.isFlatPricedBundle ? 0 : chargeableQuantity * unitPrice

      this.selectedComponents.set(componentId, {
        product_id: productId,
        price: calculatedPrice,
        quantity: quantity,
        unitPrice,
        freeQuantity,
        groupId: null,
      })

      // Check if this component is in a group
      const groupElement = componentCard.closest('[data-component-group]')
      const groupId = groupElement?.getAttribute('data-component-group')
      if (groupId) {
        this.prePopulateGroupComponent(componentId, groupId, componentConfig)
      }
    },

    prePopulateGroupedComponent(componentConfig) {
      const { product_component_id: componentId, product_id: productId, quantity } = componentConfig

      const componentOption = node.querySelector(`[data-component-option="${componentId}"]`)
      if (!componentOption) {
        return
      }

      const actualPrice = parseFloat(componentOption.getAttribute('data-unit-price')) || 0
      const freeQuantity = parseInt(componentOption.getAttribute('data-free-quantity')) || 0
      const chargeableQuantity = Math.max(0, quantity - freeQuantity)

      // For flat priced bundles, component prices don't affect total
      const calculatedPrice = this.isFlatPricedBundle ? 0 : chargeableQuantity * actualPrice

      // Add to selected components
      this.selectedComponents.set(componentId, {
        product_id: productId,
        price: calculatedPrice,
        quantity: quantity,
        unitPrice: actualPrice,
        freeQuantity,
      })

      // Find which group this component belongs to
      const modal = componentOption.closest('[data-modal]')
      const groupId = modal?.getAttribute('data-modal')

      if (groupId) {
        this.prePopulateGroupComponent(componentId, groupId, componentConfig)
      }
    },

    prePopulateGroupComponent(componentId, groupId, componentConfig) {
      const groupData = this.componentGroups.get(groupId)
      if (!groupData) {
        return
      }

      const componentData = this.selectedComponents.get(componentId)
      if (componentData) {
        componentData.groupId = groupId
      }

      // Only increment count if component is not already in the group
      if (!groupData.selectedComponents.has(componentId)) {
        if (groupData.isSingleChoice) {
          groupData.selectedComponents.clear()
          groupData.selectedCount = 1
        } else {
          groupData.selectedCount += 1
        }
      }
      groupData.selectedComponents.add(componentId)

      // Update group total quantity
      this.updateGroupTotalQuantity(groupId)

      // Update the group display to show the selected component
      this.updateGroupDisplay(groupId)
    },

    // Nested Bundle Event Handler
    handleNestedBundleConfigured(componentId, config) {
      // Remove Not Configured Text
      const statusElement = node.querySelector(`[data-nested-status="${componentId}"]`)
      if (statusElement) {
        statusElement.classList.add('sc-hide')
      }

      // Update summary using template
      const summaryElement = node.querySelector(`[data-nested-summary="${componentId}"]`)
      if (summaryElement && config.summary && Array.isArray(config.summary)) {
        if (config.summary.length > 0) {
          // Clone the nested summary template
          const summaryTemplate = node.querySelector('[data-nested-summary-template]')
          const itemTemplate = node.querySelector('[data-nested-item-template]')

          if (summaryTemplate && itemTemplate) {
            const summaryClone = summaryTemplate.content.cloneNode(true)
            const itemsList = summaryClone.querySelector('[data-nested-items-list]')

            // Create list items from template
            config.summary.forEach((item) => {
              const itemClone = itemTemplate.content.cloneNode(true)
              const quantitySpan = itemClone.querySelector('[data-template-quantity]')
              const nameSpan = itemClone.querySelector('[data-template-item-name]')

              if (quantitySpan && nameSpan) {
                quantitySpan.textContent = item.quantity > 1 ? `${item.quantity} ` : ''
                nameSpan.textContent = item.name
              }

              itemsList.appendChild(itemClone)
            })

            summaryElement.innerHTML = ''
            summaryElement.appendChild(summaryClone)
            summaryElement.classList.remove('sc-hide')
          }
        }
      }

      // != null (not truthiness) so a $0 total still updates the label.
      const pricingElement = node.querySelector(`[data-nested-pricing="${componentId}"]`)
      if (pricingElement && config.total != null) {
        pricingElement.textContent = `$${config.total.toFixed(2)}`
      }

      // Update button text
      const button = node.querySelector(`[data-configure-nested="${componentId}"]`)
      if (button) {
        button.textContent = config.isConfigured
          ? button.getAttribute('data-reconfigure-button-text')
          : button.getAttribute('data-configure-button-text')
      }

      // Store configuration
      this.nestedBundleConfigurations.set(componentId, config)

      // Gate on isConfigured only — a $0 sub-bundle must still be submitted.
      if (config.isConfigured) {
        const quantity = this.readNestedBundleQuantity(componentId)
        const total = config.total || 0
        this.selectedComponents.set(componentId, {
          product_id: componentId, // Use component ID as product ID for nested bundles
          price: total * quantity,
          quantity,
          unitPrice: total,
          freeQuantity: 0,
          groupId: null,
          isNestedBundle: true,
          nestedConfiguration: config.configuration,
        })
      } else {
        // Remove from selected components if not configured
        this.selectedComponents.delete(componentId)
      }

      // Update total pricing
      this.updateTotalPrice()
    },

    validateNestedBundles() {
      // Find all nested bundle components and check if required ones are configured
      const nestedBundleCards = node.querySelectorAll('[data-nested-bundle]')

      nestedBundleCards.forEach((card) => {
        const componentId = card.getAttribute('data-component-id')
        const isRequired = card.getAttribute('data-component-required') === 'true'
        const bundleName = card.getAttribute('data-product-name')

        if (isRequired) {
          const nestedConfig = this.nestedBundleConfigurations.get(componentId)

          if (!nestedConfig || !nestedConfig.isConfigured) {
            this.errors.push(`${bundleName} must be configured`)
          }
        }
      })
    },
  }

  BundleV2.init()

  // Store BundleV2 instance on the node for external access (e.g., nested bundle modal)
  if (BundleV2.container) {
    node.bundleV2Instance = BundleV2
  }
}
