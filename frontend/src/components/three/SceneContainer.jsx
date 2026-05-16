import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei'
import Model from './Model'
import './SceneContainer.css'

const SceneContainer = () => {
  return (
    <div className="scene-container">
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
        
        <Environment preset="city" />
        
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
      
      <div className="scene-overlay">
        <p className="scene-hint">DRAG TO ROTATE · SCROLL TO ZOOM</p>
      </div>
    </div>
  )
}

export default SceneContainer
