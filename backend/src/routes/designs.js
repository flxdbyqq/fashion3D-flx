import express from 'express'
import { auth } from '../middleware/auth.js'
import { generateDesign, getDesignStatus, getDesigns, saveDesign, deleteDesign } from '../controllers/designController.js'

const router = express.Router()

router.use(auth)

router.post('/generate', generateDesign)
router.get('/status/:id', getDesignStatus)
router.get('/', getDesigns)
router.post('/', saveDesign)
router.delete('/:id', deleteDesign)

export default router
