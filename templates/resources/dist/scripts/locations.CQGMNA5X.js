(() => {
  // src/scripts/theme/utils/color.js
  function getHSLFromCSSColor(element) {
    return RGBToHSL(getComputedStyle(element).color);
  }
  function RGBToHSL(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
    for (let R in rgb) {
      let r2 = rgb[R];
      if (r2.indexOf("%") > -1) rgb[R] = Math.round(r2.substr(0, r2.length - 1) / 100 * 255);
    }
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r) h = (g - b) / delta % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return { h, s, l };
  }

  // src/scripts/theme/location-map.js
  var map;
  var markers = [];
  var nearMarker = null;
  async function createMap(latLng, onMapLoaded) {
    const container3 = document.querySelector("[data-location-map]");
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(container3, {
      zoom: 14,
      center: latLng,
      disableDefaultUI: true,
      zoomControl: true
    });
    onMapLoaded(map);
  }
  function createLocationMarker(latLng) {
    const marker = new google.maps.Marker({
      map,
      position: new google.maps.LatLng(latLng),
      icon: getRestingLocationIcon()
    });
    markers.push(marker);
    return marker;
  }
  function onClickMarker(marker, callback) {
    google.maps.event.addListener(marker, "click", () => {
      callback(marker);
    });
  }
  function setNearBeacon(latLng = null) {
    if (latLng === null) return;
    const position = new google.maps.LatLng(latLng);
    nearMarker ? nearMarker.setPosition(position) : nearMarker = createNearMarker(position);
    console.log(position);
    map.panTo(position);
  }
  function setFocusedMarker(marker = null) {
    if (marker === null) return;
    const restingIcon = getRestingLocationIcon();
    const focusedIcon = getFocusedLocationIcon();
    const lat = marker.getPosition().lat();
    const lng = marker.getPosition().lng();
    const position = new google.maps.LatLng({ lat, lng });
    markers.forEach((m) => m.setIcon(restingIcon));
    marker.setIcon(focusedIcon);
    map.panTo(position);
  }
  function setZoomForSingleResult(bounds) {
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      const extendPoint1 = new google.maps.LatLng(
        bounds.getNorthEast().lat() + 0.01,
        bounds.getNorthEast().lng() + 0.01
      );
      const extendPoint2 = new google.maps.LatLng(
        bounds.getNorthEast().lat() - 0.01,
        bounds.getNorthEast().lng() - 0.01
      );
      bounds.extend(extendPoint1);
      bounds.extend(extendPoint2);
    }
  }
  function clearLocationMarkers() {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
  }
  function getFocusedLocationIcon(size = 50) {
    const color = getThemeColor();
    return {
      anchor: new google.maps.Point(size / 2, size),
      url: `data:image/svg+xml;utf-8,      <svg width="${size}" height="${size}" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">        <path fill="hsl(${color.h},${color.s}%,${color.l}%)" d="M15.4936516,0 C9.21222402,0 5.94476278,5 6.00070647,10 C6.07764653,17.2779762 13.1207067,20 15.4936516,30 C17.8690441,20 25,17.1196429 25,10 C25,5 21.3136604,0 15.4971481,0"></path>        <path fill="hsl(${color.h},${color.s}%,${color.l - 10}%)" d="M15.5,6.4 C17.4326394,6.4 19,7.96699298 19,9.9 C19,11.8326394 17.433007,13.4 15.5,13.4 C13.5673606,13.4 12,11.833007 12,9.9 C12,7.96736062 13.566993,6.4 15.5,6.4"></path>      </svg>`
    };
  }
  function getRestingLocationIcon(size = 40) {
    const color = getThemeColor();
    return {
      anchor: new google.maps.Point(size / 2, size),
      url: `data:image/svg+xml;utf-8,      <svg width="${size}" height="${size}" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">        <path fill="hsl(${color.h},${color.s}%,${color.l + 20}%)" d="M15.4936516,0 C9.21222402,0 5.94476278,5 6.00070647,10 C6.07764653,17.2779762 13.1207067,20 15.4936516,30 C17.8690441,20 25,17.1196429 25,10 C25,5 21.3136604,0 15.4971481,0"></path>        <path fill="hsl(${color.h},${color.s}%,${color.l + 10}%)" d="M15.5,6.4 C17.4326394,6.4 19,7.96699298 19,9.9 C19,11.8326394 17.433007,13.4 15.5,13.4 C13.5673606,13.4 12,11.833007 12,9.9 C12,7.96736062 13.566993,6.4 15.5,6.4"></path>      </svg>`
    };
  }
  function createNearMarker(position) {
    return new google.maps.Marker({
      map,
      position,
      icon: {
        anchor: new google.maps.Point(15, 15),
        url: `data:image/svg+xml;utf-8,       <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">         <path fill="hsla(217, 89%, 61%, 30%)" d="M15,0 C23.2827403,0 30,6.7156842 30,15 C30,23.2827403 23.2843157,30 15,30 C6.71725971,30 0,23.2843157 0,15 C0,6.7172598 6.71568429,0 15,0"></path>        <path fill="hsl(0,0%,100%)" d="M15,7 C19.4174615,7 23,10.5816982 23,15 C23,19.4174615 19.4183017,23 15,23 C10.5825385,23 7,19.4183017 7,15 C7,10.5825386 10.5816983,7 15,7"></path>        <path fill="hsl(217, 89%, 61%)" d="M15,9 C18.3130961,9 21,11.6862737 21,15 C21,18.3130961 18.3137263,21 15,21 C11.6869039,21 9,18.3137263 9,15 C9,11.6869039 11.6862737,9 15,9"></path>      </svg>`
      }
    });
  }
  function getThemeColor() {
    const container3 = document.querySelector("[data-location-map]");
    return getHSLFromCSSColor(container3) || { h: 212, s: 100, l: 50 };
  }

  // src/scripts/theme/geocoding.js
  async function tryGeocoder(onSuccess, onError) {
    const maps = await google.maps.importLibrary("maps");
    const places = await google.maps.importLibrary("places");
    new google.maps.Geocoder().geocode(
      {
        address: "123 Test Address"
      },
      (_results, status) => {
        switch (status) {
          case google.maps.GeocoderStatus.REQUEST_DENIED:
            onError();
            break;
          default:
            onSuccess();
        }
      }
    );
  }
  async function getLocationFromAddress(address, onSuccess) {
    const data = await new google.maps.Geocoder().geocode({ address });
    onSuccess({
      formattedAddress: data.results[0].formatted_address,
      latLng: {
        lat: data.results[0].geometry.location.lat(),
        lng: data.results[0].geometry.location.lng()
      }
    });
  }
  async function getAddressFromCoords(coords = null, onSuccess) {
    if (coords === null) return;
    const data = await new google.maps.Geocoder().geocode({ location: coords });
    const address = getAddressFromLocationData(data);
    onSuccess(address);
  }
  function getAddressFromLocationData(data) {
    if (!data) return;
    const location = data.results.find((d) => d.types.length == 1 && d.types.includes("postal_code"));
    return location ? location.formatted_address : null;
  }

  // src/scripts/theme/loader.js
  function startLoader(container3, contextual = false) {
    const loader = getLoader(container3);
    if (loader) {
      activate(loader, contextual);
    } else {
      createLoader(container3, contextual);
    }
  }
  function stopLoader(container3) {
    const loader = getLoader(container3);
    if (loader === null) return;
    loader.classList.remove("is-active");
  }
  function getLoader(target) {
    const origin = target || document.querySelector("body");
    return origin.querySelector("[data-loader]");
  }
  function activate(loader, contextual = false) {
    if (loader.classList.contains("Loader")) {
      loader.classList.add("is-active");
    } else if (contextual) {
      loader.classList.add("Loader", "is-active", "is-contextual");
    } else {
      loader.classList.add("Loader", "is-active");
    }
  }
  function createLoader(target, contextual = false) {
    const loader = document.createElement("div");
    const spinner = createSpinner();
    const destination = target || document.querySelector("body");
    loader.setAttribute("data-loader", "");
    loader.classList.add("Loader", "is-active");
    if (contextual) loader.classList.add("is-contextual");
    destination.prepend(loader);
    loader.append(spinner);
  }
  function createSpinner() {
    const url = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(url, "svg");
    const circle = document.createElementNS(url, "circle");
    svg.setAttribute("viewBox", "0 0 50 50");
    svg.classList.add("spinner");
    circle.setAttribute("cx", "25");
    circle.setAttribute("cy", "25");
    circle.setAttribute("r", "20");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-width", "5");
    circle.classList.add("path");
    svg.appendChild(circle);
    return svg;
  }

  // src/scripts/theme/location-search-form.js
  var params = new URLSearchParams(window.location.search);
  var container = document.querySelector("[data-location-search-form]");
  function setupFormTemplate(template) {
    if (container === null) return;
    container.appendChild(template.content.cloneNode(true));
    return container.querySelector("form");
  }
  async function initNearAddressForm(geolocation = null) {
    const addressInput = container.querySelector("input[name=address]");
    const addressParam = params.get("address");
    setDistanceUnit();
    setFormLatLng(geolocation);
    if (addressParam) {
      setFormAddress(addressParam, true);
      handleAddressChange({ address: addressInput.value, geolocation, submit: false });
      enableFormSubmit();
    } else
      getAddressFromCoords(geolocation, (address) => {
        setFormAddress(address);
        handleAddressChange({ address: addressInput.value, geolocation, submit: false });
        enableFormSubmit();
      });
    container.querySelector("form").addEventListener("submit", () => {
      startLoader(container);
      clearLocationMarkers();
      clearLocationResults();
    });
    addressInput.addEventListener("change", (event) => {
      handleAddressChange({ address: event.target.value, geolocation, submit: true });
    });
    addressInput.addEventListener("input", (event) => {
      const address = event.target.value;
      const searched = event.target.getAttribute("searched-value");
      clearFormError();
      container.querySelector("[data-use-geoloc]").classList.add("sc-hide");
      address == searched ? enableFormSubmit() : disableFormSubmit();
    });
  }
  function initExactAreaForm() {
    const country = getCountry(container.querySelectorAll("input[name=country]"));
    const countrySelector = container.querySelector("[data-selector=country]");
    setupStateSelectors(country);
    countrySelector.addEventListener("change", (event) => {
      setupStateSelectors(event.target.value);
    });
  }
  function getCountry(countries = []) {
    return params.get("country") || countries.length === 2 ? countries[1].value : null;
  }
  function setupStateSelectors(country) {
    const stateSelectors = container.querySelectorAll("[data-selector=state]");
    const combinedSelector = container.querySelector("[data-combined-state-selector]");
    stateSelectors.forEach((selector) => {
      resetFormSelection(selector);
      if (country === null) {
        selector.style.display = "none";
        if (combinedSelector) combinedSelector.style.display = "block";
      } else if (country === selector.dataset.id) {
        selector.style.display = "block";
        if (combinedSelector) combinedSelector.style.display = "none";
      } else selector.style.display = "none";
    });
  }
  function clearLocationResults() {
    const summary = document.querySelector("[data-location-search-summary]");
    const cards = document.querySelectorAll("[data-location]");
    if (cards.length === 0) return;
    summary.innerText = summary.dataset.default;
    cards.forEach((card2) => card2.classList.add("sc-hide"));
  }
  function setFormLatLng(latLng = null) {
    if (latLng === null) return;
    container.querySelector("input[name=lat]").value = latLng.lat;
    container.querySelector("input[name=lng]").value = latLng.lng;
  }
  function setFormAddress(address) {
    container.querySelector("input[name=address]").value = address;
  }
  function handleAddressChange({ address, geolocation, submit }) {
    clearLocationMarkers();
    clearLocationResults();
    disableFormSubmit();
    if (address.length > 0) {
      startLoader(container);
      getLocationFromAddress(address, ({ latLng, formattedAddress }) => {
        setFormLatLng(latLng);
        setFormAddress(formattedAddress);
        if (submit) {
          submitForm();
        } else {
          stopLoader(container);
        }
      }).catch((error) => {
        stopLoader(container);
        setFormError();
      });
    } else if (geolocation) {
      const useGeoBtn = container.querySelector("[data-use-geoloc]");
      useGeoBtn.classList.remove("sc-hide");
      clearFormError();
      clearLocationData();
      getAddressFromCoords(geolocation, (address2) => {
        useGeoBtn.addEventListener("click", () => {
          useGeoBtn.classList.add("sc-hide");
          setFormAddress(address2);
          if (submit) {
            submitForm();
          } else {
            stopLoader(container);
          }
        });
      });
    } else setFormError();
  }
  function setDistanceUnit() {
    const unit = getDistanceUnit();
    const distUnitInput = container.querySelector("input[name=distance_unit]");
    const distUnitLabel = container.querySelector("[data-distance-unit]");
    distUnitInput.value = unit;
    distUnitLabel.innerText = getUnitLabel(unit);
  }
  function getDistanceUnit() {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    return ["en-US", "en-GB"].includes(locale) ? "imp" : "metric";
  }
  function resetFormSelection(selector) {
    const selected = selector.querySelectorAll("[data-dropdown-option]:checked");
    selected.forEach((option) => option.checked = false);
  }
  function clearLocationData() {
    container.querySelector("input[name=lat]").value = "";
    container.querySelector("input[name=lng]").value = "";
    container.querySelector("input[name=address]").value = "";
    disableFormSubmit();
  }
  function setFormError() {
    container.querySelector("[data-location-error]").classList.remove("sc-hide");
    container.querySelector("input[name=address]").classList.add("has-error");
  }
  function clearFormError() {
    container.querySelector("[data-location-error]").classList.add("sc-hide");
    container.querySelector("input[name=address]").classList.remove("has-error");
  }
  function enableFormSubmit() {
    container.querySelector("button[type=submit]").removeAttribute("disabled");
  }
  function disableFormSubmit() {
    container.querySelector("button[type=submit]").setAttribute("disabled", true);
  }
  function submitForm() {
    container.querySelector("form").submit();
  }
  function getUnitLabel(unit) {
    const form = container.querySelector("form");
    switch (unit) {
      case "imp":
        return form.getAttribute("data-distance-unit-imperial");
      case "metric":
        return form.getAttribute("data-distance-unit-metric");
    }
  }

  // src/scripts/theme/location-cards.js
  function setLocationCardData(location, origin) {
    const directionsBtn = location.querySelector("[data-directions]");
    const directionsHref = directionsBtn.getAttribute("href");
    const originParam = `&origin=${origin.lat},${origin.lng}`;
    const destParam = `&destination=${location.dataset.lat},${location.dataset.lng}`;
    directionsBtn.setAttribute("href", encodeURI(directionsHref + originParam + destParam));
  }
  function onClickLocationCard(location, callback) {
    location.querySelector("button").addEventListener("click", () => {
      callback();
    });
  }
  function setFocusedLocationCard(card2) {
    getLocations().forEach(defocusLocationCard);
    scrollToLocationCard(card2);
    card2.classList.add("sc-outline");
  }
  function defocusLocationCard(card2) {
    card2.classList.remove("sc-outline");
  }
  function scrollToLocationCard(card2) {
    const container3 = document.querySelector("[data-locations]");
    const padding = window.getComputedStyle(container3).getPropertyValue("padding-bottom");
    const posY = card2.offsetTop - parseInt(padding, 10);
    const posX = card2.offsetLeft - parseInt(padding, 10);
    container3.scrollTop = posY;
    container3.scrollLeft = posX;
  }
  function getLocations() {
    const container3 = document.querySelector("[data-locations]");
    const locations2 = container3.querySelectorAll("[data-location]");
    return locations2;
  }

  // src/scripts/theme/utils/window.js
  function setContainerToWindowHeight(container3) {
    const header = document.getElementById("SC-Header");
    const offset = header.offsetHeight;
    container3.style.height = `calc(100vh - ${offset}px)`;
  }

  // src/scripts/theme/geolocation.js
  function getClientGeolocation(callback) {
    const geolocation = getGeolocationFromSession();
    if (geolocation) return callback(geolocation);
    if (!navigator || !navigator.geolocation) return callback();
    if (window.StoreConnectTestMode === "enabled") return callback();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng = getLatLngFromPosition(position);
        setGeolocationToSession(latLng);
        callback(latLng);
      },
      () => {
        console.log("Geolocation failed");
        callback();
      }
    );
  }
  function getGeolocationFromSession() {
    return JSON.parse(window.sessionStorage.getItem("geolocation"));
  }
  function setGeolocationToSession(geoloc) {
    if (geoloc === null) return;
    window.sessionStorage.setItem("geolocation", JSON.stringify(geoloc));
  }
  function getLatLngFromPosition(position) {
    return { lat: position.coords.latitude, lng: position.coords.longitude };
  }

  // src/scripts/packs/locations.js
  var DEFAULT_COORD = { lat: -33.8523, lng: 151.2108 };
  var container2 = document.querySelector("[data-location-search]");
  var locations = container2.querySelectorAll("[data-location]");
  var mapContainer = document.querySelector("[data-location-map]");
  startLoader(container2);
  setContainerToWindowHeight(container2);
  getClientGeolocation((geolocation) => {
    if (mapContainer === null) {
      setupFormTemplate(document.querySelector("#sc-location-form-exact"));
      stopLoader(container2);
      return initExactAreaForm();
    }
    const latLng = getLatLngParams() || geolocation || DEFAULT_COORD;
    const origin = geolocation || DEFAULT_COORD;
    createMap(latLng, (map2) => {
      const bounds = new google.maps.LatLngBounds();
      setNearBeacon(latLng);
      locations.forEach((location) => {
        const latLng2 = getLatLngFromElem(location);
        const marker = createLocationMarker(latLng2);
        bounds.extend(latLng2);
        setLocationCardData(location, origin);
        setZoomForSingleResult(bounds);
        if (locations[0] === location) {
          setFocusedMarker(marker);
          setFocusedLocationCard(location);
        }
        onClickLocationCard(location, () => {
          setFocusedMarker(marker);
          setFocusedLocationCard(location);
        });
        onClickMarker(marker, () => {
          setFocusedMarker(marker);
          setFocusedLocationCard(location);
        });
      });
      if (locations.length > 0) map2.fitBounds(bounds);
    });
    tryGeocoder(
      // The Geocoder service is used to convert a typed address into
      // a set of coordinates. When the Geocoding API is available,
      // we render a form to search for locations relative to the
      // client location or any typed address.
      () => {
        const template = document.querySelector("#sc-location-form-near");
        stopLoader(container2);
        setupFormTemplate(template);
        initNearAddressForm(geolocation);
      },
      // When the Geocoding API is unavailable we render a form
      // that allows the user to search within an area, defined
      // by state and/or postal code.
      () => {
        const template = document.querySelector("#sc-location-form-exact");
        stopLoader(container2);
        setupFormTemplate(template);
        initExactAreaForm();
      }
    );
  });
  function getLatLngFromElem(location) {
    const lat = location.dataset.lat;
    const lng = location.dataset.lng;
    return lat && lng ? {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    } : null;
  }
  function getLatLngParams() {
    const params2 = new URLSearchParams(window.location.search);
    const lat = params2.get("lat");
    const lng = params2.get("lng");
    if (!lat && !lng) return null;
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  }
})();
//# sourceMappingURL=locations.CQGMNA5X.js.map
