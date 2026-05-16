import express from 'express'
import { generateDesign, getDesignStatus, getDesigns, saveDesign, deleteDesign } from '../controllers/designController.js'

const router = express.Router()

router.post('/generate', generateDesign)
router.get('/status/:id', getDesignStatus)
router.get('/', getDesigns)
router.post('/', saveDesign)
router.delete('/:id', deleteDesign)

export default router
