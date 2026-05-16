let designs = [
  {
    id: '1',
    title: 'Celestial Evening',
    style: 'Editorial',
    prompt: 'An elegant evening gown with delicate embroidery',
    status: 'completed',
    modelUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Spring Bloom',
    style: 'Minimal',
    prompt: 'A light spring dress with floral patterns',
    status: 'completed',
    modelUrl: null,
    createdAt: new Date().toISOString()
  }
]

export const generateDesign = async (req, res) => {
  try {
    const { prompt, style } = req.body
    
    const newDesign = {
      id: Date.now().toString(),
      title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
      style: style || 'Editorial',
      prompt,
      status: 'generating',
      modelUrl: null,
      createdAt: new Date().toISOString()
    }
    
    designs.unshift(newDesign)
    
    setTimeout(() => {
      const index = designs.findIndex(d => d.id === newDesign.id)
      if (index !== -1) {
        designs[index].status = 'completed'
      }
    }, 5000)
    
    res.status(202).json({
      success: true,
      design: newDesign
    })
  } catch (error) {
    console.error('Error generating design:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to generate design'
    })
  }
}

export const getDesignStatus = async (req, res) => {
  try {
    const { id } = req.params
    const design = designs.find(d => d.id === id)
    
    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found'
      })
    }
    
    res.json({
      success: true,
      design
    })
  } catch (error) {
    console.error('Error getting design status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get design status'
    })
  }
}

export const getDesigns = async (req, res) => {
  try {
    res.json({
      success: true,
      designs
    })
  } catch (error) {
    console.error('Error getting designs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get designs'
    })
  }
}

export const saveDesign = async (req, res) => {
  try {
    const designData = req.body
    const newDesign = {
      id: Date.now().toString(),
      ...designData,
      createdAt: new Date().toISOString()
    }
    
    designs.unshift(newDesign)
    
    res.status(201).json({
      success: true,
      design: newDesign
    })
  } catch (error) {
    console.error('Error saving design:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to save design'
    })
  }
}

export const deleteDesign = async (req, res) => {
  try {
    const { id } = req.params
    designs = designs.filter(d => d.id !== id)
    
    res.json({
      success: true,
      message: 'Design deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting design:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete design'
    })
  }
}
