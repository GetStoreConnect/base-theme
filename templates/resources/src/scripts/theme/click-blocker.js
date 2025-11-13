/**
 * Click Blocker - Overlay management for preventing clicks on target elements
 *
 * Automatically manages click blocking via data-click-blocker attribute:
 * - data-click-blocker="not-allowed" → adds blocker with not-allowed cursor
 * - data-click-blocker="wait" → adds blocker with wait cursor
 * - data-click-blocker="false" → removes blocker
 *
 * Usage: Simply set the data-click-blocker attribute on any element.
 * The module automatically watches for attribute changes and DOM updates.
 */

import { onDataAttrChange, onDomChange } from './utils/init'

const OVERLAY_DATA_REF = 'click-blocker-overlay'
const DEFAULT_CURSOR = 'not-allowed'

/**
 * Ensure target node has position: relative
 */
function ensureRelativePosition(targetNode) {
  const currentPosition = window.getComputedStyle(targetNode).position
  if (currentPosition === 'static') {
    targetNode.style.position = 'relative'
  }
}

/**
 * Create overlay element
 */
function createOverlay(cursor = DEFAULT_CURSOR) {
  const overlay = document.createElement('div')
  overlay.setAttribute('data-ref', OVERLAY_DATA_REF)
  overlay.style.position = 'absolute'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.right = '0'
  overlay.style.bottom = '0'
  overlay.style.cursor = cursor
  overlay.style.pointerEvents = 'all'
  overlay.style.zIndex = '10'
  return overlay
}

/**
 * Find existing overlay in target node
 */
function findOverlay(targetNode) {
  return targetNode.querySelector(`[data-ref="${OVERLAY_DATA_REF}"]`)
}

/**
 * Add click blocker overlay to target node (internal helper)
 */
function add(targetNode, options = {}) {
  if (!targetNode) return

  // Don't add if already exists
  if (findOverlay(targetNode)) return

  const cursor = options.cursor || DEFAULT_CURSOR
  ensureRelativePosition(targetNode)
  const overlay = createOverlay(cursor)
  targetNode.appendChild(overlay)
}

/**
 * Remove click blocker overlay from target node (internal helper)
 */
function remove(targetNode) {
  if (!targetNode) return

  const overlay = findOverlay(targetNode)
  if (overlay) {
    overlay.remove()
  }
}

/**
 * Handle data-click-blocker attribute changes
 */
function handleAttributeChange(node, value) {
  // Falsy values or 'false' string → remove blocker
  if (!value || value === 'false' || value === '') {
    remove(node)
  } else {
    // Any other value is treated as a cursor type
    add(node, { cursor: value })
  }
}

/**
 * Initialize click blocker on existing elements within a node
 */
function init(node = document) {
  const elements = node.querySelectorAll('[data-click-blocker]')
  elements.forEach((element) => {
    const value = element.dataset.clickBlocker
    handleAttributeChange(element, value)
  })

  // Also check if the node itself has the attribute
  if (node !== document && node.dataset && node.dataset.clickBlocker !== undefined) {
    handleAttributeChange(node, node.dataset.clickBlocker)
  }
}

/**
 * Watch for data-click-blocker attribute changes
 */
onDataAttrChange((node, attributeName, _, newValue) => {
  if (attributeName === 'data-click-blocker') {
    handleAttributeChange(node, newValue)
  }
})

// Initialize when DOM changes (initial load and dynamic content)
onDomChange(init)
