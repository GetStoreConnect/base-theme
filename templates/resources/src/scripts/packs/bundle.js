import initBundleFilters from '../theme/bundle-filters'
import storePathUrl from '../theme/store-path-url'
import fetchWithResponseHandler from '../theme/utils/fetch'
import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  const container = node.querySelector('[data-bundle]')

  if (container) {
    const bundleId = container.getAttribute('data-bundle')

    fetchWithResponseHandler(storePathUrl('/cpq/bundles'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ lead_product_sfid: bundleId }).toString(),
    })
      .then(() => setup(container, bundleId))
      .catch((error) => console.error('Fetch error:', error))
  }
}

function setup(container, bundleId) {
  const removeBtns = [...container.querySelectorAll('[data-feature-remove]')]
  const featureOptions = [...container.querySelectorAll('[data-feature-option]')]
  const addToBundleBtns = container.querySelectorAll('[data-add-option-to-bundle]')

  initBundleFilters(container)
  initOptionCard(enableAddToBundleButton)
  initVariants()

  featureOptions
    .filter((option) => option.dataset.selected)
    .forEach((option) => {
      const productId = option.dataset.selected

      container.querySelector(`input[value="${productId}"]`).checked = true
      updateFeatureOptionCard(option, productId)
    })

  addToBundleBtns.forEach((button) => {
    button.addEventListener('click', (event) => {
      const form = event.target.form
      const selectedInput = form.querySelector('[data-single-option-radio-input]:checked')

      event.preventDefault()
      chooseFeatureOption(form, selectedInput.value)
    })
  })

  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener('click', (event) => {
      const featureOption = event.currentTarget.closest('[data-feature-option]')
      const featureId = featureOption.dataset.featureOption
      const productId = featureOption.dataset.selected
      const loader = featureOption.querySelector('[data-loader]')

      loader.classList.add('is-active')

      addOrUpdateProductOption(productId, featureId, 0, true, () => {
        loader.classList.remove('is-active')
        container.querySelector(`input[value="${productId}"]`).checked = false
        updateFeatureOptionCard(featureOption, null)
      })
    })
  })

  container.querySelectorAll('[data-qty-picker] input').forEach((input) => {
    input.addEventListener('change', updateQuantity)
  })

  container.querySelectorAll('[data-variant-option]').forEach((option) => {
    option.addEventListener('change', chooseProductVariant)
  })

  document.querySelectorAll('[data-variant-group] select').forEach((selectElem) => {
    selectElem.addEventListener('change', chooseProductVariant)
  })

  function initVariants() {
    const variants = document.querySelectorAll('[data-variant-id]')
    if (variants.length === 0) return

    const resetButton = document.querySelector('[data-variant-options-reset-button]')
    const variantOptions = [...document.querySelectorAll('[data-variant-option]')]
    const selectedOptions = returnSelectedVariantOptions(variantOptions)

    if (selectedOptions.length > 0) {
      selectedOptions.forEach((option) => {
        select(option, variantOptions, selectedOptions)
      })
    } else {
      restoreSessionSelections(variantOptions)
    }

    variantOptions.forEach((option) => {
      option.addEventListener('change', (event) => {
        select(event.target, variantOptions)
        storeSessionSelections(variantOptions)
      })
    })

    document.querySelectorAll('[data-variant-group] select').forEach((selectElem) => {
      selectElem.addEventListener('change', (event) => {
        const option = [...event.target.querySelectorAll('option')].find((o) => o.selected)

        select(option, variantOptions)
        storeSessionSelections(variantOptions)
      })
    })

    if (resetButton) {
      resetButton.addEventListener('click', () => {
        reset(variantOptions)
      })
    }

    document.querySelectorAll('[data-variant-selector]').forEach((node) => {
      node.style.display = 'block'
    })
  }

  function addOrUpdateProductOption(productId, featureId, qty, isSingleOption, onSuccessCallback) {
    const button = document.querySelector('[data-bundle-add-to-cart]')
    const payload = generatePayload(productId, featureId, qty, isSingleOption)

    if (button) {
      button.disabled = true
      button.value = button.dataset.loading
    }

    fetchWithResponseHandler(
      storePathUrl(`/cpq/bundles/${bundleId}/product_options/${productId}`),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      }
    )
      .then(() => onSuccessCallback())
      .catch((error) => console.error('Fetch error:', error))
  }

  function chooseFeatureOption(form, productId) {
    const isOptional = form.dataset.optional === 'true'
    const featureId = form.id
    const featureOptionCard = container.querySelector(`[data-feature-option="${featureId}"]`)
    const prevSelectedProductId = featureOptionCard.dataset.selected
    const loader = featureOptionCard.querySelector('[data-loader]')

    loader.classList.add('is-active')

    if (isOptional && prevSelectedProductId) {
      addOrUpdateProductOption(prevSelectedProductId, featureId, 0, true, () => {
        addOrUpdateProductOption(productId, featureId, 1, true, () => {
          loader.classList.remove('is-active')
          updateFeatureOptionCard(featureOptionCard, productId)
        })
      })
    } else {
      addOrUpdateProductOption(productId, featureId, 1, true, () => {
        loader.classList.remove('is-active')
        updateFeatureOptionCard(featureOptionCard, productId)
      })
    }
  }

  function updateFeatureOptionCard(card, productId) {
    const img = card.querySelector('[data-feature-img]')
    const headline = card.querySelector('[data-feature-headline]')
    const subheadline = card.querySelector('[data-feature-subheadline]')
    const remove = card.querySelector('[data-feature-remove]')
    const trigger = card.querySelector('[data-modal-trigger]')

    let data = {
      headline: headline.dataset.featureHeadline,
      subheadline: subheadline.dataset.featureSubheadline,
      imageUrl: img ? img.dataset.featureImg : null,
    }

    card.dataset.selected = ''

    if (productId) {
      const input = document.querySelector(`input[value="${productId}"]`)
      const productCard = input.form.querySelector(`[data-single-option="${input.value}"]`)
      const optionCard = input.form.querySelector(
        `[data-product-option-sfid="${input.dataset.optionId}"]`
      )
      const subHeadline = productCard.querySelector('[data-single-option-subheading]')
      const image = optionCard.querySelector('[data-single-option-image]')

      data = {
        headline: returnHeadline(optionCard, productCard),
        subheadline: subHeadline?.innerHTML,
        imageUrl: image?.src,
      }

      card.dataset.selected = productId
      trigger.querySelector('span').innerText = trigger.dataset.edit

      if (data.imageUrl) {
        img.src = data.imageUrl
        img.classList.remove('sc-hide')
      } else {
        img.classList.add('sc-hide')
      }

      remove?.classList.remove('sc-hide')
      trigger.classList.add('sc-hide')
    } else {
      img.classList.add('sc-hide')
      trigger.querySelector('span').innerText = trigger.dataset.add
      remove?.classList.add('sc-hide')
      trigger.classList.remove('sc-hide')
    }

    headline.innerText = data.headline
    subheadline.innerHTML = data.subheadline
  }

  function returnHeadline(optionCard, productCard) {
    return optionCard.querySelector('[data-option-card-subset]')
      ? productCard.querySelector('[data-single-option-heading]').innerText
      : optionCard.querySelector('[data-single-option-heading]').innerText
  }

  function chooseProductVariant(e) {
    const id = e.target.form.id
    const featureId = e.target.form.querySelector('[data-feature]').value
    const price = e.target.getAttribute('data-price')
    const priceEl = e.target.form.querySelector('[data-bundle-product-option-price]')
    const clearOption = document.querySelector(`[data-clear-product-option="${id}"]`)
    const payload = generateVariantPayload(e.target.name, e.target.value, featureId)

    if (clearOption) {
      clearOption.checked = false
    }

    fetchWithResponseHandler(storePathUrl(`/cpq/bundles/${bundleId}/product_options/${id}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    })
      .then(() => {
        if (priceEl) {
          priceEl.innerText = price
        }
      })
      .catch((error) => console.error('Fetch error:', error))
  }

  function updateQuantity(e) {
    const featureId = e.target.form.id
    const productId = e.target.form.dataset.productOptionSfid
    const qty = e.target.form.querySelector('[data-qty-picker] input').value

    if (productId) {
      addOrUpdateProductOption(productId, featureId, qty, false, () => {})
    }
  }

  function enableAddToBundleButton(event) {
    const button = event.currentTarget
      .closest('.SC-Modal')
      .querySelector('[data-add-option-to-bundle]')

    if (button.hasAttribute('disabled')) {
      button.removeAttribute('disabled')
    }
  }

  function generatePayload(optionId, featureId, qty, isSingleOption) {
    const payload = new URLSearchParams({
      'product_option[sfid]': optionId,
      'product_option[quantity]': qty,
      'product_option[feature]': featureId,
    })

    if (isSingleOption) {
      payload.append('product_option[single_option]', '1')
    }

    return payload.toString()
  }

  function generateVariantPayload(name, value, featureId) {
    if (name.startsWith('variant[')) {
      const variants = name.replace('variant[', 'variants][')

      return new URLSearchParams({
        [`product_option[${variants}[${value}][quantity]`]: '1',
        'product_option[feature]': featureId,
      }).toString()
    }

    const payload = new URLSearchParams({
      [name]: value,
      'product_option[feature]': featureId,
    })

    if (!name.includes('quantity')) {
      payload.append(`${name}[${value}][quantity]`, '1')
    }

    return payload.toString()
  }

  function returnSelectedVariantOptions(variantOptions) {
    return variantOptions
      .filter((opt) => opt.checked || opt.selected)
      .sort((a, b) => (a.dataset.type < b.dataset.type ? -1 : 1))
  }

  function select(option, options) {
    disableOrEnableVariantOptions(option, options)

    const variants = document.querySelectorAll('[data-variant-id]')
    const leadProduct = document.querySelector('[data-lead-product]')
    const opts = [...leadProduct.querySelectorAll('[data-variant-option]')]
    const selectedOptions = returnSelectedVariantOptions(opts)
    const requiredSelections = document.querySelectorAll('[data-variant-group]').length
    const selectedVariant = returnSelectedVariantAsString(selectedOptions, requiredSelections)
    const leadProductImage = document.querySelector('[data-lead-product-image]')

    variants.forEach((variant) => {
      if (variant.dataset.variantId === selectedVariant) {
        variant.classList.remove('is-hidden')
        if (variant.getAttribute('data-variant-image-src') && leadProductImage) {
          leadProductImage.src = variant.getAttribute('data-variant-image-src')
        }
      } else {
        variant.classList.add('is-hidden')
      }
    })
  }

  function disableOrEnableVariantOptions(option, variantOptions) {
    const allowedOptions = option.dataset.variantAllowedOptions
    const optionType = option.dataset.type

    if (!allowedOptions || allowedOptions === '{}') return

    document.querySelectorAll('[data-variant-option]').forEach((group) => {
      const groupType = group.dataset.type
      const optionsInGroup = variantOptions.filter((o) => o.dataset.type === groupType)

      if (groupType === optionType) return

      optionsInGroup.forEach((option) => {
        option.disabled = !JSON.parse(allowedOptions)[groupType].includes(option.value)
      })
    })
  }

  function returnSelectedVariantAsString(selectedOptions, requiredSelections) {
    if (selectedOptions.length === requiredSelections) {
      return selectedOptions.map((option) => option.value).join(' ')
    }
  }

  function restoreSessionSelections(variantOptions) {
    const selectorNode = document.querySelector('[data-variant-option-selector]')
    if (!selectorNode) return

    const masterId = selectorNode.dataset.masterId
    const selectedVariantIds = JSON.parse(
      window.sessionStorage.getItem(`${masterId}:selected-variants`)
    )
    selectSelectedIds(variantOptions, selectedVariantIds)
  }

  function selectSelectedIds(variantOptions, selectedVariantIds) {
    if (!Array.isArray(selectedVariantIds)) return

    const selectedIds = selectedVariantIds.filter(Boolean)

    selectedIds.forEach((id) => {
      const option = document.querySelector(`#${id}`)

      if (!option) return

      if (option.tagName === 'OPTION') {
        option.selected = true
        select(option, variantOptions)
      } else {
        option.checked = true
        select(option, variantOptions)
      }
    })
  }

  function storeSessionSelections(variantOptions) {
    const selectorNode = document.querySelector('[data-variant-option-selector]')
    const masterId = selectorNode.dataset.masterId
    const selectedIds = returnSelectedVariantOptions(variantOptions).map((elem) => elem.id)

    window.sessionStorage.setItem(`${masterId}:selected-variants`, JSON.stringify(selectedIds))
  }

  function reset(variantOptions) {
    variantOptions.forEach((optionInput) => {
      if (optionInput.tagName === 'OPTION') optionInput.selected = false
      if (optionInput.tagName === 'INPUT') optionInput.checked = false
      optionInput.disabled = false
    })

    document.querySelectorAll('[data-variant-group] select').forEach((selectInput) => {
      selectInput.querySelectorAll('option[disabled]').forEach((optionInput) => {
        optionInput.selected = true
      })
    })

    disableAddToCart()
    showOrHideVariantContent()
    clearSessionSelections()
  }

  function disableAddToCart() {
    document.querySelectorAll('[data-bundle-add-to-cart]').forEach((selectInput) => {
      selectInput.disabled = 'disabled'
    })
  }

  function showOrHideVariantContent(selectedVariant) {
    document.querySelectorAll('[data-variant-id]').forEach((node) => {
      const isMaster = !node.dataset.variantId
      const isSelected = isMaster
        ? selectedVariant === undefined
        : node.dataset.variantId === selectedVariant

      node.classList.toggle('is-hidden', !isSelected)
    })
  }

  function clearSessionSelections() {
    const selectorNode = document.querySelector('[data-variant-option-selector]')
    const masterId = selectorNode.dataset.masterId
    window.sessionStorage.removeItem(`${masterId}:selected-variants`)
  }

  function initOptionCard(onChangeCallback) {
    let triggers, inputs, prevSubset

    triggers = [...document.querySelectorAll('[data-option-card-trigger]')]
    inputs = [...document.querySelectorAll('[data-single-option-radio-input]')]

    inputs.forEach((input) => {
      input.addEventListener('change', (event) => {
        const id = event.currentTarget.value
        const option = document.querySelector(`[data-single-option="${id}"]`)
        const qtyInputs = [...document.querySelectorAll('[data-qty-picker] input')]
        const inputElement = option.querySelector('[data-qty-picker] input')

        if (inputElement) {
          qtyInputs.forEach((input) => (input.value = 0))
          inputElement.value = 1

          addOrUpdateProductOption(inputElement.id, inputElement.name + '=' + inputElement.value)
        }
      })
    })

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        choose(event, onChangeCallback)
      })
    })

    function choose(event, onChangeCallback) {
      const choice = event.currentTarget.parentNode
      const subset = choice.querySelector('[data-option-card-subset]')

      event.preventDefault()

      triggers.forEach((trigger) => {
        trigger.parentNode.classList.remove('is-selected')
      })

      if (prevSubset && !prevSubset.contains(choice)) {
        prevSubset.classList.remove('is-active')
        prevSubset.parentNode.classList.remove('is-active')
      }

      if (subset) {
        subset.classList.add('is-active')
        subset.parentNode.classList.add('is-active')
        prevSubset = subset
      } else {
        const input = choice.querySelector('input[type=radio]')

        choice.classList.add('is-selected')
        input.checked = true
        triggerChangeEvent(input)
      }

      onChangeCallback(event)
    }

    function triggerChangeEvent(input) {
      const event = document.createEvent('HTMLEvents')

      event.initEvent('change', false, true)
      input.dispatchEvent(event)
    }
  }
}
