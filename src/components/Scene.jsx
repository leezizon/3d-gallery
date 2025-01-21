import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Gallery from './Gallery'

export default function Scene({ activeModel }) {
  return (
    <div className="flex-1">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        shadows
      >
        {/* <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        /> */}
        <Environment preset="city" />
        <Gallery activeModel={activeModel} />
        <OrbitControls />
      </Canvas>
    </div>
  )
} 