'use client'

import { useRef } from 'react'
import { a, useSpringValue, easings } from '@react-spring/three'
import {
  useThree,
  useFrame,
  extend,
  ReactThreeFiber,
  GroupProps,
} from '@react-three/fiber'
import lerp from 'lerp'
import clamp from 'ramda/src/clamp'
import { Group, Mesh, RingGeometry } from 'three'
import useCssVariable from '@/hooks/useCssVariable'
import { useColor } from '@/styles/theme'
import useFirstRender from '@/three/hooks/useFirstRender'
import MeshAuroraMaterial, {
  TMeshAuroraMaterial,
} from './materials/MeshAuroraMaterial'

const DEG = Math.PI / 180
const RING_GEOMETRY = new RingGeometry(0.7, 1, 360 / 2, 16 * 2)

type TThingProps = GroupProps & {
  opacity?: TMeshAuroraMaterial['uOpacity']
  baseOpacity?: TMeshAuroraMaterial['uBaseOpacity']
  geometry?: RingGeometry
  timeScale?: number
  disableAppearAnimation?: boolean
  appearDelay?: number
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
  geometry = RING_GEOMETRY,
  timeScale = 1,
  appearDelay = 1000,
  disableAppearAnimation,
  ...restProps
}: TThingProps) {
  const { size } = useThree()
  const padding = useCssVariable('--space')
  const rotationRef = useRef<Group>(null)
  const materialRef = useRef<TMeshAuroraMaterial>(null)
  const radius = Math.min(size.width, size.height) * 0.5
  const scale = clamp(padding, padding * 4, radius - padding)
  const color0 = useColor('accents-0')
  const color1 = useColor('accents-1')

  const appearSpring = useSpringValue(0, {
    config: { tension: 20 },
  })

  useFrame((s) => {
    const t = s.clock.getElapsedTime() * timeScale

    if (rotationRef.current) {
      const tiltAngle = 15 * DEG
      rotationRef.current.rotation.x = Math.sin(t * 0.1) * tiltAngle
    }

    if (materialRef.current) {
      materialRef.current.uTime = t
      if (!disableAppearAnimation) {
        materialRef.current.uOpacity = easings.easeInCubic(
          lerp(0, opacity, appearSpring.get())
        )
      }
    }
  })

  useFirstRender(() => {
    setTimeout(() => {
      appearSpring.start(1)
    }, appearDelay)
  })

  return (
    <group {...restProps}>
      <group ref={rotationRef}>
        <a.mesh
          rotation-x={
            !disableAppearAnimation &&
            appearSpring.to((p) => lerp(-45 * DEG, 0, p))
          }
          scale-x={scale}
          scale-y={scale}
          scale-z={
            !disableAppearAnimation &&
            appearSpring.to((p) => lerp(1000, 100, p))
          }
          geometry={geometry}
        >
          <meshAuroraMaterial
            ref={materialRef}
            key={MeshAuroraMaterial.key}
            uColor0={color0}
            uColor1={color1}
            opacity={opacity}
            uBaseOpacity={baseOpacity}
            transparent
          />
        </a.mesh>
      </group>
    </group>
  )
}
