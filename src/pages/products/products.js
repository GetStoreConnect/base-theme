import { fetchAndParseTemplates } from '/src/scripts/system/templates'

import '/src/components/base-tag/base-tag'
import '/src/components/brand/brand'
import '/src/components/button/button'
import '/src/components/input/input'
import '/src/components/navigation/navigation'
// import '/src/components/top-bar/top-bar'
import '/src/components/placeholder/placeholder'
import '/src/components/product-card/product-card'
import '/src/components/product-list/product-list'
import '/src/components/search-form/search-form'
import '/src/components/user-navigation/user-navigation'
import '/src/components/footer/footer'
import '/src/components/icon/icon'
import '/src/components/product-points/product-points'
import '/src/components/base-card/base-card'
import '/src/components/range-slider/range-slider'

fetchAndParseTemplates((templates) => {
  templates.forEach((template) => document.head.appendChild(template))
})
