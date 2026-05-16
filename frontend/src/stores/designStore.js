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
      set({ isLoading: false, error: error.message, generationStatus: 'failed' })
      throw error
    }
  },
  
  fetchDesigns: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.get('/designs')
      set({ designsList: data.designs, isLoading: false })
    } catch (error) {
      set({ isLoading: false, error: error.message })
      throw error
    }
  },
  
  saveDesign: async (designData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.post('/designs', designData)
      set(state => ({
        designsList: [data.design, ...state.designsList],
        currentDesign: data.design,
        isLoading: false
      }))
      return data
    } catch (error) {
      set({ isLoading: false, error: error.message })
      throw error
    }
  },
  
  deleteDesign: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/designs/${id}`)
      set(state => ({
        designsList: state.designsList.filter(d => d.id !== id),
        currentDesign: state.currentDesign?.id === id ? null : state.currentDesign,
        isLoading: false
      }))
    } catch (error) {
      set({ isLoading: false, error: error.message })
      throw error
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
