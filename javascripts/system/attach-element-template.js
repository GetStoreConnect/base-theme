export default function attachElementTemplate(element, id) {
  const shadow = element.attachShadow({ mode: 'open' })
  const template = document.querySelector('template#' + id)

  shadow.appendChild(template.content.cloneNode(true))
  return shadow
}
