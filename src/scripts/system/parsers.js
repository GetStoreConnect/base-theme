import TEST_DATA from '/dummy_data.json'
import { Liquid } from 'liquidjs'

const parser = new DOMParser()
const engine = new Liquid({ globals: TEST_DATA, root: '/src' })

export async function parseLiquid(textLiquid, props = TEST_DATA) {
  return await engine.parseAndRender(textLiquid, props)
}

export async function parseLiquidDOM(textHTML, props = TEST_DATA) {
  const textHtml = await engine.parseAndRender(textHTML, props)
  return parser.parseFromString(textHtml, 'text/html')
}
