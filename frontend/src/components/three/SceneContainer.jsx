import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei'
import Model from './Model'
import { useDesignStore } from '../../stores/designStore'
import './SceneContainer.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

const ThreeScene = () => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={45} />
      <OrbitControls 
        enablePan={false} 
        minDistance={3} 
        maxDistance={10} 
        maxPolarAngle={Math.PI / 2.1}
      />
      
      <color attach="background" args={['#f8f8f8']} />
      
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1}
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#666666" />
      
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      
      <ContactShadows 
        resolution={1024} 
        scale={10} 
        blur={2} 
        opacity={0.15} 
        far={4.5}
        color="#000000"
      />
    </Canvas>
  )
}

const FashionSketch = ({ prompt }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    setLoading(true)
    setImgLoaded(false)
    const encodedPrompt = encodeURIComponent(`highly artistic 2D fashion sketch, expressive line drawing illustration, detailed fashion line art with design elements, creative sketch of: ${prompt}, full body figure from head to toe, elegant fashion illustration, minimal line art style, clean background`)
    const url = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=square_hd`
    setImageUrl(url)
  }, [prompt])

  return (
    <div className="preview-image sketch-image">
      {loading ? (
        <div className="sketch-loading">
          <div className="sketch-outline">
            <svg viewBox="0 0 200 400" width="200" height="400" className="sketch-svg">
              <ellipse cx="100" cy="30" rx="20" ry="25" fill="none" stroke="#ddd" strokeWidth="1.5" />
              <path d="M100 55 L100 100" fill="none" stroke="#ddd" strokeWidth="1.5" />
              <path d="M80 70 L120 70" fill="none" stroke="#ddd" strokeWidth="1.5" />
              <path d="M85 100 L70 180 L75 300 L85 380" fill="none" stroke="#ddd" strokeWidth="1.5" />
              <path d="M115 100 L130 180 L125 300 L115 380" fill="none" stroke="#ddd" strokeWidth="1.5" />
              <path d="M70 180 L130 180 L120 250 L80 250 Z" fill="none" stroke="#ddd" strokeWidth="1.5" />
              <path d="M75 300 L125 300" fill="none" stroke="#ddd" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="preview-status">GENERATING SKETCH</p>
          <p className="preview-subtitle">AI is drawing your design...</p>
        </div>
      ) : (
        <>
          {!imgLoaded && (
            <div className="sketch-loading">
              <div className="sketch-outline">
                <svg viewBox="0 0 200 400" width="200" height="400" className="sketch-svg">
                  <ellipse cx="100" cy="30" rx="20" ry="25" fill="none" stroke="#ddd" strokeWidth="1.5" />
                  <path d="M100 55 L100 100" fill="none" stroke="#ddd" strokeWidth="1.5" />
                  <path d="M80 70 L120 70" fill="none" stroke="#ddd" strokeWidth="1.5" />
                  <path d="M85 100 L70 180 L75 300 L85 380" fill="none" stroke="#ddd" strokeWidth="1.5" />
                  <path d="M115 100 L130 180 L125 300 L115 380" fill="none" stroke="#ddd" strokeWidth="1.5" />
                  <path d="M70 180 L130 180 L120 250 L80 250 Z" fill="none" stroke="#ddd" strokeWidth="1.5" />
                  <path d="M75 300 L125 300" fill="none" stroke="#ddd" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="preview-status">LOADING IMAGE</p>
            </div>
          )}
          <img 
            src={imageUrl} 
            alt={`Fashion sketch: ${prompt}`}
            className="sketch-img"
            style={{ display: imgLoaded ? 'block' : 'none' }}
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              setLoading(true)
              setTimeout(() => {
                setLoading(false)
              }, 2000)
            }}
          />
        </>
      )}
    </div>
  )
}

const DesignPreview = () => {
  const { currentDesign, generationStatus } = useDesignStore()

  if (generationStatus === 'generating' || generationStatus === 'processing') {
    return (
      <div className="scene-preview generating">
        <div className="preview-content">
          <div className="loading-ring">
            <div className="ring-outer"></div>
            <div className="ring-inner"></div>
          </div>
          <p className="preview-status">GENERATING DESIGN</p>
          <p className="preview-subtitle">AI is crafting your creation...</p>
        </div>
      </div>
    )
  }

  if (currentDesign && generationStatus === 'completed') {
    return (
      <div className="scene-preview completed">
        <div className="preview-content">
          <FashionSketch prompt={currentDesign.prompt} />
          <div className="preview-details">
            <p className="preview-label">DESIGN PREVIEW</p>
            <h3 className="preview-title">{currentDesign.title}</h3>
            <span className="preview-style">{currentDesign.style}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="scene-preview empty">
      <div className="preview-content">
        <span className="preview-emoji-small">✨</span>
        <p className="preview-label">DESIGN STUDIO</p>
        <p className="preview-subtitle">Describe your vision to start creating</p>
      </div>
    </div>
  )
}

const SceneContainer = () => {
  const { generationStatus } = useDesignStore()
  const isPreviewMode = typeof window !== 'undefined' && (
    window.location.hostname.includes('agent-sandbox') ||
    window.location.hostname.includes('trae') ||
    window.location.hostname.includes('.cn')
  )

  if (isPreviewMode) {
    return (
      <div className="scene-container">
        <DesignPreview />
        <div className="scene-overlay">
          <p className="scene-hint">
            {generationStatus === 'completed' ? '✨ SKETCH GENERATED' : 'ENTER YOUR VISION TO CREATE'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="scene-container">
      <ErrorBoundary fallback={<DesignPreview />}>
        <ThreeScene />
      </ErrorBoundary>
      
      <div className="scene-overlay">
        <p className="scene-hint">DRAG TO ROTATE · SCROLL TO ZOOM</p>
      </div>
    </div>
  )
}

export default SceneContainer
