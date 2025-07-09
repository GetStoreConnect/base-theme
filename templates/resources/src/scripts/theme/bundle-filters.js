let selectedCategories = []
let selectedBrands = []

export default function init(node) {
  ;[...node.querySelectorAll('[data-bundle-filter-option]')].map((option) => {
    option.addEventListener('click', (event) => {
      updateSelectedState(event.target)
      filterProductList()
    })
  })
}

function updateSelectedState(option) {
  const brand = option.getAttribute('data-brand')
  const category = option.getAttribute('data-category')

  if (option.checked) {
    if (brand && !selectedBrands.includes(brand)) {
      selectedBrands.push(brand)
    }
    if (category && !selectedCategories.includes(category)) {
      selectedCategories.push(category)
    }
  } else {
    if (brand && selectedBrands.includes(brand)) {
      removeFromArray(brand, selectedBrands)
    }
    if (category && selectedCategories.includes(category)) {
      removeFromArray(category, selectedCategories)
    }
  }
}

function filterProductList() {
  const container = document.querySelector('[data-bundle-filterable]')

  ;[...container.querySelectorAll('[data-product-option-sfid]')].map((product) => {
    const brandId = product.getAttribute('data-product-brand-sfid')
    const categoryIds = product.getAttribute('data-category-sfid')?.split(';') || []

    if (selectedCategories.length === 0 && selectedBrands.length === 0) {
      product.classList.remove('is-hidden')
    } else if (
      (selectedBrands.includes(brandId) || selectedBrands.length === 0) &&
      (selectedCategories.filter((value) => categoryIds.includes(value)).length > 0 ||
        selectedCategories.length === 0)
    ) {
      product.classList.remove('is-hidden')
    } else {
      product.classList.add('is-hidden')
    }
  })
}

function removeFromArray(item, array) {
  const index = array.indexOf(item)

  if (index > -1) {
    array.splice(index, 1)
  }
}
