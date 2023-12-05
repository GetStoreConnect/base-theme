export default class AccordionElement extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    const template = document.querySelector('template#sc-accordion')
    const clone = template.content.cloneNode(true)

    clone.querySelector('button').addEventListener('click', this.handleClick)

    shadow.appendChild(clone)
  }

  handleClick() {
    const body = this.parentNode.querySelector('div')

    if (body.getAttribute('aria-hidden') === 'true') {
      body.setAttribute('aria-hidden', 'false')
      body.style.display = 'block'
    } else {
      body.setAttribute('aria-hidden', 'true')
      body.style.display = 'none'
    }
  }
}
