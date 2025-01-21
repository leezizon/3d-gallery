import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'

export default function Gallery({ activeModel }) {
  const ref = useRef()
  
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2
  
  })

  // 모델 경로 매핑 (실제 모델 파일 경로로 수정 필요)
  const modelPaths = {
    // 가구 모델
    furniture_others1: '/models/furniture/tree.glb',
    furniture_others2: '/models/furniture/present.glb' ,
    furniture_others3: '/models/furniture/present2.glb',
    furniture_others4: '/models/furniture/present3.glb',
    furniture_others5: '/models/furniture/present4.glb',
    
    furniture_bed1: '/models/furniture/bed1.glb',
    furniture_bed2: '/models/furniture/bed2.glb',
    
    furniture_firePlace1: '/models/furniture/firePlace1.glb',
    furniture_firePlace2: '/models/furniture/firePlace2.glb',
    
    // ... 다른 모델들의 경로

    // 음식 모델
    food_korean1: '/models/food/gim.glb',
    food_western1: '/models/food/steak.glb',
    food_dessert1: '/models/food/coffe.glb',
    food_drink1: '/models/food/strawberry.glb',
    food_western2: '/models/food/toast.glb',
    food_korean2: '/models/food/egg.glb',
    // ... 다른 모델들의 경로

    // 캐릭터 모델
    character_human1: '/models/character/male.glb',
    character_human2: '/models/character/female.glb',
    // ... 다른 모델들의 경로

    //탈것
    ride_bus1: '/models/ride/bus.glb',
  }

  const { scene } = useGLTF(modelPaths[activeModel])

  // 모든 메시의 재질을 MeshBasicMaterial로 변경
  scene.traverse((child) => {
    if (child.isMesh) {
      const oldMaterial = child.material;
    child.material = new MeshStandardMaterial({
      color: oldMaterial.color,
      transparent: oldMaterial.transparent,
      opacity: oldMaterial.opacity,
      map: oldMaterial.map, // 텍스처가 있다면 유지
      side: oldMaterial.side,
      emissive: oldMaterial.emissive || new Color(0x444444), // 기본 발광 색상 추가
      emissiveMap: oldMaterial.emissiveMap || null, // 기존 발광 텍스처가 있으면 유지
      emissiveIntensity: 1.5, // 발광 강도
    });
    }
  })

  return (
    <group>
      <primitive
        ref={ref}
        object={scene}
        position={[0, 1, 0]}
        scale={1}
      />
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
      </mesh>
    </group>
  )
  
}