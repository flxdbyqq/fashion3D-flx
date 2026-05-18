import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from '../src/config/db.js'
import designRoutes from '../src/routes/designs.js'
import authRoutes from '../src/routes/auth.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))
app.use(express.json())

app.use('/api/designs', designRoutes)
app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'StarryStudio API is running' })
})

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'StarryStudio API' })
})

export default app
