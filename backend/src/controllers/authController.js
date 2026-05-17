import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import connectDB from '../config/db.js'

export const register = async (req, res) => {
  try {
    await connectDB()
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered' })
    }

    const user = new User({ email, password, name })
    await user.save()

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'starrystudio-secret-key',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      success: true,
      user: { id: user._id, email: user.email, name: user.name },
      token
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ success: false, message: error.message || 'Failed to register' })
  }
}

export const login = async (req, res) => {
  try {
    await connectDB()
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'starrystudio-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      user: { id: user._id, email: user.email, name: user.name },
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: error.message || 'Failed to login' })
  }
}

export const logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' })
}

export const getProfile = async (req, res) => {
  try {
    await connectDB()
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to get profile' })
  }
}
