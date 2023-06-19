'use client'

import Image from 'next/image'
import { usePalette, palette } from '@/styles/theme'
import { a, useSpringValue } from 'react-spring'
import Three from '@/three'
import Thing from '@/three/components/Thing'
import ThingTitle from '@/three/components/ThingTitle'
import MouseOrbiter from '@/three/components/MouseOrbiter'
import Styled from './styled'

const AImage = a(Image)

export default function Hero({ ...restProps }) {
  const ambientColor = usePalette(palette.main.text)
  const color = usePalette(palette.main.background.bottom)

  const loading = useSpringValue(1)

  return (
    <Styled.Hero {...restProps}>
      <Three keepScrollPerspective>
        <ambientLight color={ambientColor} />
        <MouseOrbiter>
          <Thing onFirstRender={() => loading.start(0)} position-z={-100} />
          <ThingTitle scale={[80, 80, 4]}>Hi ghost!</ThingTitle>
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
