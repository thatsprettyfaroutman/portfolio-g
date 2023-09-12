'use client'

import Three from '@/three'
import AuroraDisc from '@/three/components/AuroraDisc'

// @ts-ignore
export default function Scene(props) {
  return (
    <Three {...props}>
      <AuroraDisc />
    </Three>
  )
}
