'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import clamp from 'ramda/src/clamp'
import chroma from 'chroma-js'
import ThingMaterial from './ThingMaterial'

// TODO: try with sheen material and light
// TODO: fix prop type, extend thing material
type TThingProps = {
  color: string
  ambientColor?: string
  onFirstRender?: () => void
}

export default function Thing({
  color,
  ambientColor,
  onFirstRender,
  ...restProps
}: TThingProps) {
  const ref = useRef<THREE.Group>(null)
  const { size } = useThree()
  const minRadius = 80
  const maxRadius = 256
  const padding = 64
  const radius = Math.min(size.width, size.height) * 0.5
  const scale = clamp(minRadius, maxRadius, radius - padding)

  // let printAsImage = true
  // useFrame((s) => {
  //   if (printAsImage) {
  //     setTimeout(() => {
  //       console.log(s.gl)
  //       printAsImage = false
  //       const img = document.createElement('img')
  //       img.src = s.gl.domElement.toDataURL()
  //       document.body.prepend(img)
  //     }, 100)
  //   }
  // })

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
    <group {...restProps} scale={[scale, scale, 100]} ref={ref}>
      <mesh>
        <ringGeometry args={[0.7, 1, 360, 10]} />
        <ThingMaterial
          color={chroma(color).alpha(0.5).hex()}
          ambientColor={ambientColor}
          r0={0.7}
          r1={1}
          resolution={scale}
        />
      </mesh>
    </group>
  )
}
