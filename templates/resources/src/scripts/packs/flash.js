document.addEventListener('sc.notice', (event) => {
  const containers = document.querySelectorAll('[data-notice]')
  containers.forEach((container) => {
    container.textContent = event.detail.message
    container.parentElement.classList.remove('sc-hide')
  })
})

document.addEventListener('sc.alert', (event) => {
  const containers = document.querySelectorAll('[data-alert]')
  containers.forEach((container) => {
    container.textContent = event.detail.message
    container.parentElement.classList.remove('sc-hide')
  })
})
