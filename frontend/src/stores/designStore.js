import { create } from 'zustand'
import { api } from '../config/api.js'

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

let useBackend = true

const loadDesigns = () => {
  const stored = getStoredDesigns()
  return stored
}

export const useDesignStore = create((set, get) => ({
  currentDesign: null,
  designsList: loadDesigns(),
  generationProgress: 0,
  generationStatus: 'idle',
  isLoading: false,
  error: null,
  
  generateDesign: async (prompt, style) => {
    set({ isLoading: true, error: null, generationStatus: 'generating' })
    
    const mockDesign = {
      id: Date.now().toString(),
      title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
      style: style || 'Editorial',
      prompt,
      status: 'completed',
      modelUrl: null,
      createdAt: new Date().toISOString()
    }
    
    if (!useBackend) {
      await new Promise(r => setTimeout(r, 2000))
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
      set({ 
        currentDesign: data.design,
        isLoading: false,
        generationStatus: 'processing'
      })
      
      const pollInterval = setInterval(async () => {
        try {
          const statusData = await api.get(`/designs/status/${data.design.id}`)
          if (statusData.design.status === 'completed') {
            clearInterval(pollInterval)
            const newDesigns = [statusData.design, ...get().designsList]
            saveStoredDesigns(newDesigns)
            set({ 
              generationStatus: 'completed',
              currentDesign: statusData.design,
              designsList: newDesigns
            })
          }
        } catch (error) {
          clearInterval(pollInterval)
          set({ generationStatus: 'failed', error: error.message })
        }
      }, 2000)
      
      return data
    } catch (error) {
      console.warn('Backend API unavailable, using mock generation:', error.message)
      useBackend = false
      await new Promise(r => setTimeout(r, 2000))
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
  },
  
  fetchDesigns: async () => {
    const stored = getStoredDesigns()
    set({ designsList: stored, isLoading: false })
    
    if (useBackend) {
      try {
        const data = await api.get('/designs')
        saveStoredDesigns(data.designs)
        set({ designsList: data.designs, isLoading: false })
      } catch (error) {
        useBackend = false
      }
    }
  },
  
  saveDesign: async (designData) => {
    set({ isLoading: true, error: null })
    const newDesign = { id: Date.now().toString(), ...designData, createdAt: new Date().toISOString() }
    const newDesigns = [newDesign, ...get().designsList]
    saveStoredDesigns(newDesigns)
    set({
      designsList: newDesigns,
      currentDesign: newDesign,
      isLoading: false
    })
    return { success: true, design: newDesign }
  },
  
  deleteDesign: async (id) => {
    set({ isLoading: true, error: null })
    const newDesigns = get().designsList.filter(d => d.id !== id)
    saveStoredDesigns(newDesigns)
    set({
      designsList: newDesigns,
      currentDesign: get().currentDesign?.id === id ? null : get().currentDesign,
      isLoading: false
    })
  },
  
  setCurrentDesign: (design) => {
    set({ currentDesign: design })
  },
  
  resetGeneration: () => {
    set({ 
      generationProgress: 0, 
      generationStatus: 'idle',
      error: null 
    })
  },
  
  clearError: () => {
    set({ error: null })
  }
}))
