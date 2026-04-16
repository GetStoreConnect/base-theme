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
  const jsRangeMin = element.parentElement.querySelector('[data-js-range-min]')
  const jsRangeMax = element.parentElement.querySelector('[data-js-range-max]')
  // Capture the original names (e.g. "filters[price][min]") before onFinish can mutate
  // them via removeAttribute. Stored in the closure so every callback invocation reuses
  // the correct nested param name instead of a bare "min"/"max".
  const minName = jsRangeMin?.name
  const maxName = jsRangeMax?.name

  ionRangeSlider(element, {
    onFinish: function (data) {
      if (jsRangeMin) {
        if (data.min !== data.from) {
          jsRangeMin.value = data.from
          jsRangeMin.setAttribute('name', minName) // restore nested name so form submits ?filters[price][min]=…
        } else {
          jsRangeMin.value = ''
          jsRangeMin.removeAttribute('name') // omit param when slider is at its default min
        }
      }

      if (jsRangeMax) {
        if (data.max !== data.to) {
          jsRangeMax.value = data.to
          jsRangeMax.setAttribute('name', maxName) // restore nested name so form submits ?filters[price][max]=…
        } else {
          jsRangeMax.value = ''
          jsRangeMax.removeAttribute('name') // omit param when slider is at its default max
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
