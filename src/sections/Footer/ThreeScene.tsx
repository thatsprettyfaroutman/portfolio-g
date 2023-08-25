'use client'

import Three from '@/three'
import Dancer from '@/three/components/Dancer'

// @ts-ignore
export default function Scene(props) {
  return (
    <Three shadows keepDefaultCamera {...props}>
      <Dancer />
    </Three>
  )
}
