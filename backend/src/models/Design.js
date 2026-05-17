import mongoose from 'mongoose'

const designSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  style: { type: String, required: true },
  prompt: { type: String, required: true },
  status: { type: String, enum: ['generating', 'completed', 'failed'], default: 'completed' },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

designSchema.index({ userId: 1, createdAt: -1 })

export default mongoose.model('Design', designSchema)
