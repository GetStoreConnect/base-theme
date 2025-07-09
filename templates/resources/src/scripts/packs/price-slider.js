import ionRangeSlider from '../theme/utils/rangeslider'
import { mediumAndUp } from '../theme/viewport'
import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  node.querySelectorAll('[data-js-range-slider]').forEach((element) => {
    setupPriceSlider(element)
  })
}

function setupPriceSlider(element) {
  ionRangeSlider(element, {
    onFinish: function (data) {
      const jsRangeMin = element.parentElement.querySelector('[data-js-range-min]')
      const jsRangeMax = element.parentElement.querySelector('[data-js-range-max]')

      if (jsRangeMin) {
        if (data.min !== data.from) {
          jsRangeMin.value = data.from
          jsRangeMin.setAttribute('name', 'min')
        } else {
          jsRangeMin.value = ''
          jsRangeMin.removeAttribute('name')
        }
      }

      if (jsRangeMax) {
        if (data.max !== data.to) {
          jsRangeMax.value = data.to
          jsRangeMax.setAttribute('name', 'max')
        } else {
          jsRangeMax.value = ''
          jsRangeMax.removeAttribute('name')
        }
      }

      if (!mediumAndUp()) {
        return
      }
      const form = element.closest('form')
      if (form) {
        form.submit()
      }
    },
  })
}
