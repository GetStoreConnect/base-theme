import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  // If the node itself is a matching form
  if (node.matches?.("form[data-remote='true']")) {
    setupForm(node)
  }

  // Any matching forms inside the node
  node.querySelectorAll?.("form[data-remote='true']").forEach(setupForm)
}

function setupForm(form) {
  form.addEventListener('ajax:success', (event) => {
    const [data, status, xhr] = event.detail
    const successEventName = form.dataset.success
    if (successEventName) {
      document.dispatchEvent(
        new CustomEvent(successEventName, {
          detail: { data, status, xhr, form },
        })
      )
    }
  })

  form.addEventListener('ajax:error', (event) => {
    const [data, status, xhr] = event.detail
    const errorEventName = form.dataset.error
    if (errorEventName) {
      document.dispatchEvent(
        new CustomEvent(errorEventName, {
          detail: { data, status, xhr, form },
        })
      )
    }
  })
}
