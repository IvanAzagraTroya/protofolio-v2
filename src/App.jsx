import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import MoonScene from './MoonScene'
import Content from './Components/Content.jsx'
import './index.css'


import Background from './Components/Background.jsx'
import StarFieldHtml from './Components/BackgroundHtml.jsx'
import CloudPane from './Components/Clouds.jsx'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ScrollControls pages={4} damping={0.3}>
        {/* Contenido 3D sincronizado con scroll */}
        <Scroll>
          <MoonScene />
          <Background />
        </Scroll>

        {/* Contenido HTML sincronizado con scroll */}
        <Scroll html>
          <Content />
          <StarFieldHtml />
          {/* <CloudPane /> */}
        </Scroll>
      </ScrollControls>
    </Canvas>
  )
}