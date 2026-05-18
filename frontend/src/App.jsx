import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import DesignStudio from './pages/DesignStudio.jsx'
import Gallery from './pages/Gallery.jsx'
import Profile from './pages/Profile.jsx'
import AuthPage from './pages/Auth.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Layout><AuthPage /></Layout>} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/design" element={<Layout><DesignStudio /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
