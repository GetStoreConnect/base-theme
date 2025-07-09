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

  // src/scripts/packs/product-images.js
  onDomChange(init);
  var currentThumbnail;
  var mainImage;
  var mainVideo;
  var thumbnails;
  function init(node) {
    if (node.querySelector("[data-product-image-container]")) {
      mainImage = document.querySelector("[data-product-image]");
      mainVideo = document.querySelector("[data-product-video]");
      thumbnails = document.querySelectorAll("[data-product-thumbnail]");
      const container = document.querySelector("[data-product-image-container]");
      if (container === null) return;
      set(thumbnails[0]);
      if (thumbnails.length > 1) {
        document.querySelector("[data-product-thumbnails-container]").classList.remove("sc-hide");
        for (const thumb of thumbnails) {
          thumb.addEventListener("click", () => set(thumb));
        }
      }
      container.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() !== "img") return;
        const zoomUrl = mainImage.getAttribute("data-src-zoom");
        if (zoomUrl === null) return;
        window.StoreConnectUI.ProductGallery.init(zoomUrl);
      });
    }
  }
  function set(thumbnail) {
    if (thumbnail === currentThumbnail) return;
    currentThumbnail = thumbnail;
    if (thumbnail.tagName.toLowerCase() == "video") {
      mainImage.classList.add("sc-hide");
      transferVideoAttributes(thumbnail, mainVideo);
      mainVideo.classList.remove("sc-hide");
    } else {
      mainVideo.classList.add("sc-hide");
      transferImageAttributes(thumbnail, mainImage);
      mainImage.classList.remove("sc-hide");
    }
    if (thumbnails.length > 0) {
      for (const thumb of thumbnails) {
        currentThumbnail == thumbnail ? thumb.classList.add("is-active") : thumb.classList.remove("is-active");
      }
    }
  }
  function transferImageAttributes(source, target) {
    target.src = source.getAttribute("data-src");
    target.alt = source.alt;
    target.setAttribute("data-product-image", source.getAttribute("data-product-thumbnail"));
    target.setAttribute("data-src-zoom", source.getAttribute("data-src-zoom"));
  }
  function transferVideoAttributes(source, target) {
    target.src = source.getAttribute("data-src");
  }
})();
//# sourceMappingURL=product-images.2WU2BQZK.js.map
