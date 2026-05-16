const isPreview = typeof window !== 'undefined' && (
  window.location.hostname.includes('agent-sandbox') ||
  window.location.hostname.includes('trae') ||
  window.location.hostname.includes('.cn')
)

const backendHost = isPreview ? window.location.hostname.replace(/run-agent-[^-]*-preview/, 'run-agent-$1') : null

// In preview: use the preview domain's /api path (Vite proxy handles it on localhost)
// In local dev: use direct localhost:3001
export const API_BASE_URL = isPreview
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api')

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json()
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json()
  },
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json()
  }
}
