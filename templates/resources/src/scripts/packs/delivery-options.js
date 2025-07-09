import Litepicker from 'litepicker'
import { formatDate } from '../theme/utils/date'
import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  ;[...node.querySelectorAll('[data-delivery-options]')].forEach((node) =>
    DeliveryOptionsSelector(node)
  )
}

const DeliveryOptionsSelector = function (node) {
  const pickerNode = node.querySelector('[data-available-delivery-dates]')
  const dayOptions = node.querySelector('[data-delivery-days]')
  const lineItemId = node.getAttribute('data-delivery-options')

  let availableDeliveryDates,
    deliveryDateNode,
    picker,
    selection = {}

  const deliveryTimeSlotsNode = node.querySelector('[data-delivery-time-slots]')
  const form = node.closest('form')
  const submitButton = form.querySelector('[data-fulfilment-button]')

  if (isByDate()) {
    availableDeliveryDates = pickerNode.getAttribute('data-available-delivery-dates').split(',')
    deliveryDateNode = pickerNode.querySelector('span')
    picker = createPicker()
    initDatePicker()
  }

  if (isByDay()) {
    initDayPicker()
  }

  function initDatePicker() {
    picker.on('render', (ui) => {
      ui.style.width = pickerNode.parentElement.clientWidth * 1 + 'px'
    })

    picker.on('selected', (datetime, _) => {
      const date = formatDate(datetime.toJSDate())

      selectDate(date)
      renderDeliveryOptions()
    })

    if (availableDeliveryDates.length >= 1) {
      picker.gotoDate(availableDeliveryDates[0])
    }

    if (deliveryTimeSlotsNode) {
      deliveryTimeSlotsNode.addEventListener('change', validateForm)
    }

    renderDeliveryOptions()
  }

  function initDayPicker() {
    dayOptions.addEventListener('change', (e) => {
      selectDay(e.target.value)
      renderDeliveryOptions()
    })

    if (deliveryTimeSlotsNode) {
      deliveryTimeSlotsNode.addEventListener('change', validateForm)
    }

    renderDeliveryOptions()
  }

  function createPicker() {
    const icon =
      '<svg viewBox="0 0 100 100"><path d="M56.7,75.75 L95.4,37.05 C98.8,33.65 98.8,28.05 95.4,24.65 C92,21.25 86.4,21.25 83,24.65 L50.5,57.05 L18,24.55 C14.6,21.15 9,21.15 5.6,24.55 C3.9,26.25 3,28.55 3,30.75 C3,33.05 3.9,35.25 5.6,36.95 L44.3,75.75 C47.7,79.15 53.3,79.15 56.7,75.75 Z"></path></svg>'

    return new Litepicker({
      element: pickerNode,
      singleMode: true,
      buttonText: { previousMonth: icon, nextMonth: icon },
      showTooltip: false,
      highlightedDaysFormat: 'YYYY-MM-DD',
      highlightedDays: availableDeliveryDates,
      startDate: deliveryDateNode.innerText,
      lockDaysFilter: (datetime) => {
        const date = formatDate(datetime.toJSDate())

        return !availableDeliveryDates.includes(date)
      },
    })
  }

  function selectDate(date) {
    deliveryDateNode.innerText = date
    selection['date'] = date
    const input = node.querySelector(`[data-delivery-date-input="${lineItemId}"]`)
    if (input) {
      input.value = date
    }
  }

  function selectedDate() {
    return selection['date']
  }

  function selectDay(day) {
    selection['day'] = day
  }

  function selectedDay() {
    return selection['day']
  }

  function renderDeliveryOptions() {
    fetchDeliveryOptions()
      .then((json) => {
        node.removeAttribute('data-delivery-options-pending')
        deliveryTimeSlotsNode.innerHTML = json.html
      })
      .catch((_) => {
        node.setAttribute('data-delivery-options-pending', true)
        deliveryTimeSlotsNode.innerHTML = ''
      })
      .finally(() => {
        validateForm()
      })
  }

  function validateForm() {
    if (isValid()) {
      node.setAttribute('data-valid', true)
    } else {
      node.removeAttribute('data-valid')
    }
    checkValidity()
  }

  function isValid() {
    return hasSelection() && hasTimeslotSelection()
  }

  function checkValidity() {
    if (form.checkValidity() && form.querySelector('[name=method]:checked') && allValid()) {
      submitButton.removeAttribute('disabled')
    } else {
      submitButton.setAttribute('disabled', 'disabled')
    }
  }

  function allValid() {
    return [...node.querySelectorAll('[data-delivery-options]')].every((node) =>
      node.hasAttribute('data-valid')
    )
  }

  async function fetchDeliveryOptions() {
    if (!lineItemId || !hasSelection()) {
      return { html: '' }
    }

    const response = await fetch(
      `/async/delivery_options?${queryParam()}&cart_item_id=${lineItemId}`,
      { headers: { Accept: 'application/json' } }
    )

    if (response.ok) {
      const json = await response.json()
      return json
    } else {
      throw new Error(response.statusText)
    }
  }

  function queryParam() {
    if (isByDate()) {
      return `date=${selectedDate()}`
    }
    if (isByDay()) {
      return `day=${selectedDay()}`
    }
  }

  function hasSelection() {
    return isByDate() ? selectedDate() : selectedDay()
  }

  function hasTimeslotSelection() {
    if (deliveryTimeSlotsNode) {
      if (deliveryTimeSlotsNode.querySelector('input')) {
        return deliveryTimeSlotsNode.querySelector('input:checked')
      }
    }
    return true
  }

  function isByDate() {
    return pickerNode ? true : false
  }

  function isByDay() {
    return dayOptions ? true : false
  }
}
