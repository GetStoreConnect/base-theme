import { onDomChange } from '../theme/utils/init'
import storePath from '../theme/store-path-url'

onDomChange(init)

function init(node) {
  ;[...node.querySelectorAll('[data-custom-form-answer]')].forEach((formAnswerNode) =>
    configure(formAnswerNode)
  )
  ;[...node.querySelectorAll('input[type="file"][data-cloudinary-upload-url]')].forEach((input) =>
    initCloudinaryUpload(input)
  )
}

function initCloudinaryUpload(input) {
  const form = input.closest('form')

  form.addEventListener('submit', submitFormWithDirectUploads)
}

function submitFormWithDirectUploads(event) {
  event.preventDefault()
  event.stopPropagation()

  const form = event.target
  const submit = form.querySelector('input[type="submit"]')
  const fileInputs = form.querySelectorAll('input[type="file"][data-cloudinary-upload-url]')

  let uploadPromises = []

  if (submit) {
    submit.disabled = true
  }

  fileInputs.forEach((input) => {
    const wrapper = input.closest('[data-cloudinary-upload-wrapper]')
    const progress = wrapper.querySelector('.SC-Progress .SC-Percentage')
    const file = input.files[0]
    const uploadUrl = input.dataset.cloudinaryUploadUrl

    input.disabled = true

    if (file && uploadUrl) {
      progress.parentElement.classList.remove('sc-hide')

      const uploadPromise = new Promise((resolve, reject) => {
        const uploadData = new FormData()

        uploadData.append('file', file)

        const xhr = new XMLHttpRequest()

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const json = JSON.parse(xhr.responseText)

            resolve({
              answerField: input.dataset.answerField,
              answerValue: json.original_filename,
              urlField: input.dataset.urlField,
              urlValue: json.secure_url,
            })
          } else {
            reject(new Error('Upload failed'))
          }
        })
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && progress) {
            const percentage = Math.round((event.loaded / event.total) * 100)

            progress.parentElement.classList.remove('sc-hide')
            progress.classList.remove(...progress.classList)
            progress.classList.add('SC-Percentage', 'SC-Percentage-' + percentage)
          }
        })

        xhr.open('POST', input.dataset.cloudinaryUploadUrl)
        xhr.send(uploadData)
      })

      uploadPromises.push(uploadPromise)
    }
  })

  Promise.all(uploadPromises).then((values) => {
    values.forEach((value) => {
      const answerField = form.querySelector(`input[name="${value.answerField}"]`)
      const urlField = form.querySelector(`input[name="${value.urlField}"]`)
      const answerValue = value.answerValue
      const urlValue = value.urlValue

      if (answerField) {
        answerField.value = answerValue
      }
      if (urlField) {
        urlField.value = urlValue
      }
    })

    const event = new Event('cloudinary-uploads:end', { bubbles: true })

    form.dispatchEvent(event)

    if (form.action) {
      form.submit()
    }
  })
}

function configure(node) {
  initEditLink()
  initEditContainer()

  function initEditLink() {
    node.addEventListener('click', function (event) {
      const { target } = event

      if (target.tagName === 'A' && target.hasAttribute('data-custom-form-answer-id')) {
        event.preventDefault()
        event.stopPropagation()

        const answerId = target.getAttribute('data-custom-form-answer-id')

        fetchForm(answerId)
      }
    })
  }

  function initEditContainer() {
    node.addEventListener('cloudinary-uploads:end', function (event) {
      if (node.querySelector('input[type="submit"]')) {
        event.preventDefault()
        event.stopPropagation()

        submitForm()
      }
    })

    node.addEventListener('submit', function (event) {
      event.preventDefault()
      event.stopPropagation()

      if (node.querySelector('input[data-cloudinary-upload-url]')) {
        return
      }

      submitForm()
    })

    node.addEventListener('change', function (event) {
      const { target } = event

      if (
        target.tagName === 'SELECT' ||
        (target.getAttribute('type') === 'checkbox' && !node.querySelector('input[type="submit"]'))
      ) {
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

      if (event.key === 'Enter' && target.tagName === 'INPUT') {
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
      body: data,
    })
      .then((response) => response.text())
      .then((text) => {
        node.innerHTML = text
      })
  }
}
