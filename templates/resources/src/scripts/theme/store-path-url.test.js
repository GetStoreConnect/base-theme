import { afterEach, describe, expect, it, vi } from 'vitest'

import storePath from './store-path-url'

// The helper only reads meta tags, so a tiny stub of document.querySelector
// keyed by meta name is enough — no DOM environment needed.
function stubMetaTags(tags) {
  vi.stubGlobal('document', {
    querySelector(selector) {
      const name = selector.match(/name="([^"]+)"/)[1]
      return name in tags ? { content: tags[name] } : null
    },
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('store-path-url', () => {
  it('renames a built-in segment to the store word when the map has it', () => {
    stubMetaTags({
      'sc-path': 'eu',
      'sc-route-segments': '{"cart":"panier"}',
      'sc-route-positions': '{"cart":{}}',
    })

    expect(storePath('/cart')).toBe('/eu/panier')
  })

  it('renames each configured segment along a deeper path', () => {
    stubMetaTags({
      'sc-path': 'eu',
      'sc-route-segments': '{"account":"compte","orders":"commandes"}',
      'sc-route-positions': '{"account":{"orders":{}}}',
    })

    expect(storePath('/account/orders')).toBe('/eu/compte/commandes')
  })

  it('does not rename a value that happens to equal a renamed word', () => {
    // A product whose slug is `cart` in a store that renamed `cart` to `panier`.
    // `cart` sits at the dynamic position under `products`, so it must be left
    // alone — the server would not translate `/products/panier` back.
    stubMetaTags({
      'sc-path': 'eu',
      'sc-route-segments': '{"cart":"panier"}',
      'sc-route-positions': '{"products":{"*":{}},"cart":{}}',
    })

    expect(storePath('/products/cart')).toBe('/eu/products/cart')
    // The real cart segment, at its own position, is still renamed.
    expect(storePath('/cart')).toBe('/eu/panier')
  })

  it('returns the path unchanged when the route-segments tag is absent', () => {
    stubMetaTags({ 'sc-path': 'eu' })

    expect(storePath('/cart')).toBe('/eu/cart')
  })

  it('returns the path unchanged when the route-positions tag is absent', () => {
    // Without the position table the helper cannot tell a real segment from a
    // matching slug, so it must not swap at all and falls back to the built-in
    // path (which still serves while the former path is kept).
    stubMetaTags({ 'sc-path': 'eu', 'sc-route-segments': '{"cart":"panier"}' })

    expect(storePath('/cart')).toBe('/eu/cart')
  })

  it('returns the path unchanged when the route-segments tag is empty', () => {
    // The json Liquid filter rescues to "" on error, so an empty content
    // attribute is reachable and must leave the built-in path in force.
    stubMetaTags({ 'sc-path': 'eu', 'sc-route-segments': '' })

    expect(storePath('/cart')).toBe('/eu/cart')
  })

  it('returns the path unchanged when the route-segments tag is not valid JSON', () => {
    stubMetaTags({ 'sc-path': 'eu', 'sc-route-segments': '{not json' })

    expect(storePath('/cart')).toBe('/eu/cart')
  })

  it('returns the path unchanged when a tag is valid JSON but not an object', () => {
    // An overriding theme could emit a non-object payload (null, a number, an
    // array). JSON.parse succeeds, so the object guard must catch it before the
    // lookups throw on the payment path.
    stubMetaTags({
      'sc-path': 'eu',
      'sc-route-segments': '{"cart":"panier"}',
      'sc-route-positions': 'null',
    })

    expect(storePath('/cart')).toBe('/eu/cart')
  })

  it('leaves segments with no rename untouched', () => {
    stubMetaTags({
      'sc-path': 'eu',
      'sc-route-segments': '{"cart":"panier"}',
      'sc-route-positions': '{"async":{"custom_form_answers":{"*":{}}}}',
    })

    expect(storePath('/async/custom_form_answers/123')).toBe('/eu/async/custom_form_answers/123')
  })

  it('rewrites a renamed final segment that carries a query string and keeps the suffix', () => {
    stubMetaTags({
      'sc-path': 'eu',
      'sc-route-segments': '{"cart":"panier"}',
      'sc-route-positions': '{"cart":{}}',
    })

    expect(storePath('/cart?step=1')).toBe('/eu/panier?step=1')
  })

  it('applies renames even when there is no store path', () => {
    stubMetaTags({
      'sc-route-segments': '{"cart":"panier"}',
      'sc-route-positions': '{"cart":{}}',
    })

    expect(storePath('/cart')).toBe('/panier')
  })
})
