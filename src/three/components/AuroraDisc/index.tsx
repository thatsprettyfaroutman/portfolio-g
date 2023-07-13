import { useRef } from 'react'
import { Group, Mesh, RingGeometry, MathUtils } from 'three'
import { useThree, useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import clamp from 'ramda/src/clamp'
import { useThreeContext } from '@/three/context'
import MeshAuroraMaterial, {
  TMeshAuroraMaterial,
} from './materials/MeshAuroraMaterial'

// TODO: try with sheen material and light

type TThingProps = {
  color0?: string
  color1?: string
  opacity?: TMeshAuroraMaterial['uOpacity']
  baseOpacity?: TMeshAuroraMaterial['uBaseOpacity']
  onFirstRender?: () => void
}

extend({
  Group,
  Mesh,
  RingGeometry,
  MeshAuroraMaterial,
})

// Extend type
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshAuroraMaterial: ReactThreeFiber.MaterialNode<
        TMeshAuroraMaterial,
        TMeshAuroraMaterial
      >
    }
  }
}

export default function AuroraDisc({
  color0,
  color1,
  baseOpacity,
  opacity = 1,
  onFirstRender,
  ...restProps
}: TThingProps) {
  const { size } = useThree()
  const { inViewSpring } = useThreeContext()
  const materialRef = useRef<TMeshAuroraMaterial>(null)
  const minRadius = 80
  const maxRadius = 256
  const padding = 64
  const radius = Math.min(size.width, size.height) * 0.5
  const scale = clamp(minRadius, maxRadius, radius - padding)

  useFrame((s) => {
    if (!materialRef.current) {
      return
    }
    materialRef.current.uTime = s.clock.getElapsedTime()
    materialRef.current.uOpacity = MathUtils.lerp(
      0.1,
      1,
      inViewSpring.get() * opacity
    )
  })

  const firstRender = useRef(true)
  useFrame(() => {
    if (firstRender.current) {
      firstRender.current = false
      if (typeof onFirstRender === 'function') {
        onFirstRender()
      }
    }
  })

  return (
    <group {...restProps}>
      <mesh scale={[scale, scale, 100]}>
        <ringGeometry args={[0.7, 1, 360, 16]} />
        <meshAuroraMaterial
          uColor0={color0}
          uColor1={color1}
          uBaseOpacity={baseOpacity}
          key={MeshAuroraMaterial.key}
          transparent
          ref={materialRef}
        />
      </mesh>
    </group>
  )
}
