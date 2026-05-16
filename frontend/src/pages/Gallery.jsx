import React, { useEffect } from 'react'
import { useDesignStore } from '../stores/designStore'
import './Gallery.css'

const Gallery = () => {
  const { designsList, fetchDesigns } = useDesignStore()

  useEffect(() => {
    fetchDesigns()
  }, [])

  return (
    <div className="gallery">
      <div className="container">
        <div className="gallery-header">
          <h1 className="gallery-title">GALLERY</h1>
          <div className="gallery-filters">
            <button className="filter-btn active">ALL</button>
            <button className="filter-btn">MY DESIGNS</button>
            <button className="filter-btn">SAVED</button>
          </div>
        </div>

        <div className="gallery-grid">
          {designsList.map((design, index) => (
            <div key={design.id} className="design-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="design-image">
                <div className="design-placeholder"></div>
              </div>
              <div className="design-info">
                <h3 className="design-title">{design.title}</h3>
                <div className="design-meta">
                  <span className="design-style">{design.style}</span>
                  <span className="design-likes">• {design.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery
