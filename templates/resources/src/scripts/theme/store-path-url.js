// Builds a request path in the words this store publishes: each built-in
// segment the store has renamed is swapped for the client's custom word, then
// the store path is prefixed as it always has been.
//
// The store emits two meta tags. sc-route-segments is the rename map, keyed by
// the built-in segment with the custom word as its value. sc-route-positions is
// the shape of the storefront routes as a trie: real segments are keys, and
// every dynamic position (a product slug, a category path, an order reference)
// is the single ANY key. A word is swapped only where the trie says a real
// segment sits, never at a value position — so a product whose slug happens to
// equal a renamed word (`/products/cart` in a store that renamed `cart`) is
// left alone, exactly as the server's translator leaves it. Walking the trie
// this way is the whole reason a blind segment-by-segment swap is not enough.
//
// When either tag is absent or malformed the path is returned unchanged, which
// falls back to the built-in path — safe while the former path still serves.

// ANY position marker; must match RouteSegments::PUBLISHED_ANY on the server.
const ANY = '*'

function readMap(name) {
  const meta = document.querySelector(`meta[name="${name}"]`)

  if (!meta || !meta.content) {
    return null
  }

  let value
  try {
    value = JSON.parse(meta.content)
  } catch {
    return null
  }

  // The tag sits in the theme layout, which a client theme can override, so the
  // content is not fully under our control: valid JSON that is null, a number, or
  // an array would make the hasOwnProperty lookups below throw. Only a plain
  // object is usable; anything else falls back to the built-in path.
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  return value
}

function has(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

function renameSegments(url) {
  const map = readMap('sc-route-segments')
  if (!map || Object.keys(map).length === 0) {
    return url
  }

  // Without the position table we cannot tell a real segment from a value, so a
  // swap could rewrite a slug the server would not translate back. Don't guess:
  // leave the built-in path in force.
  const positions = readMap('sc-route-positions')
  if (!positions) {
    return url
  }

  // Split off any query string or fragment first: without this a final segment
  // carrying one (`/cart?step=1`) never matches and keeps the built-in word.
  const end = url.search(/[?#]/)
  const path = end === -1 ? url : url.slice(0, end)
  const suffix = end === -1 ? '' : url.slice(end)

  // Walk the path from the root of the trie, left to right, the same way the
  // server does. A segment is renamed only when the map has it AND the node the
  // walk has reached holds it as a real segment; otherwise we descend to the
  // matching real child, or to the ANY position, and leave the segment as it is.
  // Once neither child exists the path has left the shape of every storefront
  // route and the rest of it is values, so nothing more is touched.
  let node = positions

  const renamed = path.split('/').map((segment) => {
    // An empty part is the leading slash or a doubled/trailing one. It fills no
    // position; reading it as one would shift every segment behind it along.
    if (segment === '' || node === null) {
      return segment
    }

    if (has(map, segment) && has(node, segment)) {
      node = node[segment]
      return map[segment]
    }

    node = has(node, segment) ? node[segment] : has(node, ANY) ? node[ANY] : null
    return segment
  })

  return renamed.join('/') + suffix
}

export default function (url) {
  const renamed = renameSegments(url)
  const storePath = document.querySelector('meta[name="sc-path"]')

  if (storePath) {
    const storePathContent = storePath.content

    if (storePathContent) {
      return `/${storePathContent}${renamed}`
    }
  }
  return renamed
}
