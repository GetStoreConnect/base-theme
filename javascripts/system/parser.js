import TEST_DATA from '/data.json'

const parser = new DOMParser()
const engine = new window.liquidjs.Liquid({
  globals: TEST_DATA,
  root: '/templates'
})

export async function parseLiquid(textLiquid) {
  return await engine.parseAndRender(textLiquid)
}

export async function parseLiquidDOM(textHTML, props = TEST_DATA) {
  const textHtml = await engine.parseAndRender(textHTML, props)
  return parser.parseFromString(textHtml,'text/html')
}
