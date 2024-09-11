export function setContainerToWindowHeight(container) {
  const header = document.getElementById('SC-Header')
  const offset = header.offsetHeight

  container.style.height = `calc(100vh - ${ offset }px)`
}
