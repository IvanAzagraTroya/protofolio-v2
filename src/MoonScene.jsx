import { Float, useScroll } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import MoonTexture from './assets/moon-texture.png';
import MoonNormal from './assets/NormalMapMoon.jpg';

export default function MoonScene() {
  const meshRef = useRef()
  const scroll = useScroll()
  const [videoTexture, setVideoTexture] = useState(null);
  const directionRef = useRef(1); // +1 avanza, -1 retrocede
  const videoRef = useRef(null);

  const moonTexture = new THREE.TextureLoader().load(MoonTexture);
  const moonNormal = new THREE.TextureLoader().load(MoonNormal);



  // useEffect(() => {
  //   const video = document.createElement('video');
  //   video.src       = 'src/assets/moon-bg.mp4';
  //   video.loop      = true;    // Desactivamos loop automático :contentReference[oaicite:1]{index=1}
  //   video.muted     = true;
  //   video.playbackRate = 0.5;
  //   video.pause();              // Controlamos manualmente currentTime

  //   const texture = new THREE.VideoTexture(video);
  //   texture.minFilter = THREE.LinearFilter;
  //   texture.magFilter = THREE.LinearFilter;
  //   texture.format    = THREE.RGBFormat;

  //   videoRef.current = video;
  //   setVideoTexture(texture);
  // }, []);

  // useFrame((_, delta) => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += delta * 0.5
  //   }

  //   const video = videoRef.current;
  //   if (!video) return;

  //   // Calcular nuevo tiempo
  //   let t = video.currentTime + directionRef.current * delta;
  //   // Al llegar al final, invierte dirección
  //   if (t >= video.duration) {
  //     t = video.duration;
  //     directionRef.current = -0.5;
  //   }
  //   // Al llegar al inicio, invierte de nuevo
  //   if (t <= 0) {
  //     t = 0;
  //     directionRef.current = 0.5;
  //   }

  //   video.currentTime = t;      // Seek con HTMLMediaElement.currentTime :contentReference[oaicite:2]{index=2}
  //   videoTexture.needsUpdate = true; // Forzar actualización de la textura
  // })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0} />

      {/* ✅ FONDO CON VÍDEO SOLO EN LA PRIMERA SECCIÓN */}
      {videoTexture && scroll.offset < 0.33 && (
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[50, 30]} />
          <meshBasicMaterial map={videoTexture} />
        </mesh>
      )}

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