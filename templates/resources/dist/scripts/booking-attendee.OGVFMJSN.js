(() => {
  // src/scripts/theme/utils/init.js
  window.StoreConnect = window.StoreConnect || {};
  window.StoreConnect.ObserverCallbacks = window.StoreConnect.ObserverCallbacks || [];
  document.addEventListener("DOMContentLoaded", establishObserver);
  function onDomChange(initCallback) {
    window.StoreConnect.ObserverCallbacks.push(initCallback);
  }
  function establishObserver() {
    if (window.StoreConnect.Observer) return;
    window.StoreConnect.Observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            runCallbacks(node, "mutation");
          }
        });
      });
    });
    window.StoreConnect.Observer.observe(document.body, { childList: true, subtree: true });
    runCallbacks(document, "initial load");
  }
  function runCallbacks(node, _context) {
    window.StoreConnect.ObserverCallbacks.forEach((callback) => callback(node));
  }

  // src/scripts/packs/booking-attendee.js
  onDomChange(init);
  function init(node) {
    ;
    [...node.querySelectorAll("[data-booking-container]")].forEach((container) => start(container));
  }
  function start(node) {
    const addAttendeeBtn = node.querySelector("[data-booking-attendee-add]");
    if (addAttendeeBtn) {
      const addForm = node.querySelector("[data-booking-attendee-form-add]");
      const cancelAddBtn = addForm.querySelector("[data-booking-attendee-cancel]");
      addAttendeeBtn.addEventListener("click", handleAddAttendee);
      cancelAddBtn.addEventListener("click", handleCancelAdd);
      listenForRadioChange(addForm);
    }
    ;
    [...node.querySelectorAll("[data-booking-attendee]")].forEach((node2) => {
      listenForRadioChange(node2);
      [...node2.querySelectorAll("[data-booking-attendee-edit]")].map((btn) => {
        btn.addEventListener("click", handleEditAttendee);
      });
      [...node2.querySelectorAll("[data-booking-attendee-cancel]")].map((btn) => {
        btn.addEventListener("click", handleCancelEdit);
      });
    });
  }
  function handleAddAttendee(event) {
    const btn = event.currentTarget;
    const container = btn.closest("[data-booking-container]");
    const addBtn = container.querySelector("[data-booking-attendee-add]");
    const form = container.querySelector("[data-booking-attendee-form-add]");
    addBtn.setAttribute("disabled", true);
    form.classList.remove("sc-hide");
  }
  function handleCancelAdd(event) {
    const btn = event.currentTarget;
    const container = btn.closest("[data-booking-container]");
    const addBtn = container.querySelector("[data-booking-attendee-add]");
    const form = container.querySelector("[data-booking-attendee-form-add]");
    addBtn.removeAttribute("disabled");
    form.classList.add("sc-hide");
  }
  function handleEditAttendee(event) {
    const attendee = event.currentTarget.closest("[data-booking-attendee]");
    const attendeeForm = attendee.querySelector("[data-booking-attendee-form-edit]");
    const attendeeCard = attendee.querySelector("[data-booking-attendee-card]");
    const container = attendee.closest("[data-booking-container]");
    const forms = container.querySelectorAll("[data-booking-attendee-form-edit]");
    const cards = container.querySelectorAll("[data-booking-attendee-card]");
    [...cards].map((card) => {
      card === attendeeCard ? card.classList.add("sc-hide") : card.classList.remove("sc-hide");
    });
    [...forms].map((form) => {
      form === attendeeForm ? form.classList.remove("sc-hide") : form.classList.add("sc-hide");
    });
  }
  function handleCancelEdit(event) {
    const container = event.currentTarget.closest("[data-booking-attendee]");
    const form = container.querySelector("[data-booking-attendee-form-edit]");
    const card = container.querySelector("[data-booking-attendee-card]");
    const addBtn = container.closest("[data-booking-container]").querySelector("[data-booking-attendee-add]");
    card.classList.remove("sc-hide");
    form.classList.add("sc-hide");
  }
  function listenForRadioChange(node) {
    const radios = node.querySelectorAll("[data-booking-is-contact]");
    const fields = node.querySelector("[data-booking-attendee-fields]");
    const inputs = node.querySelectorAll("[data-booking-attendee-input]");
    [...radios].forEach((radio) => {
      radio.addEventListener("click", (event) => {
        if (event.currentTarget.value === "true") {
          fields.classList.add("sc-hide");
          [...inputs].map((input) => input.setAttribute("value", ""));
        } else {
          fields.classList.remove("sc-hide");
        }
      });
      if (!!radio["checked"]) {
        radio.click();
      }
    });
  }
})();
//# sourceMappingURL=booking-attendee.OGVFMJSN.js.map
