import StoreConnectTheme from './system/theme.js'

const theme = new StoreConnectTheme()

theme.init()

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
