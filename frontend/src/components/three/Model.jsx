import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { TorusKnot, Box, Cylinder, Float, Text } from '@react-three/drei'

const Model = () => {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <TorusKnot position={[0, 0, 0]} scale={1.2}>
          <meshStandardMaterial 
            color="#000000" 
            roughness={0.3}
            metalness={0.8}
          />
        </TorusKnot>
        
        <Box position={[2, 0, 0]} scale={0.5} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#333333" 
            roughness={0.4}
            metalness={0.7}
          />
        </Box>
        
        <Cylinder position={[-2, 0, 0]} scale={0.5} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#666666" 
            roughness={0.4}
            metalness={0.7}
          />
        </Cylinder>
      </Float>
      
      <Float speed={1} rotationIntensity={0} floatIntensity={0.25}>
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.25}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qC0us.woff"
        >
          STARRYSTUDIO
        </Text>
      </Float>
    </group>
  )
}

export default Model
