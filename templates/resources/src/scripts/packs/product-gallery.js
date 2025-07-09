import 'hammerjs'

window.StoreConnectUI = window.StoreConnectUI || {}

window.StoreConnectUI.ProductGallery = (function () {
  let isZoomed = false,
    lastPosX = 0,
    lastPosY = 0,
    hammer

  const drag = (e, styleProps) => {
    const x = e.deltaX + lastPosX,
      y = e.deltaY + lastPosY

    // Release the drag
    if (e.isFinal) {
      e.target.classList.remove('is-dragging')
      e.target.setAttribute('style', styleProps)
      return
    }

    // Move image position with cursor/touch position
    e.target.classList.add('is-dragging')
    e.target.setAttribute(
      'style',
      'transition: none;' +
        'transform: translateX(calc(-50% + ' +
        x +
        'px)) translateY(calc(-50% + ' +
        y +
        'px));'
    )
  }

  function init(imageUrl) {
    const image = document.querySelector('[data-product-gallery-image]')
    const closeButton = document.querySelector('[data-product-gallery-close]')
    const viewportProps = document.querySelector('meta[name=viewport]').getAttribute('content')

    hammer = new Hammer(image)

    // Show the gallery modal and disable scrolling and viewport zooming
    document.querySelector('[data-product-gallery]').classList.add('is-active')
    document.querySelector('body').classList.add('is-not-scrollable')
    document
      .querySelector('meta[name=viewport]')
      .setAttribute('content', `${viewportProps}, user-scalable=0`)
    // Load the 'huge' image size
    image.setAttribute('src', imageUrl)
    // The modal can be closed by swiping down or clicking the close button
    closeButton.addEventListener('click', close)
    // Toggle zoom mode on click
    image.addEventListener('click', toggleZoom)
  }

  function close() {
    // Reset zoom, close the gallery modal, and restore <body> scrolling
    exitZoom()
    document.querySelector('[data-product-gallery]').classList.remove('is-active')
    document.querySelector('body').classList.remove('is-not-scrollable')
  }

  function enterZoom() {
    const image = document.querySelector('[data-product-gallery-image'),
      imageStyleProps = image.getAttribute('style')

    isZoomed = true
    hammer.on('pan', (e) => drag(e, imageStyleProps))
    image.classList.add('is-zoomed')
  }

  function exitZoom() {
    isZoomed = false
    hammer.off('pan')
    document.querySelector('[data-product-gallery-image').classList.remove('is-zoomed')
  }

  function toggleZoom() {
    isZoomed ? exitZoom() : enterZoom()
  }

  return {
    init: (imageUrl) => init(imageUrl),
  }
})()
