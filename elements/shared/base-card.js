import { initShadowDOM } from "/assets/system/elements"

export default class BaseCard extends HTMLElement {
  constructor() {
    super()
    this.id = 'sc-card'
  }

  connectedCallback() {
    const element = initShadowDOM(this)
  }
}
