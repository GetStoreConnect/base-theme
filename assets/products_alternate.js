import CardElement from "/elements/shared/card"
import ProductCardElement from "/elements/products/product-card"
import ProductListElement from "/elements/products/product-list"

// Clients must manually define all custom elements
// used on a given page, including those used inside
// other custom elements.
customElements.define('sc-card', CardElement)
customElements.define('sc-product-card', ProductCardElement)
customElements.define('sc-product-list', ProductListElement)

// Clients can add custom page JS here
// NOTE: This file should run through a build step
