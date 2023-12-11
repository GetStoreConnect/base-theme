import setupTemplates from "./system/setup-templates"
import setupTheme from "./system/setup-theme"

// All elements used on the page must be imported here.
import ProductCardElement from "./elements/products/product-card"
import ProductListElement from "./elements/products/product-list"

// Adds the theme properties to the document and
// initializes the theme builder tool.
setupTheme()

// Fetches the templates from a concatentaed liquid file
// and adds them to the document.
setupTemplates(_templates => {
  // In this alternate page js clients must manually define all
  // custom elements used on a given page, including those used
  // inside other custom elements.
  customElements.define('sc-product-card', ProductCardElement)
  customElements.define('sc-product-list', ProductListElement)
})
