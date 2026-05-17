import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import DesignStudio from './pages/DesignStudio.jsx'
import Gallery from './pages/Gallery.jsx'
import Profile from './pages/Profile.jsx'
import AuthPage from './pages/Auth.jsx'
import { useAuthStore } from './stores/authStore.js'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }
  return children
}

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/design" replace /> : <AuthPage />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/design" element={<Layout><ProtectedRoute><DesignStudio /></ProtectedRoute></Layout>} />
        <Route path="/gallery" element={<Layout><ProtectedRoute><Gallery /></ProtectedRoute></Layout>} />
        <Route path="/profile" element={<Layout><ProtectedRoute><Profile /></ProtectedRoute></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
