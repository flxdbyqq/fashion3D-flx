import { create } from 'zustand'
import { api } from '../config/api.js'
import { useAuthStore } from './authStore.js'

const STORAGE_KEY = 'starrystudio-designs'

const getStoredDesigns = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveStoredDesigns = (designs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs))
  } catch {}
}

export const useDesignStore = create((set, get) => ({
  currentDesign: null,
  designsList: getStoredDesigns(),
  generationProgress: 0,
  generationStatus: 'idle',
  isLoading: false,
  error: null,

  generateDesign: async (prompt, style) => {
    set({ isLoading: true, error: null, generationStatus: 'generating' })
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    const mockDesign = {
      id: Date.now().toString(),
      title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
      style: style || 'Editorial',
      prompt,
      status: 'completed',
      imageUrl: '',
      createdAt: new Date().toISOString(),
      isLocal: !isAuthenticated
    }

    if (!isAuthenticated) {
      await new Promise(r => setTimeout(r, 1000))
      const newDesigns = [mockDesign, ...get().designsList]
      saveStoredDesigns(newDesigns)
      set({
        currentDesign: mockDesign,
        designsList: newDesigns,
        isLoading: false,
        generationStatus: 'completed'
      })
      return { success: true, design: mockDesign }
    }

    try {
      const data = await api.post('/designs/generate', { prompt, style })
      const newDesigns = [data.design, ...get().designsList]
      set({
        currentDesign: data.design,
        designsList: newDesigns,
        isLoading: false,
        generationStatus: 'completed'
      })
      return { success: true, design: data.design }
    } catch (error) {
      console.error('API failed, falling back to local:', error)
      const newDesigns = [mockDesign, ...get().designsList]
      saveStoredDesigns(newDesigns)
      set({
        currentDesign: mockDesign,
        designsList: newDesigns,
        isLoading: false,
        generationStatus: 'completed'
      })
      return { success: true, design: mockDesign, local: true }
    }
  },

  fetchDesigns: async () => {
    set({ isLoading: true })
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (!isAuthenticated) {
      const stored = getStoredDesigns()
      set({ designsList: stored, isLoading: false })
      return
    }

    try {
      const data = await api.get('/designs')
      set({ designsList: data.designs, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch from API:', error)
      const stored = getStoredDesigns()
      set({ designsList: stored, isLoading: false })
    }
  },

  saveDesign: async (designData) => {
    set({ isLoading: true, error: null })
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (!isAuthenticated) {
      const newDesign = {
        id: Date.now().toString(),
        ...designData,
        createdAt: new Date().toISOString(),
        isLocal: true
      }
      const newDesigns = [newDesign, ...get().designsList]
      saveStoredDesigns(newDesigns)
      set({ designsList: newDesigns, currentDesign: newDesign, isLoading: false })
      return { success: true, design: newDesign }
    }

    try {
      const data = await api.post('/designs', designData)
      const newDesigns = [data.design, ...get().designsList]
      set({ designsList: newDesigns, currentDesign: data.design, isLoading: false })
      return { success: true, design: data.design }
    } catch (error) {
      const newDesign = {
        id: Date.now().toString(),
        ...designData,
        createdAt: new Date().toISOString(),
        isLocal: true
      }
      const newDesigns = [newDesign, ...get().designsList]
      saveStoredDesigns(newDesigns)
      set({ designsList: newDesigns, currentDesign: newDesign, isLoading: false })
      return { success: true, design: newDesign, local: true }
    }
  },

  deleteDesign: async (id) => {
    set({ isLoading: true, error: null })
    const design = get().designsList.find(d => d.id === id)
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (design?.isLocal || !isAuthenticated) {
      const newDesigns = get().designsList.filter(d => d.id !== id)
      saveStoredDesigns(newDesigns)
      set({
        designsList: newDesigns,
        currentDesign: get().currentDesign?.id === id ? null : get().currentDesign,
        isLoading: false
      })
      return
    }

    try {
      await api.delete(`/designs/${id}`)
      const newDesigns = get().designsList.filter(d => d.id !== id)
      set({
        designsList: newDesigns,
        currentDesign: get().currentDesign?.id === id ? null : get().currentDesign,
        isLoading: false
      })
    } catch (error) {
      const newDesigns = get().designsList.filter(d => d.id !== id)
      saveStoredDesigns(newDesigns)
      set({ designsList: newDesigns, isLoading: false })
    }
  },

  setCurrentDesign: (design) => {
    set({ currentDesign: design })
  },

  resetGeneration: () => {
    set({ generationProgress: 0, generationStatus: 'idle', error: null })
  },

  clearError: () => {
    set({ error: null })
  }
}))
