import { Float } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import MoonTexture from '../assets/moon-Texture-Cartoon.webp'

export default function MoonScene() {
  const meshRef = useRef()

  const moonTexture = new THREE.TextureLoader().load(MoonTexture)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      {/* 🌕 LUNA */}
      <Float
        floatIntensity={2}
        speed={5}
        rotationIntensity={0}
      >
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <sphereGeometry args={[4, 128, 128]} />
          <meshStandardMaterial
            map={moonTexture}
            roughness={1}
            metalness={0.4}
          />
        </mesh>
      </Float>
    </>
  )
}
