// NOTE:
// This file is not being used currently.
// Instead, we're using vite-plugin-liquidjs
// to parse liquid templates

import DUMMY_DATA from '../dummy_data.json'

const parser = new DOMParser()
const engine = new window.liquidjs.Liquid()

export async function fetchAndParseTemplates(url, onSuccess) {
  const response = await fetch(url)
  const textHTML = await response.text()
  const document = await parseLiquid(textHTML)

  onSuccess(document.querySelectorAll('template'))
}

async function parseLiquid(textHTML, props = DUMMY_DATA) {
  const textHtml = await engine.parseAndRender(textHTML, props)

  return parser.parseFromString(textHtml,'text/html')
}

export function appendTemplateToDOM(template) {
  document.querySelector('head').appendChild(template)
}

export default {
  fetchAndParseTemplates,
  appendTemplateToDOM,
}
