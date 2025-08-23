import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import MoonScene from './Components/MoonScene.jsx'
import Content from './Components/Content.jsx'

import './index.css'

export default function App() {
  
  return (
    <Canvas id='app_canvas' camera={{ position: [0, 0, 10], fov: 60 }}>
      <ScrollControls pages={5} damping={0.3} >
        {/* Contenido 3D sincronizado con scroll */}
        <Scroll>
          <MoonScene />
        </Scroll>

        {/* Contenido HTML sincronizado con scroll */}
        <Scroll html>
          <Content />
        </Scroll> 
      </ScrollControls>
    </Canvas>
  )
}