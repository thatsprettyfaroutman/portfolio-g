'use client'

import Image from 'next/image'
import { usePalette, palette } from '@/styles/theme'
import { a, useSpringValue } from 'react-spring'
import * as Styled from './styled'
import Text from '@/components/Text'
// TODO: uncomment when Three is functional
// import Three from '@/three'
// import Thing from '@/three/components/Thing'
// import ThingTitle from '@/three/components/ThingTitle'
// import MouseOrbiter from '@/three/components/MouseOrbiter'
// import CameraFog from '@/three/components/CameraFog'

const AImage = a(Image)

export default function Hero({ ...restProps }) {
  const color = usePalette(palette.accent[1])
  const loading = useSpringValue(1)

  return (
    <Styled.Hero {...restProps}>
      <Text.MainHeading>Hi Ghost!</Text.MainHeading>
      {/* TODO: uncomment when Three is functional */}
      {/* <Three keepScrollPerspective>
        <ambientLight color="#fff" />
        <MouseOrbiter>
          <Thing
            position-z={-100}
            color={color}
            onFirstRender={() => loading.start(0)}
          />
          <ThingTitle scale={[128, 128, 32]}>Hi Ghost!</ThingTitle>
        </MouseOrbiter>
        <CameraFog near={0} far={64} />
      </Three> */}
      <AImage
        style={{
          opacity: loading,
          // @ts-ignore
          display: loading.to((p) => (p <= 0 ? 'none' : undefined)),
        }}
        src="/thing-loading-tinified.png"
        alt="Ever changing graphical element"
        width={560}
        height={524}
      />
    </Styled.Hero>
  )
}
