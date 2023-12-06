import BaseCard from "/elements/shared/base-card"
import ProductCard from "/elements/products/product-card"
import ProductList from "/elements/products/product-list"

// Clients must manually define all custom elements
// used on a given page, including those used inside
// other custom elements.
customElements.define('sc-card', BaseCard)
customElements.define('sc-product-card', ProductCard)
customElements.define('sc-product-list', ProductList)

// Clients can add custom page JS here
// NOTE: This file should run through a build step
