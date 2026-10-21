import { onDomChange } from './utils/init'
import storePathUrl from './store-path-url'

const ComponentReloader = (() => {
  const handlers = new Map()
  const timers = new WeakMap()
  const inflight = new WeakSet()

  function registerFrom(node) {
    // scan for any components under this node
    const candidates = []
    if (node.nodeType === Node.ELEMENT_NODE && node.matches('[data-reload-events]')) {
      candidates.push(node)
    }
    if (node.querySelectorAll) {
      node.querySelectorAll('[data-reload-events]').forEach((el) => candidates.push(el))
    }

    // bind document-level listeners for all events we see
    candidates.forEach((el) => {
      const events = (el.getAttribute('data-reload-events') || '').split(/\s+/).filter(Boolean)
      events.forEach(ensureListener)
    })

    // after any mutation, also check for orphaned listeners
    cleanupOrphanedListeners()
  }

  function ensureListener(eventName) {
    if (handlers.has(eventName)) return
    const handler = (event) => {
      document.querySelectorAll(`[data-reload-events~="${eventName}"]`).forEach((container) => {
        scheduleReload(container)
      })
      handleFlash(event)
    }
    document.addEventListener(eventName, handler)
    handlers.set(eventName, handler)
  }

  function cleanupOrphanedListeners() {
    for (const [eventName, handler] of handlers.entries()) {
      const stillExists = document.querySelector(`[data-reload-events~="${eventName}"]`)
      if (!stillExists) {
        document.removeEventListener(eventName, handler)
        handlers.delete(eventName)
      }
    }
  }

  function scheduleReload(container) {
    const existing = timers.get(container)
    if (existing) clearTimeout(existing)
    const t = setTimeout(() => {
      if (inflight.has(container)) return
      const nonce = container.getAttribute('data-nonce')
      const token = container.getAttribute('data-token')
      reloadComponent(container, nonce, token)
    }, 150)
    timers.set(container, t)
  }

  function reloadComponent(container, nonce, token) {
    inflight.add(container)
    fetch(storePathUrl(`/async/component/${nonce}`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((html) => {
        const template = document.createElement('template')
        template.innerHTML = html.trim()
        const newEl = template.content.firstElementChild
        container.replaceWith(newEl)

        // re-check listener usage after replacement
        cleanupOrphanedListeners()
      })
      .catch((err) => {
        console.error('Error reloading component:', err)
      })
      .finally(() => {
        inflight.delete(container)
      })
  }

  function handleFlash(event) {
    const data = event?.detail?.data || {}
    let alert, notice

    if (data.alert) alert = data.alert
    if (data.notice) notice = data.notice
    if (data.flash) {
      // flash can be an array of [type, message] pairs or an object with type: message
      if (Array.isArray(data.flash)) {
        data.flash.forEach(([type, message]) => {
          if (type === 'alert') alert = message
          if (type === 'notice') notice = message
        })
      } else if (typeof data.flash === 'object' && data.flash !== null) {
        Object.entries(data.flash).forEach(([type, message]) => {
          if (type === 'alert') alert = message
          if (type === 'notice') notice = message
        })
      }
    }

    if (alert) {
      document.dispatchEvent(new CustomEvent('sc.alert', { detail: { message: alert } }))
    }
    if (notice) {
      document.dispatchEvent(new CustomEvent('sc.notice', { detail: { message: notice } }))
    }
  }

  return { registerFrom }
})()

onDomChange(ComponentReloader.registerFrom)
