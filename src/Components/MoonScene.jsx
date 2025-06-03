import { Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function MoonScene() {
  const meshRef = useRef()

  const moonTexture = new THREE.TextureLoader().load('public/moonTexture.png');
  const moonNormal = new THREE.TextureLoader().load('public/NormalMapMoon.jpg');

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0} />

      {/* 🌕 LUNA */}
      <Float floatIntensity={2} speed={2}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <sphereGeometry args={[4, 128, 128]} />
          <meshStandardMaterial map={moonTexture} normalMap={moonNormal} roughness={1} metalness={0.4}/>
        </mesh>
      </Float>
    </>
  )
}