import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo animate-fadeIn">
              <svg className="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 8L22 16H30L24 21L26 29L20 24L14 29L16 21L10 16H18L20 8Z" fill="currentColor" />
              </svg>
              <span className="hero-brand">STARRYSTUDIO</span>
            </div>
            <h2 className="hero-title animate-fadeInUp delay-200">
              CREATE YOUR<br />PERFECT DESIGN
            </h2>
            <p className="hero-subtitle animate-fadeInUp delay-400">
              Transform your ideas into stunning 3D fashion designs<br />
              with the power of artificial intelligence
            </p>
            <div className="hero-actions animate-fadeInUp delay-600">
              <Link to="/design" className="btn btn-primary btn-large">
                START DESIGNING
              </Link>
              <Link to="/gallery" className="btn btn-secondary btn-large">
                EXPLORE GALLERY
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card animate-fadeInUp">
              <div className="feature-number">01</div>
              <h3 className="feature-title">DESCRIBE</h3>
              <p className="feature-description">
                Simply describe your vision in words. Let your imagination flow.
              </p>
            </div>
            <div className="feature-card animate-fadeInUp delay-200">
              <div className="feature-number">02</div>
              <h3 className="feature-title">GENERATE</h3>
              <p className="feature-description">
                AI transforms your ideas into beautiful 3D designs instantly.
              </p>
            </div>
            <div className="feature-card animate-fadeInUp delay-400">
              <div className="feature-number">03</div>
              <h3 className="feature-title">PERFECT</h3>
              <p className="feature-description">
                Refine and perfect your design until it's exactly what you want.
              </p>
            </div>
            <div className="feature-card animate-fadeInUp delay-600">
              <div className="feature-number">04</div>
              <h3 className="feature-title">EXPORT</h3>
              <p className="feature-description">
                Export your designs in multiple formats for production or sharing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
