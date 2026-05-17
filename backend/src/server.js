import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server as SocketIO } from 'socket.io'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import designRoutes from './routes/designs.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const isVercel = !!process.env.VERCEL || !!process.env.NOW_REGION

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))
app.use(express.json())

app.use('/api/designs', designRoutes)
app.use('/api/auth', authRoutes)

app.get('/api/health', async (req, res) => {
  res.json({ status: 'ok', message: 'StarryStudio API is running' })
})

app.get('/', async (req, res) => {
  res.json({ status: 'ok', message: 'StarryStudio API' })
})

if (!isVercel) {
  connectDB()
  const server = http.createServer(app)
  const io = new SocketIO(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  })

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)
    socket.on('join-room', (userId) => {
      socket.join(`user-${userId}`)
    })
    socket.on('design-update', (data) => {
      socket.to(`user-${data.userId}`).emit('design-synced', data)
    })
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  const PORT = process.env.PORT || 3001
  server.listen(PORT, () => {
    console.log(`StarryStudio API server running on port ${PORT}`)
  })
}

export default app
