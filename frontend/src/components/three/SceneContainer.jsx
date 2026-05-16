import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei'
import Model from './Model'
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
      return (
        <div className="scene-placeholder">
          <div className="placeholder-content">
            <span className="placeholder-icon">👗</span>
            <p className="placeholder-text">3D Preview</p>
            <p className="placeholder-hint">WebGL not available in preview</p>
          </div>
        </div>
      )
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

const SceneContainer = () => {
  return (
    <div className="scene-container">
      <ErrorBoundary>
        <ThreeScene />
      </ErrorBoundary>
      
      <div className="scene-overlay">
        <p className="scene-hint">DRAG TO ROTATE · SCROLL TO ZOOM</p>
      </div>
    </div>
  )
}

export default SceneContainer
