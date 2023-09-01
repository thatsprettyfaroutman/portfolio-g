'use client'

import { useRef } from 'react'
import { a, useSpringValue } from '@react-spring/three'
import { useThree, useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import lerp from 'lerp'
import clamp from 'ramda/src/clamp'
import { Group, Mesh, RingGeometry, Vector2 } from 'three'
import useCssVariable from '@/hooks/useCssVariable'
import { usePalette, palette } from '@/styles/theme'
import { useThreeContext } from '@/three/context'
import MeshAuroraMaterial, {
  TMeshAuroraMaterial,
} from './materials/MeshAuroraMaterial'

// Future improvements -> try with sheen material and light

const RING_GEOMETRY = new RingGeometry(0.7, 1, 360 / 2, 16)

type TThingProps = {
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
  baseOpacity,
  opacity = 1,
  onFirstRender,
  ...restProps
}: TThingProps) {
  const { size } = useThree()
  const padding = useCssVariable('--space')
  const rotationRef = useRef<Group>(null)
  const materialRef = useRef<TMeshAuroraMaterial>(null)
  const radius = Math.min(size.width, size.height) * 0.5
  const scale = clamp(padding, padding * 4, radius - padding)
  const color0 = usePalette(palette.accents[0])
  const color1 = usePalette(palette.accents[1])
  const appearSpring = useSpringValue(0, { config: { tension: 20 } })
  const mouseRef = useRef(new Vector2())

  useFrame((s) => {
    if (!rotationRef.current) {
      return
    }
    const tiltAngle = Math.PI * 0.125
    mouseRef.current.lerp(s.mouse, 0.05)
    rotationRef.current.rotation.y = lerp(0, tiltAngle, mouseRef.current.x)
    rotationRef.current.rotation.x = lerp(0, tiltAngle, -mouseRef.current.y)
  })

  useFrame((s) => {
    if (!materialRef.current) {
      return
    }
    materialRef.current.uTime = s.clock.getElapsedTime()
    materialRef.current.uOpacity = appearSpring.get() * opacity
  })

  const firstRender = useRef(true)
  useFrame(() => {
    if (firstRender.current) {
      firstRender.current = false
      if (typeof onFirstRender === 'function') {
        onFirstRender()
      }
      setTimeout(() => {
        appearSpring.start(1)
      }, 2000)
    }
  })

  return (
    <group {...restProps}>
      <group ref={rotationRef}>
        <a.mesh
          rotation-x={appearSpring.to((p) => lerp(-Math.PI * 0.125, 0, p))}
          scale-x={scale}
          scale-y={scale}
          scale-z={appearSpring.to((p) => lerp(1000, 100, p))}
          geometry={RING_GEOMETRY}
        >
          <meshAuroraMaterial
            ref={materialRef}
            uColor0={color0}
            uColor1={color1}
            uBaseOpacity={baseOpacity}
            key={MeshAuroraMaterial.key}
            transparent
            // side={DoubleSide}
          />
        </a.mesh>
      </group>
    </group>
  )
}
