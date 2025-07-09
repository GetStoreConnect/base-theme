export default function fetchWithResponseHandler(url, options) {
  const method = options.method ? options.method.toUpperCase() : 'GET'

  if (method !== 'GET' && method !== 'HEAD') {
    const tag = document.querySelector('meta[name="csrf-token"]')
    const csrfToken = tag
      ? document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      : ''
    options.headers = {
      ...options.headers,
      'X-CSRF-Token': csrfToken,
    }
  }

  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText)
    }

    const contentType = response.headers.get('Content-Type')

    if (contentType.includes('application/json')) {
      return response.json()
    } else if (contentType.includes('text/javascript')) {
      return response.text().then((script) => (0, eval)(script))
    } else if (contentType.includes('text/html')) {
      return response.text()
    } else {
      return response.blob()
    }
  })
}
