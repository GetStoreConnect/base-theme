export function setLocationCardData(location, origin) {
  const directionsBtn = location.querySelector('[data-directions]')
  const directionsHref = directionsBtn.getAttribute('href')
  const originParam = `&origin=${origin.lat},${origin.lng}`
  const destParam = `&destination=${location.dataset.lat},${location.dataset.lng}`

  directionsBtn.setAttribute('href', encodeURI(directionsHref + originParam + destParam))
}

export function onClickLocationCard(location, callback) {
  location.querySelector('button').addEventListener('click', () => {
    callback()
  })
}

export function hideLocationCards() {
  getLocations().forEach((card) => card.classList.add('sc-hide'))
}

export function setFocusedLocationCard(card) {
  getLocations().forEach(defocusLocationCard)
  scrollToLocationCard(card)
  card.classList.add('sc-outline')
}

export function defocusLocationCard(card) {
  card.classList.remove('sc-outline')
}

export function scrollToLocationCard(card) {
  const container = document.querySelector('[data-locations]')
  const padding = window.getComputedStyle(container).getPropertyValue('padding-bottom')
  const posY = card.offsetTop - parseInt(padding, 10)
  const posX = card.offsetLeft - parseInt(padding, 10)

  container.scrollTop = posY
  container.scrollLeft = posX
}

export function scrollToLocationCards() {
  const container = container.querySelectorAll('[data-location]')

  container.classList.remove('sc-hide')
  container.scrollIntoView({ behavior: 'smooth' })
}

function getLocations() {
  const container = document.querySelector('[data-locations]')
  const locations = container.querySelectorAll('[data-location]')

  return locations
}
