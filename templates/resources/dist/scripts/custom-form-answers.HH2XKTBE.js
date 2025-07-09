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

  // src/scripts/theme/store-path-url.js
  function store_path_url_default(url) {
    const storePath = document.querySelector('meta[name="sc-path"]');
    if (storePath) {
      const storePathContent = storePath.content;
      if (storePathContent) {
        return `/${storePathContent}${url}`;
      }
    }
    return url;
  }

  // src/scripts/packs/custom-form-answers.js
  onDomChange(init);
  function init(node) {
    ;
    [...node.querySelectorAll("[data-custom-form-answer]")].forEach(
      (formAnswerNode) => configure(formAnswerNode)
    );
  }
  function configure(node) {
    initEditLink();
    initEditContainer();
    function initEditLink() {
      node.addEventListener("click", function(event) {
        const { target } = event;
        if (target.tagName === "A" && target.hasAttribute("data-custom-form-answer-id")) {
          event.preventDefault();
          event.stopPropagation();
          const answerId = target.getAttribute("data-custom-form-answer-id");
          fetchForm(answerId);
        }
      });
    }
    function initEditContainer() {
      node.addEventListener("submit", function(event) {
        const { target } = event;
        if (node.querySelector('input[type="submit"]')) {
          event.preventDefault();
          event.stopPropagation();
          submitForm();
        }
      });
      node.addEventListener("change", function(event) {
        const { target } = event;
        if (target.tagName === "SELECT" || target.getAttribute("type") === "checkbox" && !node.querySelector('input[type="submit"]')) {
          event.preventDefault();
          event.stopPropagation();
          const form = node.querySelector("form");
          const data = new URLSearchParams(new FormData(form));
          const answerId = form.getAttribute("data-custom-form-answer-id");
          submitForm();
        }
      });
      node.addEventListener("keypress", function(event) {
        const { target } = event;
        if (event.key === "Enter" && target.tagName === "INPUT") {
          event.preventDefault();
          event.stopPropagation();
          submitForm();
        }
      });
    }
    function fetchForm(answerId) {
      fetch(store_path_url_default(`/async/custom_form_answers/${answerId}`)).then((response) => response.text()).then((text) => {
        node.innerHTML = text;
      });
    }
    function submitForm() {
      const form = node.querySelector("form");
      const data = new URLSearchParams(new FormData(form));
      const answerId = form.getAttribute("data-custom-form-answer-id");
      fetch(store_path_url_default(`/async/custom_form_answers/${answerId}`), {
        method: "PUT",
        body: data
      }).then((response) => response.text()).then((text) => {
        node.innerHTML = text;
      });
    }
  }
})();
//# sourceMappingURL=custom-form-answers.HH2XKTBE.js.map
