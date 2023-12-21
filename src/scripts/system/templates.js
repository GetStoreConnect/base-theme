import { parseLiquid, parseLiquidDOM } from './parsers.js'

const ENDPOINT = '/src/components/templates.liquid'

export async function fetchAndParseTemplates(onSuccess) {
  const response = await fetch(ENDPOINT)
  const textLiquid = await response.text()
  const liquidDOM = await parseLiquidDOM(textLiquid)
  const templates = liquidDOM.querySelectorAll('template')

  document.dispatchEvent(
    new Event('sc-templates-ready', {
      bubbles: true,
      composed: true, // Bubble through shadow DOM
      cancelable: true,
    })
  )
  onSuccess(templates)
}

export async function fetchAndParseTemplate(url, onSuccess) {
  const range = document.createRange()
  const response = await fetch(url)
  const textLiquid = await response.text()
  const textHTML = await parseLiquid(textLiquid)

  onSuccess(range.createContextualFragment(textHTML))
}
