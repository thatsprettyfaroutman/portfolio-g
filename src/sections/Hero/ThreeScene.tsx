'use client'

import Three from '@/three'
import AuroraDisc from '@/three/components/AuroraDisc'
import MouseOrbiter from '@/three/components/MouseOrbiter'

// @ts-ignore
export default function Scene(props) {
  return (
    <Three keepScrollPerspective {...props}>
      <MouseOrbiter maxAngle={Math.PI * 0.06125}>
        <AuroraDisc />
      </MouseOrbiter>
    </Three>
  )
}
