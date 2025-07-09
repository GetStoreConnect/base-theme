(() => {
  // src/scripts/packs/sf-payments.js
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("sc-payments-sf");
    if (container) {
      const orderErrorType = container.getAttribute("data-order-error-type");
      window.parent.postMessage({ type: "payment_form", orderErrorType }, "*");
      const showPayment = document.getElementById("show-payment");
      const paymentsContainer = document.getElementById("sc-payments-methods-container");
      const alreadyPaid = document.getElementById("sf-already-paid");
      const alreadyPaidButtons = document.getElementById("already-paid-buttons");
      if (showPayment) {
        showPayment.addEventListener("click", (event) => {
          paymentsContainer.classList.remove("sc-hide");
          alreadyPaid.classList.add("sc-hide");
          alreadyPaidButtons.classList.add("sc-hide");
        });
      }
    }
  });
})();
//# sourceMappingURL=sf-payments.MQ5U3VDN.js.map
