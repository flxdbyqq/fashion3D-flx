export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    res.json({
      success: true,
      user: {
        id: '1',
        email: email || 'designer@example.com',
        name: 'Designer'
      },
      token: 'mock-jwt-token'
    })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to login'
    })
  }
}

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    
    res.status(201).json({
      success: true,
      user: {
        id: Date.now().toString(),
        email,
        name: name || 'Designer'
      },
      token: 'mock-jwt-token'
    })
  } catch (error) {
    console.error('Error registering:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to register'
    })
  }
}

export const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    })
  } catch (error) {
    console.error('Error logging out:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to logout'
    })
  }
}
