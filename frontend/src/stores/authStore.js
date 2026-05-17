import { create } from 'zustand'
import { api, setAuthToken, clearAuthToken } from '../config/api.js'

const STORAGE_KEY = 'starrystudio-auth'

const loadAuthState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.token) {
        setAuthToken(parsed.token)
        return { user: parsed.user, token: parsed.token, isAuthenticated: true }
      }
    }
  } catch {}
  return { user: null, token: null, isAuthenticated: false }
}

const saveAuthState = (user, token) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
}

const clearAuthState = () => {
  localStorage.removeItem(STORAGE_KEY)
  clearAuthToken()
}

export const useAuthStore = create((set, get) => ({
  ...loadAuthState(),
  isLoading: false,
  authError: null,

  register: async (name, email, password) => {
    set({ isLoading: true, authError: null })
    try {
      const data = await api.post('/auth/register', { name, email, password })
      setAuthToken(data.token)
      saveAuthState(data.user, data.token)
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ isLoading: false, authError: error.message })
      return { success: false, message: error.message }
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, authError: null })
    try {
      const data = await api.post('/auth/login', { email, password })
      setAuthToken(data.token)
      saveAuthState(data.user, data.token)
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ isLoading: false, authError: error.message })
      return { success: false, message: error.message }
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } catch {}
    clearAuthState()
    set({ user: null, token: null, isAuthenticated: false })
  },

  clearError: () => set({ authError: null })
}))
