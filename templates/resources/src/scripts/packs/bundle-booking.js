import Litepicker from 'litepicker'
import { formatDate, addDays, subtractDays, DAYS_PER_WEEK } from '../theme/utils/date'
import fetchWithResponseHandler from '../theme/utils/fetch'
import Loader from '../theme/loader'
import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  // Multiple bookable products can be present in 1 Product Bundle
  ;[...node.querySelectorAll('[data-booking][data-component-id]')].forEach((node) =>
    BundleBookingSelector(node)
  )
}

// Implementation mostly copied from booking.js
const BundleBookingSelector = function (node) {
  const productId = node.dataset.id
  const componentId = node.dataset.componentId
  const dates = node.querySelector('[data-booking-dates]')
  const trigger = dates.closest('.SC-DropdownPicker')
  const picker = createPicker()
  let autoJump = false
  let highlightTimeoutId
  let lastMonthSelected

  start()

  function start() {
    const locations = [...node.querySelectorAll('[data-bookable-location]')]
    let srtDate = getStartDate()
    let endDate = getEndDate()

    if (!srtDate && !endDate) {
      autoJump = true
    }

    if (!srtDate || !endDate) {
      srtDate =
        srtDate ||
        (endDate ? formatDate(subtractDays(endDate, DAYS_PER_WEEK)) : formatDate(Date.now()))
      endDate = endDate || formatDate(addDays(srtDate, DAYS_PER_WEEK))
    }

    if (srtDate > endDate) {
      const start = Date.parse(srtDate)
      endDate = formatDate(addDays(start, DAYS_PER_WEEK))
    }
    storeDates(srtDate, endDate)

    const storedLocationId = retrieveVariable('booking-location-id')

    if (storedLocationId) {
      const storedLocation = node.querySelector(
        '[data-bookable-location][value="' + storedLocationId + '"]'
      )

      if (storedLocation) {
        storedLocation.checked = true
        node.querySelector('[data-bookable-locations] span').innerText = storedLocation.dataset.name
      }
    }

    picker.on('show', () => {
      trigger.classList.add('is-active')
    })
    picker.on('hide', () => {
      trigger.classList.remove('is-active')
    })
    picker.on('selected', (first, second) => {
      handleDatesSelection(first, second)
    })
    picker.on('render', (ui) => {
      disablePastDates(ui)
      setCalendarWidth(ui)
    })
    picker.on('change:month', (date, calendarIdx) => {
      handleMonthChange(date, calendarIdx)
    })
    locations.map((option) => {
      option.addEventListener('change', handleLocationSelection)
    })

    picker.setDateRange(srtDate, endDate, true)
    setHighlightDays()
  }

  function handleLocationSelection(event) {
    const locations = node.querySelector('[data-bookable-locations]')
    locations.querySelector('span').innerText = event.target.dataset.name
    storeVariable('booking-location-id', event.target.value)

    filterAvailabilities(getStartDate(), getEndDate(), getLocationId())
  }

  function handleDatesSelection(first, second) {
    const srtDate = formatDate(first.toJSDate())
    const endDate = formatDate(second.toJSDate())

    storeDates(srtDate, endDate)

    filterAvailabilities(srtDate, endDate, getLocationId())
  }

  function handleTimeslotSelection() {
    // Find the booking inputs relative to this booking component
    const locationInput = document.querySelector(
      `[data-component-booking-location="${componentId}"]`
    )
    const startDateInput = document.querySelector(`[data-component-booking-start="${componentId}"]`)
    const endDateInput = document.querySelector(`[data-component-booking-end="${componentId}"]`)

    // Sets selected values to hidden inputs
    ;[...node.querySelectorAll('[data-booking-timeslot]')].map((timeslot) => {
      timeslot.addEventListener('change', (event) => {
        // Update the booking inputs for this specific component
        if (locationInput) locationInput.value = event.target.dataset.location
        if (startDateInput) startDateInput.value = event.target.dataset.start
        if (endDateInput) endDateInput.value = event.target.dataset.end

        // Trigger a custom event to notify the bundle form that booking selection changed
        const bundleForm = document.querySelector('form[data-bundle-form]')
        if (bundleForm) {
          const bookingChangeEvent = new CustomEvent('bundle-booking-changed', {
            detail: {
              componentId: componentId,
              location: event.target.dataset.location,
              startDate: event.target.dataset.start,
              endDate: event.target.dataset.end,
              available: event.target.dataset.available,
            },
          })
          bundleForm.dispatchEvent(bookingChangeEvent)
        }
      })
    })
  }

  function handleMonthChange(dateInstance, _calendarIdx) {
    clearTimeout(highlightTimeoutId)

    const date = dateInstance.toJSDate()
    const direction = lastMonthSelected > date ? 'bwd' : 'fwd'

    lastMonthSelected = date

    highlightTimeoutId = setTimeout(function () {
      highlightDays(date, direction)
    }, 400)
  }

  function setHighlightDays() {
    const pickerDate = picker.getStartDate().toJSDate()
    const monthStartDate = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), 1)

    highlightDays(monthStartDate, 'both')
  }

  function highlightDays(date, direction, preload = false) {
    const startDate = formatDate(date)
    const endDate = formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0))
    const locationId = getLocationId()

    const endpoint = returnEndPoint({
      availabilitiesUrl: node.querySelector('[data-booking-timeslots]').dataset
        .bookingAvailabilitiesUrl,
      productId,
      startDate,
      endDate,
      locationId,
      partial: 'availabilities',
    })

    fetchAvailabilities(endpoint)
      .then((text) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        const availableDates = [...doc.querySelectorAll('[data-booking-timeslot]')].map((slot) => {
          return slot.dataset.start.split(' ')[0]
        })

        const uniqueDates = [...new Set(availableDates)]
        picker.setHighlightedDays(uniqueDates)
      })
      .catch(() => {
        // no-op
      })
  }

  function filterAvailabilities(startDate, endDate, locationId) {
    const locations = node.querySelector('[data-bookable-locations]')
    const slots = node.querySelector('[data-booking-timeslots]')
    const availabilitiesUrl = slots.dataset.bookingAvailabilitiesUrl
    const availabilitiesPartial = slots.dataset.bookingAvailabilitiesPartial
    const fetchError = slots.dataset.bookingFetchError
    const endpoint = returnEndPoint({
      availabilitiesUrl,
      productId,
      startDate,
      endDate,
      locationId,
      partial: availabilitiesPartial,
    })
    const loader = Loader({ target: slots, contextual: true })

    loader.on()
    locations.setAttribute('disabled', true)
    // Note: We don't disable add-to-cart buttons here as bundle form handles that
    slots.scrollTop = 0

    fetchAvailabilities(endpoint)
      .then((text) => {
        loader.off()
        locations.removeAttribute('disabled')
        slots.innerHTML = text
        handleTimeslotSelection()
      })
      .catch(() => {
        loader.off()
        locations.removeAttribute('disabled')
        slots.innerHTML = `<div class="sc-color-error sc-p-medium">${fetchError}</div>`
      })
  }

  // Rest of the utility functions remain the same as original booking.js
  function createPicker() {
    return new Litepicker({
      element: dates,
      singleMode: false,
      allowRepick: true,
      showTooltip: false,
      numberOfColumns: 2,
      numberOfMonths: 2,
      format: 'YYYY-MM-DD',
      mobileFriendly: true,
      autoRefresh: true,
      lockDaysFilter: (date1, date2, pickedDates) => {
        return date1.getTime() < new Date().setHours(0, 0, 0, 0)
      },
    })
  }

  function disablePastDates(ui) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    ui.querySelectorAll('.day-item').forEach((day) => {
      const dayDate = new Date(day.dataset.time)
      if (dayDate < today) {
        day.classList.add('is-locked')
      }
    })
  }

  function setCalendarWidth(ui) {
    const calendar = ui.querySelector('.container__main')
    if (calendar) {
      calendar.style.width = '100%'
      calendar.style.maxWidth = '600px'
    }
  }

  function getStartDate() {
    return retrieveVariable('booking-start-date')
  }

  function getEndDate() {
    return retrieveVariable('booking-end-date')
  }

  function getLocationId() {
    const locations = node.querySelector('[data-bookable-location]:checked')
    return locations ? locations.value : null
  }

  function storeDates(startDate, endDate) {
    storeVariable('booking-start-date', startDate)
    storeVariable('booking-end-date', endDate)
    dates.querySelector('span').innerText = `${startDate} - ${endDate}`
  }

  function storeVariable(key, value) {
    sessionStorage.setItem(`${productId}-${componentId}-${key}`, value)
  }

  function retrieveVariable(key) {
    return sessionStorage.getItem(`${productId}-${componentId}-${key}`)
  }

  function returnEndPoint({
    availabilitiesUrl,
    productId,
    startDate,
    endDate,
    locationId,
    partial,
  }) {
    const url = new URL(availabilitiesUrl, window.location.origin)
    url.searchParams.set('product_id', productId)
    url.searchParams.set('start_date', startDate)
    url.searchParams.set('end_date', endDate)
    if (locationId && locationId != 'on')
      url.searchParams.set('product_bookable_location_id', locationId)
    if (partial) url.searchParams.set('partial', partial)
    return url.toString()
  }

  function fetchAvailabilities(endpoint) {
    return fetchWithResponseHandler(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'text/html',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
  }
}

export default BundleBookingSelector
