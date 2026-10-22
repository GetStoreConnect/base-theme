/**
 * Utility for safely loading external scripts with race condition protection.
 *
 * This module ensures that:
 * - Scripts are only loaded once per URL
 * - Multiple concurrent calls for the same script wait for a single load
 * - Callbacks are executed only after the script is fully loaded
 *
 * @example
 * loadScript({
 *   url: 'https://example.com/library.js',
 *   onload: () => console.log('Library loaded!'),
 *   id: 'my-script',
 *   attributes: { 'data-api-key': 'abc123', 'async': 'true' }
 * })
 */

// Registry for tracking loaded scripts
const loadedScripts = new Set()

// Track currently loading scripts to prevent race conditions
const loadingScripts = new Map() // url -> Promise

/**
 * Loads an external script and calls a callback when ready.
 * Handles concurrent calls gracefully by ensuring the script loads only once.
 *
 * @param {Object} options - Script loading options
 * @param {string} options.url - The URL of the script to load
 * @param {Function} [options.onload] - Callback to execute when script is loaded
 * @param {string} [options.id] - Optional ID attribute for the script element
 * @param {HTMLElement} [options.container] - Optional container element (defaults to document.body)
 * @param {Object} [options.attributes] - Optional object of attribute key-value pairs to set on the script element
 * @returns {Promise<void>} Promise that resolves when the script is loaded
 */
export async function loadScript({ url, onload, id, container, attributes }) {
  const scriptContainer = container || document.body

  // If already fully loaded, call callback immediately
  if (loadedScripts.has(url)) {
    if (onload) onload()
    return
  }

  // If currently loading, wait for it to complete before calling callback
  if (loadingScripts.has(url)) {
    await loadingScripts.get(url)
    if (onload) onload()
    return
  }

  // Start loading the script
  const loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      loadedScripts.add(url)
      loadingScripts.delete(url)
      resolve()
    }
    script.onerror = (error) => {
      loadingScripts.delete(url)
      reject(error)
    }
    if (id) {
      script.id = id
    }
    // Apply custom attributes if provided
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value)
      })
    }
    scriptContainer.appendChild(script)
  })

  loadingScripts.set(url, loadPromise)
  await loadPromise
  if (onload) onload()
}

/**
 * Check if a script has been loaded
 * @param {string} url - The URL of the script
 * @returns {boolean} True if the script is loaded
 */
export function isScriptLoaded(url) {
  return loadedScripts.has(url)
}

/**
 * Check if a script is currently loading
 * @param {string} url - The URL of the script
 * @returns {boolean} True if the script is currently loading
 */
export function isScriptLoading(url) {
  return loadingScripts.has(url)
}
