export function attachElemTemplate(element, selector) {
  const template = document.querySelector(selector)

  if (template === undefined) console.error('Template not found')
  else element.renderRoot.appendChild(template.content.cloneNode(true))
}

export function defineCustomElem(name, element) {
  document.addEventListener('sc-templates-ready', () => {
    customElements.define(name, element)
  })
}

// Searches through nodes, finds custom elements and
// initalises them. Some performance testing needed.
// Alternately, we require users to manually define
// all custom elements used on a given page.
// export default function setupElements(node = document.body) {
//   ;[...getUniqCustomElements(node)].forEach((name) => {
//     if (customElements.get(name) === undefined) {
//       // Define the custom element
//       customElements.define(name, elements[name])
//       // Search through the shadow DOM and initialise child
//       // custom elements using recursion
//       setupElements(node.querySelector(name).shadowRoot)
//     }
//   })
// }
// function getUniqCustomElements(node = null) {
//   if (node === null) return []
//   return new Set(
//     // Selects all DOM nodes
//     [...node.querySelectorAll('*')]
//       // Filters only elements prefixed with 'sc-'
//       .filter((elem) => isPrefixed(elem))
//       // Returns an array of tag names
//       .map((elem) => elem.tagName.toLowerCase())
//   )
// }
// function isPrefixed(elem) {
//   return elem.tagName.toLowerCase().substring(0, 3) === 'sc-'
// }
