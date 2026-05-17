import Design from '../models/Design.js'

export const generateDesign = async (req, res) => {
  try {
    const { prompt, style } = req.body
    const userId = req.userId

    const newDesign = new Design({
      userId,
      title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
      style: style || 'Editorial',
      prompt,
      status: 'completed',
      imageUrl: ''
    })

    await newDesign.save()

    res.status(201).json({ success: true, design: newDesign })
  } catch (error) {
    console.error('Error generating design:', error)
    res.status(500).json({ success: false, message: 'Failed to generate design' })
  }
}

export const getDesignStatus = async (req, res) => {
  try {
    const { id } = req.params
    const design = await Design.findOne({ _id: id, userId: req.userId })

    if (!design) {
      return res.status(404).json({ success: false, message: 'Design not found' })
    }

    res.json({ success: true, design })
  } catch (error) {
    console.error('Error getting design status:', error)
    res.status(500).json({ success: false, message: 'Failed to get design status' })
  }
}

export const getDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .lean()

    res.json({ success: true, designs })
  } catch (error) {
    console.error('Error getting designs:', error)
    res.status(500).json({ success: false, message: 'Failed to get designs' })
  }
}

export const saveDesign = async (req, res) => {
  try {
    const designData = req.body
    const newDesign = new Design({
      userId: req.userId,
      ...designData
    })

    await newDesign.save()

    res.status(201).json({ success: true, design: newDesign })
  } catch (error) {
    console.error('Error saving design:', error)
    res.status(500).json({ success: false, message: 'Failed to save design' })
  }
}

export const deleteDesign = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Design.findOneAndDelete({ _id: id, userId: req.userId })

    if (!result) {
      return res.status(404).json({ success: false, message: 'Design not found' })
    }

    res.json({ success: true, message: 'Design deleted successfully' })
  } catch (error) {
    console.error('Error deleting design:', error)
    res.status(500).json({ success: false, message: 'Failed to delete design' })
  }
}
