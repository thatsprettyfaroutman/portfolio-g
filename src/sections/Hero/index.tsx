'use client'

import Image from 'next/image'
import { usePalette, palette } from '@/styles/theme'
import { a, useSpringValue } from 'react-spring'
import * as Styled from './styled'
import Three from '@/three'
import Thing from '@/three/components/Thing'
import ThingTitle from '@/three/components/ThingTitle'
import MouseOrbiter from '@/three/components/MouseOrbiter'

const AImage = a(Image)

export default function Hero({ ...restProps }) {
  const ambientColor = usePalette(palette.main.fg)
  const color = usePalette(palette.main.bg)
  const loading = useSpringValue(1)

  return (
    <Styled.Hero {...restProps}>
      <Three keepScrollPerspective>
        <ambientLight color={ambientColor} />
        <MouseOrbiter>
          <Thing color={color} onFirstRender={() => loading.start(0)} />
          <ThingTitle position-z={100} scale={[80, 80, 8]}>
            Hi ghost!
          </ThingTitle>
        </MouseOrbiter>
      </Three>

      <AImage
        style={{
          opacity: loading,
          // @ts-ignore
          display: loading.to((p) => (p <= 0 ? 'none' : undefined)),
        }}
        src="/thing-loading.png"
        alt="Ever changing graphical element"
        width={519}
        height={511}
      />
    </Styled.Hero>
  )
}
