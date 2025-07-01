const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function apiFetch(path, options = {}) {
  const response = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  })

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}
