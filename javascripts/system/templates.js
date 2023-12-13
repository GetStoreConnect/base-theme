import { parseLiquid, parseLiquidDOM } from './parser'

export async function fetchAndParseTemplates(url, onSuccess) {
  const response = await fetch(url)
  const textLiquid = await response.text()
  const document = await parseLiquidDOM(textLiquid)
  const templates = document.querySelectorAll('template')

  onSuccess(templates)
}

export async function fetchAndParseTemplate(url, onSuccess) {
  const range = document.createRange()
  const response = await fetch(url)
  const textLiquid = await response.text()
  const textHTML = await parseLiquid(textLiquid)

  onSuccess(range.createContextualFragment(textHTML))
}

export function appendTemplatesToDOM(templates = []) {
  templates.forEach(template => {
    document.head.appendChild(template)
  })
}
