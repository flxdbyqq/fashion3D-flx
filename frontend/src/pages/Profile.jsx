import React from 'react'
import { useAuthStore } from '../stores/authStore'
import './Profile.css'

const Profile = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore()

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <h1 className="profile-title">PROFILE</h1>
        </div>

        {isAuthenticated ? (
          <div className="profile-content">
            <div className="profile-card">
              <div className="profile-avatar">
                <span className="avatar-initial">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <h2 className="profile-name">{user?.name || 'User'}</h2>
              <p className="profile-email">{user?.email || 'user@example.com'}</p>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">12</span>
                  <span className="stat-label">DESIGNS</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">48</span>
                  <span className="stat-label">SAVED</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">256</span>
                  <span className="stat-label">LIKES</span>
                </div>
              </div>

              <button className="logout-btn" onClick={logout}>
                SIGN OUT
              </button>
            </div>

            <div className="profile-settings">
              <h3 className="settings-title">SETTINGS</h3>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Auto-Sync</h4>
                  <p>Sync your designs across all devices</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Notifications</h4>
                  <p>Get notified when your design is ready</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>High Quality</h4>
                  <p>Render designs in higher resolution</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-guest">
            <div className="guest-card">
              <div className="guest-icon">STARRYSTUDIO</div>
              <h2>Welcome to StarryStudio</h2>
              <p>Sign in to save your designs, sync across devices, and join our creative community.</p>
              <button className="login-btn" onClick={() => login({ name: 'Designer', email: 'designer@example.com' })}>
                SIGN IN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
