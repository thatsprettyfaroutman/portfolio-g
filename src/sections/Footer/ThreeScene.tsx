'use client'

import Three from '@/three'
import VideoPoster from '@/three/components/VideoPoster'

// @ts-ignore
export default function Scene(props) {
  return (
    <Three debug {...props}>
      {/* <Dancer /> */}

      <ambientLight intensity={1} color="#fff" />
      <VideoPoster width={400} height={600} src="/work/kp2.mp4" />
    </Three>
  )
}
