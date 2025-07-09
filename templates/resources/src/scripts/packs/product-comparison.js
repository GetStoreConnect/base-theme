import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  let ProductComparison = []

  ;[...node.querySelectorAll('[data-js-compare-add]')].forEach((element) => {
    element.addEventListener('change', function (e) {
      updateSelectedProducts(e.target)
      const compareElement = document.querySelector('[data-js-compare]')
      const compareTrigger = document.querySelector('[data-js-compare-trigger]')
      const compareCount = document.querySelector('[data-js-compare-count]')

      if (compareElement) {
        compareElement.classList.toggle('is-hidden', noSelection())
      }

      if (compareTrigger) {
        compareTrigger.disabled = nothingToCompare()
      }

      if (compareCount) {
        compareCount.textContent = ProductComparison.length
      }
    })
  })

  const compareTrigger = node.querySelector('[data-js-compare-trigger]')
  if (compareTrigger) {
    compareTrigger.addEventListener('click', function (e) {
      const category = e.target.getAttribute('data-js-compare-trigger')
      const ids = ProductComparison

      // Construct the query string with ids[]=1&ids[]=2&ids[]=3
      const params = new URLSearchParams({ category })
      ids.forEach((id) => params.append('ids[]', id))

      fetch(`/product_comparison?${params.toString()}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === 'error') {
            console.error(response.message)
            return
          } else {
            if (response.html === '') {
              console.error('No products found')
              return
            }
            const screenElement = document.querySelector('[data-js-screen]')
            const screenBody = document.querySelector('[data-js-screen-body]')
            if (screenElement) {
              screenElement.classList.remove('is-hidden')
            }
            if (screenBody) {
              screenBody.innerHTML = response.html
            }
          }
        })
    })
  }

  const compareCancel = node.querySelector('[data-js-compare-cancel]')
  if (compareCancel) {
    compareCancel.addEventListener('click', () => {
      ProductComparison = []
      const compareElement = document.querySelector('[data-js-compare]')
      if (compareElement) {
        compareElement.classList.add('is-hidden')
      }
      document
        .querySelectorAll('[data-js-compare-add]')
        .forEach((element) => (element.checked = false))
    })
  }

  const screenClose = node.querySelector('[data-js-screen-close]')
  if (screenClose) {
    screenClose.addEventListener('click', () => {
      const screenElement = document.querySelector('[data-js-screen]')
      if (screenElement) {
        screenElement.classList.add('is-hidden')
      }
    })
  }

  function updateSelectedProducts(product) {
    // Add product to state
    if (product.checked) {
      ProductComparison.push(product.id)
      return
    }

    // Remove product from state
    ProductComparison = ProductComparison.filter((productId) => productId !== product.id)
  }

  function noSelection() {
    return ProductComparison.length < 1
  }

  function nothingToCompare() {
    return ProductComparison.length < 2
  }
}
