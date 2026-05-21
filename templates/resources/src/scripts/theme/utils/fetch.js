export default async function fetchWithResponseHandler(url, options) {
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

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.statusText)
  }

  const contentType = response.headers.get('Content-Type')

  if (contentType.includes('application/json')) {
    return response.json()
  } else if (contentType.includes('text/javascript')) {
    const script = await response.text()
    return (0, eval)(script)
  } else if (contentType.includes('text/html')) {
    return response.text()
  } else {
    return response.blob()
  }
}

export function postJSON(url, data) {
  return fetchWithResponseHandler(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
}

export function putJSON(url, data) {
  return fetchWithResponseHandler(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
}

export function getJSON(url) {
  return fetchWithResponseHandler(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
}

export function deleteJSON(url) {
  return fetchWithResponseHandler(url, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  })
}

export function postForm(url, data) {
  return fetchWithResponseHandler(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  })
}

export function patchForm(url, data) {
  return fetchWithResponseHandler(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  })
}
