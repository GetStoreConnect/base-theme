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

    init() {
      this.container = node.querySelector('[data-bundle-pricing]')
      if (!this.container) return

      this.basePrice =
        parseFloat(
          this.container.querySelector('[data-bundle-total]')?.getAttribute('data-bundle-total')
        ) || 0
      this.initializeComponentGroups()
      this.initializeRequiredComponents()
      this.setupAllListeners()
      this.updateTotalPrice()
    },

    setupAllListeners() {
      this.setupVariantListeners()
      this.setupComponentListeners()
      this.setupModalListeners()
      this.setupQuantityListeners()
    },

    setupVariantListeners() {
      const variants = node.querySelectorAll('[data-component-variant]')

      const handleVariantChange = (radio) => {
        const componentId = radio.getAttribute('data-component-variant')
        const variantPrice = parseFloat(radio.getAttribute('data-variant-price')) || 0
        this.selectedVariants.set(componentId, { variantId: radio.value, price: variantPrice })
        this.updateTotalPrice()
      }

      variants.forEach((radio) => {
        if (radio.checked) handleVariantChange(radio)
        radio.addEventListener('change', (e) => e.target.checked && handleVariantChange(e.target))
      })
    },

    setupComponentListeners() {
      this.addEventListeners('[data-feature-remove]', 'click', (e) => {
        const groupId = e.target
          .closest('[data-feature-option]')
          ?.getAttribute('data-feature-option')
        if (groupId) this.removeComponentFromGroup(groupId)
      })
    },

    setupModalListeners() {
      this.addEventListeners('[data-modal-trigger]', 'click', (e) => {
        const groupId = e.target.getAttribute('data-modal-trigger')
        const modal = node.querySelector(`[data-modal="${groupId}"]`)
        if (modal) modal.style.display === 'block' ? this.closeModal(modal) : this.openModal(modal)
      })

      this.addEventListeners('[data-component-radio]', 'change', (e) => {
        if (e.target.checked) this.updateAddToBundleButton(e.target.closest('.SC-Modal'))
      })

      this.addEventListeners('[data-add-option-to-bundle]', 'click', (e) => {
        this.addSelectedComponentToBundle(
          e.target.closest('.SC-Modal'),
          e.target.getAttribute('data-modal-trigger')
        )
      })
    },

    setupQuantityListeners() {
      this.addEventListeners('.bundle-v2-quantity-form', 'submit', (e) => e.preventDefault())

      this.addEventListeners('[data-component-quantity]', 'change', (e) => {
        const componentId = e.target.getAttribute('data-component-id')
        if (componentId) this.updateComponentQuantity(componentId, parseInt(e.target.value) || 0)
      })

      this.addEventListeners('[data-quantity-change]', 'click', (e) => {
        const picker = e.target.closest('.quantity-picker')
        const input = picker?.querySelector('[data-component-quantity]')
        const componentId = input?.getAttribute('data-component-id')
        if (!componentId || !input) return

        const change = parseInt(e.target.getAttribute('data-quantity-change')) || 0
        const newQuantity = Math.max(0, (parseInt(input.value) || 0) + change)
        input.value = newQuantity
        this.updateComponentQuantity(componentId, newQuantity)
      })
    },

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
          selectedComponents: new Set(),
        })
      })
    },

    initializeRequiredComponents() {
      node.querySelectorAll('[data-component-id]').forEach((card) => {
        const componentId = card.getAttribute('data-component-id')
        const quantityInput = card.querySelector('[data-component-quantity]')
        const hasVariants = parseInt(card.getAttribute('data-variants-size')) > 0
        const bundleFlatPrice = card.getAttribute('data-bundle-flat-price') === 'true'
        const defaultQuantity = parseInt(card.getAttribute('data-default-quantity')) || 0
        const freeQuantity = parseInt(card.getAttribute('data-free-quantity')) || 0
        let unitPrice = parseFloat(card.getAttribute('data-unit-price')) || 0
        let currentQuantity = quantityInput
          ? parseInt(quantityInput.value) || defaultQuantity
          : defaultQuantity

        if (hasVariants) currentQuantity = 0
        if (bundleFlatPrice) unitPrice = 0

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
            bundleFlatPrice,
            groupId: null,
          })
        }
      })
    },

    updateComponentQuantity(componentId, newQuantity) {
      const component = this.selectedComponents.get(componentId)
      if (!component) return

      const card = node.querySelector(`[data-component-id="${componentId}"]`)
      const freeQuantity = parseInt(card?.getAttribute('data-free-quantity')) || 0
      const unitPrice = parseFloat(card?.getAttribute('data-unit-price')) || 0

      component.quantity = newQuantity
      component.price = Math.max(0, newQuantity - freeQuantity) * unitPrice
      this.updateTotalPrice()
    },

    openModal(modal) {
      modal.style.display = 'block'
      document.body.classList.add('modal-open')
      this.updateAddToBundleButton(modal)
    },

    closeModal(modal) {
      modal.style.display = 'none'
      document.body.classList.remove('modal-open')
    },

    updateAddToBundleButton(modal) {
      const addButton = modal.querySelector('[data-add-option-to-bundle]')
      if (addButton) addButton.disabled = !modal.querySelector('[data-component-radio]:checked')
    },

    addSelectedComponentToBundle(modal, groupId) {
      const selectedRadio = modal.querySelector('[data-component-radio]:checked')
      if (!selectedRadio) return

      const componentId = selectedRadio.value
      const componentOption = modal.querySelector(`[data-component-option="${componentId}"]`)
      const { freeQuantity, defaultQuantity, unitPrice } =
        this.extractComponentData(componentOption)

      this.selectedComponents.set(componentId, {
        price: Math.max(0, defaultQuantity - freeQuantity) * unitPrice,
        quantity: defaultQuantity,
        groupId,
        unitPrice,
        freeQuantity,
      })

      this.updateGroupData(groupId, componentId)
      this.updateGroupDisplay(groupId)
      this.updateTotalPrice()
      this.validateComponentGroups()
      this.closeModal(modal)
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
        groupData.selectedCount += 1
      }
      groupData.selectedComponents.add(componentId)
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
      const template = node.querySelector('[data-component-card-template]')
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

      if (productImage && image) {
        image.src = productImage
        image.alt = productName
      } else if (imageContainer) {
        imageContainer.remove()
      }

      nameElement.textContent = productName
      priceElement.textContent = this.formatPrice(componentData.price)

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
      this.componentGroups.forEach((groupData) => {
        const { min, max, selectedCount, displayName } = groupData
        if (selectedCount < min) errors.push(`${displayName} requires at least ${min} component(s)`)
        if (selectedCount > max) errors.push(`${displayName} allows maximum ${max} component(s)`)
      })

      const errorContainer = node.querySelector('[data-bundle-errors]')
      const addToCartButton = node.querySelector('[data-bundle-add-to-cart-button]')

      if (errorContainer) {
        errorContainer.style.display = errors.length > 0 ? 'block' : 'none'
        if (errors.length > 0) {
          errorContainer.innerHTML = errors
            .map((error) => `<div class="error-message sc-color-error">${error}</div>`)
            .join('')
        }
      }

      if (addToCartButton) addToCartButton.disabled = errors.length > 0
      return errors.length === 0
    },
  }

  BundleV2.init()
}
