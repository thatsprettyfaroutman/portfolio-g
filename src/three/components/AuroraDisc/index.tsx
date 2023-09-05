'use client'

import { useRef } from 'react'
import { a, useSpringValue } from '@react-spring/three'
import { useThree, useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import lerp from 'lerp'
import clamp from 'ramda/src/clamp'
import { Group, Mesh, RingGeometry } from 'three'
import useCssVariable from '@/hooks/useCssVariable'
import { usePalette, palette } from '@/styles/theme'
import MeshAuroraMaterial, {
  TMeshAuroraMaterial,
} from './materials/MeshAuroraMaterial'

// const PHI = 1.618
const DEG = Math.PI / 180

// const RING_GEOMETRY = new RingGeometry(1 / PHI, 1, 360 / 2, 16)
const RING_GEOMETRY = new RingGeometry(0.7, 1, 360 / 2, 16 * 2)

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
  // TODO: remove onFirstRender
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

  useFrame((s) => {
    if (!rotationRef.current) {
      return
    }
    const tiltAngle = 15 * DEG
    const t = s.clock.getElapsedTime()
    rotationRef.current.rotation.x = Math.sin(t * 0.1) * tiltAngle
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
            key={MeshAuroraMaterial.key}
            uColor0={color0}
            uColor1={color1}
            uBaseOpacity={baseOpacity}
            transparent
          />
        </a.mesh>
      </group>
    </group>
  )
}
