let authToken = ''

const setAuthToken = (token) => {
  authToken = token
}

const clearAuthToken = () => {
  authToken = ''
}

const isPreview = typeof window !== 'undefined' && (
  window.location.hostname.includes('agent-sandbox') ||
  window.location.hostname.includes('trae') ||
  window.location.hostname.includes('.cn')
)

const backendHost = isPreview ? window.location.hostname.replace(/run-agent-[^-]*-preview/, 'run-agent-$1') : null

export const API_BASE_URL = isPreview
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api')

const buildHeaders = () => {
  const headers = { 'Content-Type': 'application/json' }
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }
  return headers
}

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: buildHeaders()
    })
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json()
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: `API Error: ${response.status}` }))
      throw new Error(error.message || `API Error: ${response.status}`)
    }
    return response.json()
  },
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: buildHeaders()
    })
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json()
  }
}

export { setAuthToken, clearAuthToken }
