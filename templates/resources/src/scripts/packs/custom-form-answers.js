import { onDomChange } from '../theme/utils/init';
import storePath from '../theme/store-path-url'

onDomChange(init);

function init(node) {
  [...node.querySelectorAll('[data-custom-form-answer]')]
    .forEach((formAnswerNode) => configure(formAnswerNode))
}

function configure(node) {
  initEditLink()
  initEditContainer()

  function initEditLink() {
    node.addEventListener('click', function (event) {
      const { target } = event

      if(target.tagName === 'A' && target.hasAttribute("data-custom-form-answer-id")) {
        event.preventDefault()
        event.stopPropagation()

        const answerId = target.getAttribute("data-custom-form-answer-id")

        fetchForm(answerId)
      }
    })
  }

  function initEditContainer() {
    node.addEventListener('submit', function (event) {
      const { target } = event

      if(node.querySelector('input[type="submit"]')) {
        event.preventDefault()
        event.stopPropagation()

        submitForm()
      }
    })

    node.addEventListener('change', function (event) {
      const { target } = event

      if(target.tagName === 'SELECT' || (target.getAttribute('type') === 'checkbox' && !node.querySelector('input[type="submit"]'))) {
        event.preventDefault()
        event.stopPropagation()

        const form = node.querySelector('form')
        const data = new URLSearchParams(new FormData(form))
        const answerId = form.getAttribute('data-custom-form-answer-id')

        submitForm()
      }
    })

    node.addEventListener('keypress', function (event) {
      const { target } = event

      if(event.key === 'Enter' && target.tagName === 'INPUT') {
        event.preventDefault()
        event.stopPropagation()

        submitForm()
      }
    })
  }

  function fetchForm(answerId) {
    fetch(storePath(`/async/custom_form_answers/${answerId}`))
      .then((response) => response.text())
      .then((text) => {
        node.innerHTML = text
      })
  }

  function submitForm() {
    const form = node.querySelector('form')
    const data = new URLSearchParams(new FormData(form))
    const answerId = form.getAttribute('data-custom-form-answer-id')

    fetch(storePath(`/async/custom_form_answers/${answerId}`), {
      method: 'PUT',
      body: data
    })
      .then((response) => response.text())
      .then((text) => {
        node.innerHTML = text
      })
  }
}
