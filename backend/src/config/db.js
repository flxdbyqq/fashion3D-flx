import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not set - database operations will fail')
}

let mongooseConnection = null
let connectingPromise = null

const connectDB = async () => {
  if (mongooseConnection) return mongooseConnection
  if (!MONGODB_URI) throw new Error('MONGODB_URI environment variable is required')
  if (connectingPromise) return connectingPromise

  try {
    connectingPromise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    })
    const conn = await connectingPromise
    mongooseConnection = conn.connection
    console.log('MongoDB connected')
    return mongooseConnection
  } catch (error) {
    connectingPromise = null
    throw error
  }
}

export default connectDB
