import StoreConnectTheme from './system/theme.js'
import { fetchAndParseTemplate } from './system/templates.js'

const theme = new StoreConnectTheme()

theme.init()

fetchAndParseTemplate('/src/pages/products/products.liquid', (page) => {
  document.querySelector('main').appendChild(page)
})

// function getCSSPropsFromStyleBlock() {
//   const styleProps = style.sheet.cssRules[0].style

//   return Object.keys(styleProps)
//     .map((key) => {
//       const propertyName = styleProps[key]
//       const propertyValue = styleProps.getPropertyValue(propertyName)

//       if (customElemName === null) {
//         return { [propertyName]: propertyValue }
//       } else if (propertyName.includes(customElemName)) {
//         return { [propertyName]: propertyValue }
//       }
//     })
//     .reduce((acc, curr) => Object.assign(acc, curr), {})
// }
