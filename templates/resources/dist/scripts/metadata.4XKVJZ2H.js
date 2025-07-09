(() => {
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

  // src/scripts/theme/utils/fetch.js
  function fetchWithResponseHandler(url, options) {
    const method = options.method ? options.method.toUpperCase() : "GET";
    if (method !== "GET" && method !== "HEAD") {
      const tag = document.querySelector('meta[name="csrf-token"]');
      const csrfToken = tag ? document.querySelector('meta[name="csrf-token"]').getAttribute("content") : "";
      options.headers = {
        ...options.headers,
        "X-CSRF-Token": csrfToken
      };
    }
    return fetch(url, options).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const contentType = response.headers.get("Content-Type");
      if (contentType.includes("application/json")) {
        return response.json();
      } else if (contentType.includes("text/javascript")) {
        return response.text().then((script) => (0, eval)(script));
      } else if (contentType.includes("text/html")) {
        return response.text();
      } else {
        return response.blob();
      }
    });
  }

  // src/scripts/packs/metadata.js
  document.addEventListener("DOMContentLoaded", function() {
    if (document.querySelector("[data-customer-metadata]")) {
      const data = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: window.navigator.language,
        screen_resolution: `${window.screen.width * window.devicePixelRatio} X ${window.screen.height * window.devicePixelRatio}`
      };
      fetchWithResponseHandler(store_path_url_default("/cart/customer_metadata"), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data).toString()
      });
    }
  });
})();
//# sourceMappingURL=metadata.4XKVJZ2H.js.map
