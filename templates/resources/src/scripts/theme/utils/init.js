// This script establishes a MutationObserver to detect changes in the DOM and run callbacks when changes are detected.
// It tries to be efficient about this by establishing only one obeserver and running all callbacks once on each new node.
// There is a limitation of this mechanism: if a node contains a script that has not before been added to the dom,
// and it calls onDomChange, its callback won't be run against anything until the next mutation.
// To work around this, ensure the script is loaded in the initial page load or a previous fetch.

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.ObserverCallbacks = window.StoreConnect.ObserverCallbacks || [];

document.addEventListener('DOMContentLoaded', establishObserver);

export function onDomChange(initCallback) {
  window.StoreConnect.ObserverCallbacks.push(initCallback);
}

function establishObserver() {
  if (window.StoreConnect.Observer) return;

  window.StoreConnect.Observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
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
  window.StoreConnect.ObserverCallbacks.forEach(callback => callback(node));
}
