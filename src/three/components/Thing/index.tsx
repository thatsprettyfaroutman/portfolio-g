'use client'

import { useRef } from 'react'
import { Group, Mesh, RingGeometry } from 'three'
import { useThree, useFrame, extend } from '@react-three/fiber'
import clamp from 'ramda/src/clamp'
import ThingMaterial, { type TThingMaterialProps } from './ThingMaterial'

extend({
  Group,
  Mesh,
  RingGeometry,
})

// TODO: try with sheen material and light
type TThingProps = Pick<TThingMaterialProps, 'color0' | 'color1'> & {
  onFirstRender?: () => void
}

export default function Thing({
  color0,
  color1,
  onFirstRender,
  ...restProps
}: TThingProps) {
  const { size } = useThree()
  const minRadius = 80
  const maxRadius = 256
  const padding = 64
  const radius = Math.min(size.width, size.height) * 0.5
  const scale = clamp(minRadius, maxRadius, radius - padding)

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
        {/* <ringGeometry args={[0.618, 1, 360, 16]} /> */}
        {/* <ringGeometry args={[0.8, 1, 360, 16]} /> */}
        <ThingMaterial color0={color0} color1={color1} resolution={scale} />
      </mesh>
    </group>
  )
}
