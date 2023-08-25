'use client'

import { useRef } from 'react'
import { Group, Mesh, RingGeometry, DoubleSide } from 'three'
import { useThree, useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import { a, useSpringValue } from '@react-spring/three'
import clamp from 'ramda/src/clamp'
import { usePalette, palette } from '@/styles/theme'
import MeshAuroraMaterial, {
  TMeshAuroraMaterial,
} from './materials/MeshAuroraMaterial'
import useCssVariable from '@/hooks/useCssVariable'
import lerp from 'lerp'

// TODO: try with sheen material and light

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
  const padding = useCssVariable('--maxCol')
  const materialRef = useRef<TMeshAuroraMaterial>(null)
  const radius = Math.min(size.width, size.height) * 0.5
  const scale = clamp(padding, padding * 4, radius - padding)
  const color0 = usePalette(palette.accents[0])
  const color1 = usePalette(palette.accents[1])
  const appearSpring = useSpringValue(0, { config: { tension: 30 } })

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
      appearSpring.start(1)
    }
  })

  return (
    <group {...restProps}>
      <a.mesh
        rotation-x={appearSpring.to((p) => lerp(-Math.PI * 0.25, 0, p))}
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
  )
}
