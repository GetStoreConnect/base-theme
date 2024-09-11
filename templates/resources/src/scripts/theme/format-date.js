window.StoreConnect = window.StoreConnect || {};

window.StoreConnect.formatDateTime = function(value, targetInputId) {
  const date = new Date(value);
  const targetInput = document.getElementById(targetInputId);

  if (!isNaN(date.getTime()) && targetInput) {
    targetInput.value = date.toISOString();
  }
};
