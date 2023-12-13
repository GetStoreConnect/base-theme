import { attachElementTemplate } from '/javascripts/system/elements'

export default class Button extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const element = attachElementTemplate(this, 'sc-button')
  }
}
