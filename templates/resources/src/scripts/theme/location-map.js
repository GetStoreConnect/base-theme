import { getHSLFromCSSColor } from './utils/color'

let map
let markers = []
let nearMarker = null

export async function createMap(latLng, onMapLoaded) {
  const container = document.querySelector('[data-location-map]')
  const { Map } = await google.maps.importLibrary('maps')

  map = new Map(container, {
    zoom: 14,
    center: latLng,
    disableDefaultUI: true,
    zoomControl: true,
  })
  onMapLoaded(map)
}

export function createLocationMarker(latLng) {
  const marker = new google.maps.Marker({
    map,
    position: new google.maps.LatLng(latLng),
    icon: getRestingLocationIcon(),
  })

  markers.push(marker)
  return marker
}

export function onClickMarker(marker, callback) {
  google.maps.event.addListener(marker, 'click', () => {
    callback(marker)
  })
}

export function setNearBeacon(latLng = null) {
  if (latLng === null) return

  const position = new google.maps.LatLng(latLng)

  nearMarker ? nearMarker.setPosition(position) : (nearMarker = createNearMarker(position))
  map.panTo(position)
}

export function setFocusedMarker(marker = null) {
  if (marker === null) return
  const restingIcon = getRestingLocationIcon()
  const focusedIcon = getFocusedLocationIcon()
  const lat = marker.getPosition().lat()
  const lng = marker.getPosition().lng()
  const position = new google.maps.LatLng({ lat, lng })

  markers.forEach((m) => m.setIcon(restingIcon))
  marker.setIcon(focusedIcon)
  map.panTo(position)
}

export function setZoomForSingleResult(bounds) {
  if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
    const extendPoint1 = new google.maps.LatLng(
      bounds.getNorthEast().lat() + 0.01,
      bounds.getNorthEast().lng() + 0.01
    )
    const extendPoint2 = new google.maps.LatLng(
      bounds.getNorthEast().lat() - 0.01,
      bounds.getNorthEast().lng() - 0.01
    )

    bounds.extend(extendPoint1)
    bounds.extend(extendPoint2)
  }
}

export function getMapMarkerByLatLng(latLng) {
  return markers.find((marker) => marker.getPosition().equals(latLng))
}

export function clearLocationMarkers() {
  markers.forEach((marker) => marker.setMap(null))
  markers = []
}

function getFocusedLocationIcon(size = 50) {
  const color = getThemeColor()
  return {
    anchor: new google.maps.Point(size / 2, size),
    url: `data:image/svg+xml;utf-8,\
      <svg width="${size}" height="${size}" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">\
        <path fill="hsl(${color.h},${color.s}%,${color.l}%)" d="M15.4936516,0 C9.21222402,0 5.94476278,5 6.00070647,10 C6.07764653,17.2779762 13.1207067,20 15.4936516,30 C17.8690441,20 25,17.1196429 25,10 C25,5 21.3136604,0 15.4971481,0"></path>\
        <path fill="hsl(${color.h},${color.s}%,${color.l - 10}%)" d="M15.5,6.4 C17.4326394,6.4 19,7.96699298 19,9.9 C19,11.8326394 17.433007,13.4 15.5,13.4 C13.5673606,13.4 12,11.833007 12,9.9 C12,7.96736062 13.566993,6.4 15.5,6.4"></path>\
      </svg>`,
  }
}

function getRestingLocationIcon(size = 40) {
  const color = getThemeColor()
  return {
    anchor: new google.maps.Point(size / 2, size),
    url: `data:image/svg+xml;utf-8,\
      <svg width="${size}" height="${size}" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">\
        <path fill="hsl(${color.h},${color.s}%,${color.l + 20}%)" d="M15.4936516,0 C9.21222402,0 5.94476278,5 6.00070647,10 C6.07764653,17.2779762 13.1207067,20 15.4936516,30 C17.8690441,20 25,17.1196429 25,10 C25,5 21.3136604,0 15.4971481,0"></path>\
        <path fill="hsl(${color.h},${color.s}%,${color.l + 10}%)" d="M15.5,6.4 C17.4326394,6.4 19,7.96699298 19,9.9 C19,11.8326394 17.433007,13.4 15.5,13.4 C13.5673606,13.4 12,11.833007 12,9.9 C12,7.96736062 13.566993,6.4 15.5,6.4"></path>\
      </svg>`,
  }
}

function createNearMarker(position) {
  return new google.maps.Marker({
    map,
    position,
    icon: {
      anchor: new google.maps.Point(15, 15),
      url: `data:image/svg+xml;utf-8, \
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"> \
        <path fill="hsla(217, 89%, 61%, 30%)" d="M15,0 C23.2827403,0 30,6.7156842 30,15 C30,23.2827403 23.2843157,30 15,30 C6.71725971,30 0,23.2843157 0,15 C0,6.7172598 6.71568429,0 15,0"></path>\
        <path fill="hsl(0,0%,100%)" d="M15,7 C19.4174615,7 23,10.5816982 23,15 C23,19.4174615 19.4183017,23 15,23 C10.5825385,23 7,19.4183017 7,15 C7,10.5825386 10.5816983,7 15,7"></path>\
        <path fill="hsl(217, 89%, 61%)" d="M15,9 C18.3130961,9 21,11.6862737 21,15 C21,18.3130961 18.3137263,21 15,21 C11.6869039,21 9,18.3137263 9,15 C9,11.6869039 11.6862737,9 15,9"></path>\
      </svg>`,
    },
  })
}

function getThemeColor() {
  const container = document.querySelector('[data-location-map]')
  return getHSLFromCSSColor(container) || { h: 212, s: 100, l: 50 }
}
