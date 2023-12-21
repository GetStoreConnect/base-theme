import { LitElement, html, css } from 'lit-element'

class RangeSlider extends LitElement {
  static get properties() {
    return {
      min: { type: Number },
      max: { type: Number },
      step: { type: Number },
      value: { type: Number },
    }
  }

  constructor() {
    super()
    this.min = 0
    this.max = 100
    this.value = 0
    this._actualMin = this.min
    this._actualMax = this.max
    this._input = {}
    this._slider = {}
    this._thumb = {}
  }

  async firstUpdated() {
    this._input = this.shadowRoot.querySelector('input')
    this._slider = this.shadowRoot.querySelector('.range-slider')
    this._thumb = this.shadowRoot.querySelector('.range-thumb')
    this._actualMin = this.min
    this._actualMax = this.max

    if (this.step) {
      const minRemainder = this.min % this.step
      const maxRemainder = this.max % this.step

      // The behavior of HTML input[type=range] does not allow the slider to be
      // moved to the min/max values if those properties are not multiples of the
      // step property.
      // To be able to move the slider to the min/max values:
      // Set the min to the closest multiple of step lower than the min value provided.
      if (minRemainder !== 0) {
        this.min = this.min - minRemainder
      }

      // Set the max to the closest multiple of step higher than the max value provided.
      if (maxRemainder !== 0) {
        this.max = this.max + this.step - maxRemainder
      }
    }
  }

  updated(changedProps) {
    if (changedProps.has('value')) {
      this._updateSlider()
    }
  }

  static styles = css`
    :host {
      --slider-background: #767676;
      --slider-height: 2px;
      --slider-radius: var(--slider-height);
      --slider-value-color: #ff6200;
      --slider-value-width: 0;
      --thumb-color: #adadad;
      --thumb-diameter: 15px;
      --thumb-offset: 0;

      display: inline-block;
    }

    .range-container {
      position: relative;
      width: 100%;
    }

    .range-slider,
    .range-slider-value {
      border-radius: var(--slider-radius);
      height: var(--slider-height);
      max-height: var(--thumb-diameter);
      position: absolute;
      top: calc(
        (
            var(--thumb-diameter) -
              min(var(--slider-height), var(--thumb-diameter))
          ) / 2
      );
    }

    .range-slider {
      background: var(--slider-background);
      width: 100%;
    }

    .range-slider-value {
      background: var(--slider-value-color);
      width: var(--slider-value-width);
    }

    .range-thumb {
      background: var(--thumb-color);
      border-radius: 50%;
      height: var(--thumb-diameter);
      position: absolute;
      transform: translateX(var(--thumb-offset));
      width: var(--thumb-diameter);
    }

    input {
      display: inline-block;
      height: var(--thumb-diameter);
      margin: 0;
      opacity: 0;
      position: relative;
      width: 100%;
    }

    :host([disabled]) {
      --slider-background: #d9d9d9;
      --slider-value-color: #a8a8a8;
      --thumb-color: #f0f0f0;
    }
  `

  render() {
    return html`
      <div class="range-container">
        <div class="range-slider"></div>
        <div class="range-slider-value"></div>
        <div class="range-thumb"></div>
        <input
          max=${this.max}
          min=${this.min}
          step=${this.step}
          type="range"
          value=${this.value}
          ?disabled=${this.disabled}
          @input=${this._changeHandler}
        />
      </div>
    `
  }

  /**
   * Sets the slider value.
   */
  _changeHandler() {
    const { value } = this._input

    this.value =
      value > this._actualMax
        ? this._actualMax
        : value < this._actualMin
        ? this._actualMin
        : value
  }

  /**
   * Updates the slider's value width and thumb position (UI).
   * @event change
   */
  _updateSlider() {
    const min = this.min < this._actualMin ? this._actualMin : this.min
    const max = this.max > this._actualMax ? this._actualMax : this.max
    const percentage = (this.value - min) / (max - min)
    const thumbWidth = this._thumb.offsetWidth
    const sliderWidth = this._slider.offsetWidth
    const sliderValueWidth = `${percentage * 100}%`
    const thumbOffset = `${(sliderWidth - thumbWidth) * percentage}px`

    this.style.setProperty('--slider-value-width', sliderValueWidth)
    this.style.setProperty('--thumb-offset', thumbOffset)

    // Dispatch the change event for range-slider. (For event handlers.)
    this.dispatchEvent(new Event('change'))
  }
}

customElements.define('sc-range-slider', RangeSlider)
