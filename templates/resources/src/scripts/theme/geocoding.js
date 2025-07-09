// The Geocoding API converts between addresses and geographic
// coordinates. There does not appear to be a more reasonable
// way to check if the API is enabled at present.
export async function tryGeocoder(onSuccess, onError) {
  const maps = await google.maps.importLibrary('maps')
  const places = await google.maps.importLibrary('places')

  new google.maps.Geocoder().geocode(
    {
      address: '123 Test Address',
    },
    (_results, status) => {
      switch (status) {
        case google.maps.GeocoderStatus.REQUEST_DENIED:
          onError()
          break
        default:
          onSuccess()
      }
    }
  )
}

export async function getLocationFromAddress(address, onSuccess) {
  const data = await new google.maps.Geocoder().geocode({ address })

  onSuccess({
    formattedAddress: data.results[0].formatted_address,
    latLng: {
      lat: data.results[0].geometry.location.lat(),
      lng: data.results[0].geometry.location.lng(),
    },
  })
}

export async function getAddressFromCoords(coords = null, onSuccess) {
  if (coords === null) return

  const data = await new google.maps.Geocoder().geocode({ location: coords })
  const address = getAddressFromLocationData(data)

  onSuccess(address)
}

function getAddressFromLocationData(data) {
  if (!data) return

  const location = data.results.find((d) => d.types.length == 1 && d.types.includes('postal_code'))
  return location ? location.formatted_address : null
}
