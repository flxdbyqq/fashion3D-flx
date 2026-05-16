import { create } from 'zustand'
import { api, API_BASE_URL } from '../config/api.js'

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  
  login: async (userData) => {
    set({ isLoading: true })
    try {
      const data = await api.post('/auth/login', userData)
      localStorage.setItem('token', data.token)
      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true,
        isLoading: false 
      })
      return data
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
  
  register: async (userData) => {
    set({ isLoading: true })
    try {
      const data = await api.post('/auth/register', userData)
      localStorage.setItem('token', data.token)
      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true,
        isLoading: false 
      })
      return data
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
  
  logout: () => {
    localStorage.removeItem('token')
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false 
    })
  },
  
  checkAuth: async () => {
    const token = get().token
    if (!token) return
    
    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Auth failed')
      }
      
      const data = await response.json()
      set({ 
        user: data.user, 
        isAuthenticated: true,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        isLoading: false 
      })
      localStorage.removeItem('token')
    }
  }
}))
