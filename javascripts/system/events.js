export function dispatchEvent(element, name) {
  const event = new Event(name, {
    bubbles: true,
    composed: true, // Allows event to bubble through shadow DOM
    cancelable: true,
  })

  element.dispatchEvent(event)
}
