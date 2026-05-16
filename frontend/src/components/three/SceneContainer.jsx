import React, { Suspense } from 'react'
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

const DesignPreview = () => {
  const { currentDesign, generationStatus } = useDesignStore()

  const getColorFromPrompt = (prompt) => {
    if (!prompt) return 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)'
    const lower = prompt.toLowerCase()
    if (lower.includes('red') || lower.includes('红')) return 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)'
    if (lower.includes('blue') || lower.includes('蓝')) return 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)'
    if (lower.includes('green') || lower.includes('绿')) return 'linear-gradient(135deg, #16a34a 0%, #4ade80 100%)'
    if (lower.includes('black') || lower.includes('黑')) return 'linear-gradient(135deg, #1a1a2e 0%, #333333 100%)'
    if (lower.includes('white') || lower.includes('白')) return 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)'
    if (lower.includes('pink') || lower.includes('粉')) return 'linear-gradient(135deg, #ec4899 0%, #f9a8d4 100%)'
    if (lower.includes('gold') || lower.includes('金')) return 'linear-gradient(135deg, #d4af37 0%, #f4e4ba 100%)'
    if (lower.includes('purple') || lower.includes('紫')) return 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)'
    return 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)'
  }

  const getDressEmoji = (prompt) => {
    if (!prompt) return ''
    const lower = prompt.toLowerCase()
    if (lower.includes('dress') || lower.includes('礼服') || lower.includes('裙')) return ''
    if (lower.includes('suit') || lower.includes('套装')) return '🤵'
    if (lower.includes('coat') || lower.includes('外套')) return '🧥'
    if (lower.includes('shirt') || lower.includes('衬衫')) return '👔'
    return '👗'
  }

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
          <div 
            className="preview-image" 
            style={{ background: getColorFromPrompt(currentDesign.prompt) }}
          >
            <span className="preview-emoji-main">{getDressEmoji(currentDesign.prompt)}</span>
          </div>
          <div className="preview-details">
            <p className="preview-label">DESIGN PREVIEW</p>
            <h3 className="preview-title">{currentDesign.title}</h3>
            <p className="preview-prompt">"{currentDesign.prompt}"</p>
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
            {generationStatus === 'completed' ? '✨ DESIGN GENERATED' : 'ENTER YOUR VISION TO CREATE'}
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
