import { parseLiquidDOM } from './parser.js'

const END_POINT = '/templates.liquid'

export default async function setupTemplates(onSuccess) {
  const response = await fetch(END_POINT)
  const textHTML = await response.text()
  const document = await parseLiquidDOM(textHTML)
  const templates = document.querySelectorAll('template')

  addTemplatesToDOM(templates)
  onSuccess(templates)
}

function addTemplatesToDOM(templates = []) {
  templates.forEach(template => {
    document.head.appendChild(template)
  })
}

// export async function fetchTemplate(url) {
//   const range = document.createRange()
//   const response = await fetch(url)
//   const textLiquid = await response.text()
//   const textHTML = await parseLiquid(textLiquid)

//   return range.createContextualFragment(textHTML)
// }
