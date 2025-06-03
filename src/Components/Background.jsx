import { useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function StarField3D() {
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = []

    for (let i = 0; i < 100; i++) {
      const x = THREE.MathUtils.randFloatSpread(200)
      const y = THREE.MathUtils.randFloatSpread(200)
      const z = THREE.MathUtils.randFloatSpread(200)
      if (y > -20) positions.push(x, y, z) // Más estrellas arriba
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    return geometry
  }, [])

  const starMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    })
  }, [])

  return <points geometry={starsGeometry} material={starMaterial} />
}
