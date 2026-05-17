import React, { useEffect, useState } from 'react'
import { useDesignStore } from '../stores/designStore'
import './Gallery.css'

const DesignThumbnail = ({ prompt, style, id }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [error, setError] = useState(false)

  const getColor = (prompt) => {
    if (!prompt) return '#f0f0f0'
    const lower = prompt.toLowerCase()
    if (lower.includes('red') || lower.includes('红')) return '#dc2626'
    if (lower.includes('blue') || lower.includes('蓝')) return '#2563eb'
    if (lower.includes('green') || lower.includes('绿')) return '#16a34a'
    if (lower.includes('black') || lower.includes('黑')) return '#1a1a2e'
    if (lower.includes('white') || lower.includes('白')) return '#ffffff'
    if (lower.includes('pink') || lower.includes('粉')) return '#ec4899'
    if (lower.includes('gold') || lower.includes('金')) return '#d4af37'
    if (lower.includes('purple') || lower.includes('紫')) return '#7c3aed'
    return '#999999'
  }

  const color = getColor(prompt)

  useEffect(() => {
    setLoading(true)
    setImgLoaded(false)
    setError(false)
    const encodedPrompt = encodeURIComponent(`highly artistic 2D fashion sketch, expressive line drawing illustration, detailed fashion line art with design elements, creative sketch of: ${prompt}, full body figure from head to toe, elegant fashion illustration, minimal line art style, clean background`)
    const url = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=square_hd`
    setImageUrl(url)
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [prompt])

  return (
    <div className="design-image" style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)` }}>
      {loading ? (
        <div className="design-placeholder" style={{ borderTopColor: color }}>
          <svg viewBox="0 0 80 160" width="40" height="80" className="design-sketch">
            <ellipse cx="40" cy="12" rx="8" ry="10" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M40 22 L40 45" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M32 30 L48 30" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M34 45 L28 75 L30 120 L34 150" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M46 45 L52 75 L50 120 L46 150" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M28 75 L52 75 L48 100 L32 100 Z" fill="none" stroke={color} strokeWidth="1.5" />
          </svg>
        </div>
      ) : (
        <>
          {!imgLoaded && !error && (
            <div className="design-placeholder" style={{ borderTopColor: color }}>
              <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.5 }}>LOADING...</p>
            </div>
          )}
          {error && (
            <div className="design-placeholder" style={{ borderTopColor: color }}>
              <p style={{ fontSize: '0.65rem', marginTop: '0.5rem', opacity: 0.5 }}>FAILED</p>
            </div>
          )}
          <img 
            src={imageUrl} 
            alt={prompt}
            className="design-sketch-img"
            style={{ display: imgLoaded ? 'block' : 'none' }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setError(true)}
          />
        </>
      )}
    </div>
  )
}

const Gallery = () => {
  const { designsList, fetchDesigns } = useDesignStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDesigns = async () => {
      setIsLoading(true)
      await fetchDesigns()
      setIsLoading(false)
    }
    loadDesigns()
  }, [fetchDesigns])

  if (isLoading) {
    return (
      <div className="gallery">
        <div className="container">
          <div className="gallery-header">
            <h1 className="gallery-title">GALLERY</h1>
          </div>
          <div className="gallery-empty">
            <span className="gallery-empty-icon">⏳</span>
            <h3>Loading...</h3>
          </div>
        </div>
      </div>
    )
  }

  if (designsList.length === 0) {
    return (
      <div className="gallery">
        <div className="container">
          <div className="gallery-header">
            <h1 className="gallery-title">GALLERY</h1>
          </div>
          <div className="gallery-empty">
            <span className="gallery-empty-icon">✏️</span>
            <h3>No Designs Yet</h3>
            <p>Create your first design in the Design Studio</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery">
      <div className="container">
        <div className="gallery-header">
          <h1 className="gallery-title">GALLERY</h1>
          <div className="gallery-filters">
            <button className="filter-btn active">ALL ({designsList.length})</button>
          </div>
        </div>

        <div className="gallery-grid">
          {designsList.map((design, index) => (
            <div key={design.id || design._id} className="design-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <DesignThumbnail prompt={design.prompt} style={design.style} id={design.id || design._id} />
              <div className="design-info">
                <h3 className="design-title">{design.title}</h3>
                <div className="design-meta">
                  <span className="design-style">{design.style}</span>
                  <span className="design-date">
                    {new Date(design.createdAt).toLocaleDateString()}
                  </span>
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
