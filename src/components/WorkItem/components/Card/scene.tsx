'use client'

import { type PropsWithChildren } from 'react'
import { a } from '@react-spring/three'
import lerp from 'lerp'
import { usePalette, palette } from '@/styles/theme'
import { useThreeContext } from '@/three/context'
import ScrollFollower from '@/three/components/ScrollFollower'

export default function Scene({ children }: PropsWithChildren) {
  const { inViewSpring } = useThreeContext()
  const ambientLightColor = usePalette(palette.main.background.bottom)

  return (
    <>
      <ambientLight color={ambientLightColor} />
      <ScrollFollower amount={-0.5}>
        <a.directionalLight
          color="#fff"
          position-z={600}
          // @ts-ignore
          intensity={inViewSpring.to((p) => lerp(0.3, 0.9, p))}
        />
      </ScrollFollower>

      {children}
    </>
  )
}
