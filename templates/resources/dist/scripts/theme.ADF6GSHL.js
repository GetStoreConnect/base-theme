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

  // src/scripts/theme/dropdown.js
  onDomChange(init);
  function init(node) {
    ;
    [...node.querySelectorAll("[data-dropdown-trigger]")].forEach((trigger) => start(trigger));
  }
  var activeDropdown = null;
  function start(trigger) {
    const dropdown = trigger.parentNode;
    const menu = dropdown.querySelector("[data-dropdown-target]");
    const options = [...dropdown.querySelectorAll("[data-dropdown-option]")];
    const label = trigger.querySelector("[data-dropdown-selection]");
    trigger.addEventListener("click", () => {
      dropdown === activeDropdown ? close(dropdown) : open(dropdown);
    });
    trigger.addEventListener("close", () => {
      close(dropdown);
    });
    options.map(
      (option) => option.addEventListener("click", () => {
        if (option.type === "checkbox") return;
        if (menu.hasAttribute("data-dropdown-ignore-clicks")) return;
        if (label) label.innerText = option.value || label.dataset.default;
        close(dropdown);
      })
    );
  }
  function open(dropdown) {
    const menu = dropdown.querySelector("[data-dropdown-target]");
    if (activeDropdown) close(activeDropdown);
    activeDropdown = dropdown;
    document.addEventListener("click", closeIfClickOutsideMenu);
    dropdown.classList.add("is-active");
    dropdown.querySelector("[data-dropdown-trigger]").classList.add("is-active");
    menu.classList.remove("sc-hide");
    menu.classList.add("is-active");
    menu.setAttribute("aria-expanded", "true");
  }
  function close(dropdown) {
    const menu = dropdown.querySelector("[data-dropdown-target]");
    activeDropdown = null;
    document.removeEventListener("click", closeIfClickOutsideMenu);
    dropdown.classList.remove("is-active");
    dropdown.querySelector("[data-dropdown-trigger]").classList.remove("is-active");
    menu.classList.remove("is-active");
    menu.classList.add("sc-hide");
    menu.setAttribute("aria-expanded", "false");
  }
  function closeIfClickOutsideMenu(event) {
    if (activeDropdown.parentNode.contains(event.target)) return;
    if (event.target.closest("[data-dropdown-in-menu]")) return;
    event.preventDefault();
    close(activeDropdown);
  }

  // src/scripts/theme/format-date.js
  window.StoreConnect = window.StoreConnect || {};
  window.StoreConnect.formatDateTime = function(value, targetInputId) {
    const date = new Date(value);
    const targetInput = document.getElementById(targetInputId);
    if (!isNaN(date.getTime()) && targetInput) {
      targetInput.value = date.toISOString();
    }
  };

  // src/scripts/theme/modal.js
  onDomChange(init2);
  function init2(node) {
    ;
    [...node.querySelectorAll("[data-modal-trigger]")].map((trigger) => {
      trigger.addEventListener("click", toggle);
    });
  }
  function toggle(event) {
    const id = event.currentTarget.getAttribute("data-modal-trigger"), modal = document.querySelector(`[data-modal="${id}"]`);
    if (modal.classList.contains("is-active")) {
      modal.classList.remove("is-active");
      document.querySelector("body").style.overflow = "visible";
    } else {
      modal.classList.add("is-active");
      document.querySelector("body").style.overflow = "hidden";
    }
  }

  // src/scripts/theme/tabs.js
  var sets = {};
  onDomChange(init3);
  function init3(node) {
    const tabSets = node.querySelectorAll("[data-tabs]");
    if (tabSets.length > 0) {
      ;
      [...tabSets].map((set) => {
        const setId = set.getAttribute("data-tabs");
        const tabsInSet = [...set.querySelectorAll("[data-tab]")];
        const triggersInSet = [...set.querySelectorAll("[data-tab-trigger]")];
        const activeTabInSet = getActiveTabElem(tabsInSet);
        sets[setId] = {
          tabs: tabsInSet,
          triggers: triggersInSet,
          active: activeTabInSet
        };
        if (tabsInSet.length === 0) {
          return;
        }
        if (activeTabInSet === void 0) {
          const firstTabId = getId(tabsInSet[0]);
          activate(firstTabId, setId);
        }
        triggersInSet.map(
          (trigger) => trigger.addEventListener("click", () => {
            const tabId = trigger.getAttribute("data-tab-trigger");
            deactivateAllTabs(setId);
            activate(tabId, setId);
          })
        );
        setClassForLastTab(setId);
      });
    }
  }
  function activate(tabId, setId) {
    const set = document.querySelector(`[data-tabs='${setId}']`);
    const tabInSet = getTabElem(tabId, set);
    const triggerInSet = getTriggerElem(tabId, set);
    sets[setId].active = tabInSet;
    tabInSet.classList.remove("sc-hide");
    if (triggerInSet) {
      triggerInSet.classList.toggle("is-active");
    }
  }
  function deactivateAllTabs(setId) {
    sets[setId].tabs.map((tab) => tab.classList.add("sc-hide"));
    sets[setId].triggers.map((trigger) => trigger.classList.remove("is-active"));
  }
  function getId(tab) {
    return tab.getAttribute("data-tab");
  }
  function getTabElem(id, set) {
    return set.querySelector(`[data-tab='${id}']`);
  }
  function getTriggerElem(id, set) {
    return set.querySelector(`[data-tab-trigger='${id}']`);
  }
  function getActiveTabElem(tabsInSet) {
    return tabsInSet.filter((tab) => !tab.classList.contains("sc-hide"))[0];
  }
  function setClassForLastTab(setId) {
    const tabsInSet = sets[setId].tabs;
    const lastTabInSet = tabsInSet[tabsInSet.length - 1];
    lastTabInSet.classList.add("is-last");
  }

  // src/scripts/theme/toggle-visibility.js
  document.addEventListener("DOMContentLoaded", function() {
    const triggers = document.querySelectorAll("[data-toggle-visibility]");
    [...triggers].map((trigger) => trigger.addEventListener("click", toggle2));
  });
  function toggle2(event) {
    const id = event.currentTarget.getAttribute("data-toggle-visibility");
    const targets = document.querySelectorAll("[data-toggle-visibility-target=" + id + "]");
    [...targets].map((target) => target.classList.toggle("is-hidden"));
    event.currentTarget.classList.toggle("target-hidden");
  }
})();
//# sourceMappingURL=theme.ADF6GSHL.js.map
