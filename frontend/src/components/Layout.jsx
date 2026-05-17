import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()
  
  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">STARRYSTUDIO</span>
          </Link>
          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              HOME
            </Link>
            <Link to="/design" className={`nav-link ${isActive('/design') ? 'active' : ''}`}>
              DESIGN
            </Link>
            <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>
              GALLERY
            </Link>
            {isAuthenticated ? (
              <div className="nav-user">
                <span className="nav-username">{user?.name}</span>
                <button className="nav-logout-btn" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link to="/auth" className={`nav-link ${isActive('/auth') ? 'active' : ''}`}>
                SIGN IN
              </Link>
            )}
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>© 2026 STARRYSTUDIO</p>
      </footer>
    </div>
  )
}

export default Layout
