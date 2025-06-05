import { Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import MoonTexture from '../assets/moonTexture.png'
import MoonMap from '../assets/NormalMapMoon.jpg'

export default function MoonScene() {
  const meshRef = useRef()

  const moonTexture = new THREE.TextureLoader().load(MoonTexture);
  const moonNormal = new THREE.TextureLoader().load(MoonMap);

  return (
    <>
      <ambientLight intensity={0.65} />
      {/* 🌕 LUNA */}
      <Float floatIntensity={2} speed={2} rotationIntensity={1.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <sphereGeometry args={[4, 128, 128]} />
          <meshStandardMaterial map={moonTexture} normalMap={moonNormal} roughness={1} metalness={0.4}/>
        </mesh>
      </Float>
    </>
  )
}