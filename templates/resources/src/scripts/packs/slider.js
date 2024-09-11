import { tns } from "tiny-slider/src/tiny-slider"
import { onDomChange } from '../theme/utils/init';

onDomChange(init);

const DEFAULT_PARAMS = {
  autoplay: true,
  autoplayHoverPause: true,
  autoplayButtonOutput: false,
  arrowKeys: true,
  autoHeight: true,
  center: true,
  controlsText: ['', '']
}

let slideshows = []

function init(node) {
  [...node.querySelectorAll('[data-slideshow]:not([data-initialized])')].forEach(slideshowEl => {
    slideshowEl.setAttribute('data-initialized', true)
    const container = {container: '[data-slideshow=' + slideshowEl.getAttribute('data-slideshow') + ']'}
    const slideshow = tns({...DEFAULT_PARAMS, ...container})

    let resizeId

    slideshows.push(slideshowEl)
    window.addEventListener('resize', () => {
      clearTimeout(resizeId)
      resizeId = setTimeout(() => slideshow.updateSliderHeight(), 300)
    })
  })
}
