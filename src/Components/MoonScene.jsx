import { Float } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import MoonTexture from '../assets/moon-Texture-Cartoon.webp'

export default function MoonScene() {
  const meshRef = useRef()
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mobile = /Mobi|Android/i.test(navigator.userAgent)
    setIsMobile(mobile)

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const moonTexture = new THREE.TextureLoader().load(MoonTexture)
  moonTexture.generateMipmaps = true
  moonTexture.minFilter = THREE.LinearMipmapLinearFilter

  // Ajusta rotación según dispositivo y preferencias
  useFrame((state, delta) => {
    if (meshRef.current) {
      const rotationSpeed = isMobile || reducedMotion ? 0.05 : 0.2
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  // LOD 
  const segments = isMobile ? 12 : 24

  return (
    <>
      <ambientLight intensity={0.25} />
      
      {!reducedMotion && (
        <Float
          floatIntensity={isMobile ? 0.1 : 2}
          speed={isMobile ? 1 : 3}
          rotationIntensity={0}
        >
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[4, segments, segments]} />
            <meshPhongMaterial
              map={moonTexture}
              roughness={1}
              metalness={0.4}
            />
          </mesh>
        </Float>
      )}

      {/* Si se reduce movimiento, solo renderiza la luna sin Float */}
      {reducedMotion && (
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <sphereGeometry args={[4, segments, segments]} />
          <meshPhongMaterial
            map={moonTexture}
            roughness={1}
            metalness={0.4}
          />
        </mesh>
      )}
    </>
  )
}
