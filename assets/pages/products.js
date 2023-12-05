import { initCustomElements } from "../system/elements"

// Searches through nodes, finds custom elements and
// initalises them. Some performance testing needed.
// Alternately, we require users to manually define
// all custom elements used on a given page.
initCustomElements()

// Alternately we manually define custom elements:
// import ProductCard from '/elements/products/product-card'
// customElements.define('sc-product-card', ProductCard)
// etc...
