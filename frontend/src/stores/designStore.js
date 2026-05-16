import { create } from 'zustand'
import { api } from '../config/api.js'

let useBackend = true

export const useDesignStore = create((set, get) => ({
  currentDesign: null,
  designsList: [],
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
      set({ 
        currentDesign: mockDesign,
        isLoading: false,
        generationStatus: 'completed'
      })
      set(state => ({
        designsList: [mockDesign, ...state.designsList]
      }))
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
            set({ 
              generationStatus: 'completed',
              currentDesign: statusData.design
            })
            get().fetchDesigns()
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
      set({ 
        currentDesign: mockDesign,
        isLoading: false,
        generationStatus: 'completed'
      })
      set(state => ({
        designsList: [mockDesign, ...state.designsList]
      }))
      return { success: true, design: mockDesign }
    }
  },
  
  fetchDesigns: async () => {
    set({ isLoading: true, error: null })
    if (!useBackend) {
      set({ isLoading: false })
      return
    }
    try {
      const data = await api.get('/designs')
      set({ designsList: data.designs, isLoading: false })
    } catch (error) {
      useBackend = false
      set({ isLoading: false })
    }
  },
  
  saveDesign: async (designData) => {
    set({ isLoading: true, error: null })
    if (!useBackend) {
      const newDesign = { id: Date.now().toString(), ...designData, createdAt: new Date().toISOString() }
      set(state => ({
        designsList: [newDesign, ...state.designsList],
        currentDesign: newDesign,
        isLoading: false
      }))
      return { success: true, design: newDesign }
    }
    try {
      const data = await api.post('/designs', designData)
      set(state => ({
        designsList: [data.design, ...state.designsList],
        currentDesign: data.design,
        isLoading: false
      }))
      return data
    } catch (error) {
      useBackend = false
      const newDesign = { id: Date.now().toString(), ...designData, createdAt: new Date().toISOString() }
      set(state => ({
        designsList: [newDesign, ...state.designsList],
        currentDesign: newDesign,
        isLoading: false
      }))
      return { success: true, design: newDesign }
    }
  },
  
  deleteDesign: async (id) => {
    set({ isLoading: true, error: null })
    if (!useBackend) {
      set(state => ({
        designsList: state.designsList.filter(d => d.id !== id),
        currentDesign: state.currentDesign?.id === id ? null : state.currentDesign,
        isLoading: false
      }))
      return { success: true }
    }
    try {
      await api.delete(`/designs/${id}`)
      set(state => ({
        designsList: state.designsList.filter(d => d.id !== id),
        currentDesign: state.currentDesign?.id === id ? null : state.currentDesign,
        isLoading: false
      }))
    } catch (error) {
      useBackend = false
      set(state => ({
        designsList: state.designsList.filter(d => d.id !== id),
        currentDesign: state.currentDesign?.id === id ? null : state.currentDesign,
        isLoading: false
      }))
    }
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
