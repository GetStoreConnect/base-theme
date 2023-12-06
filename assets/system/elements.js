import ProductCard from '/elements/products/product-card'
import ProductList from '/elements/products/product-list'
import BaseCard from '/elements/shared/base-card'

export const elements = {
  'sc-product-card': ProductCard,
  'sc-product-list': ProductList,
  'sc-card': BaseCard,
  // etc...
}

// Creates a shadow DOM and appends the template
export function initShadowDOM(element) {
  const shadow = element.attachShadow({ mode: 'open' })
  const template = document.querySelector('template#' + element.id)

  shadow.appendChild(template.content.cloneNode(true))
  return shadow
}

// Searches through nodes, finds custom elements and
// initalises them. Some performance testing needed.
// Alternately, we require users to manually define
// all custom elements used on a given page.
export function initCustomElements(node = document.body) {
  [...getUniqCustomElements(node)].forEach(name => {
    if (customElements.get(name) === undefined) {
      // Define the custom element
      customElements.define(name, elements[name])
      // Search through the shadow DOM and initialise child
      // custom elements using recursion
      initCustomElements(node.querySelector(name).shadowRoot)
    }
  })
}

function getUniqCustomElements(node = null) {
  if (node === null) return []
  return new Set(
    // Selects all DOM nodes
    [...node.querySelectorAll('*')]
      // Filters only elements prefixed with 'sc-'
      .filter(elem => isPrefixed(elem))
      // Returns an array of tag names
      .map(elem => elem.tagName.toLowerCase())
  )
}

function isPrefixed(elem) {
  return elem.tagName.toLowerCase().substring(0, 3) === 'sc-'
}