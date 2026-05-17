import { create } from 'zustand'
import { api } from '../config/api.js'

export const useDesignStore = create((set, get) => ({
  currentDesign: null,
  designsList: [],
  generationProgress: 0,
  generationStatus: 'idle',
  isLoading: false,
  error: null,
  
  generateDesign: async (prompt, style) => {
    set({ isLoading: true, error: null, generationStatus: 'generating' })
    
    try {
      const data = await api.post('/designs/generate', { prompt, style })
      set({ 
        currentDesign: data.design,
        isLoading: false,
        generationStatus: 'completed'
      })
      
      const existing = get().designsList
      const newDesigns = [data.design, ...existing]
      set({ designsList: newDesigns })
      
      return { success: true, design: data.design }
    } catch (error) {
      console.error('Error generating design:', error)
      set({ 
        isLoading: false, 
        generationStatus: 'failed',
        error: error.message 
      })
      return { success: false, message: error.message }
    }
  },
  
  fetchDesigns: async () => {
    set({ isLoading: true })
    try {
      const data = await api.get('/designs')
      set({ designsList: data.designs, isLoading: false })
    } catch (error) {
      console.error('Error fetching designs:', error)
      set({ isLoading: false, designsList: [] })
    }
  },
  
  saveDesign: async (designData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.post('/designs', designData)
      const newDesigns = [data.design, ...get().designsList]
      set({
        designsList: newDesigns,
        currentDesign: data.design,
        isLoading: false
      })
      return { success: true, design: data.design }
    } catch (error) {
      set({ isLoading: false, error: error.message })
      return { success: false, message: error.message }
    }
  },
  
  deleteDesign: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/designs/${id}`)
      const newDesigns = get().designsList.filter(d => d.id !== id)
      set({
        designsList: newDesigns,
        currentDesign: get().currentDesign?.id === id ? null : get().currentDesign,
        isLoading: false
      })
    } catch (error) {
      set({ isLoading: false, error: error.message })
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
