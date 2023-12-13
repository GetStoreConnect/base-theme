import { fetchAndParseTemplates, appendTemplatesToDOM } from "./system/templates"
import { setupTheme } from "./system/theme"

import ProductCard from "./elements/products/ProductCard"
import ProductList from "./elements/products/ProductList"

const TEMPLATES = '/templates/templates.liquid'

// Adds the theme properties to the document and
// initializes the theme builder tool.
setupTheme()

// Fetch the templates from a concatenated liquid file
fetchAndParseTemplates(TEMPLATES, templates => {
  // Add templates to the DOM so they are retrievable
  // in the custom elements classes below
  appendTemplatesToDOM(templates)

  // Define all the custom elements used on the page
  customElements.define('sc-product-card', ProductCard)
  customElements.define('sc-product-list', ProductList)

  // Client custom code goes here
  document.addEventListener('sc-product-card-clicked', (event) => {
    console.log(event.explicitOriginalTarget)
    console.log('additional custom handling of product card click')
  })
})
