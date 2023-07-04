import { AmbientLight } from 'three'
import { extend } from '@react-three/fiber'

import Three from '@/three'
import { usePalette, palette } from '@/styles/theme'
import MouseOrbiter from '@/three/components/MouseOrbiter'
import Thing from '@/three/components/Thing'
import ThingTitle from '@/three/components/ThingTitle'

import Styled from './styled'

extend({ AmbientLight })

// TODO: lazy load three stuff

export default function Hero({ ...restProps }) {
  const ambientColor = usePalette(palette.main.text)
  const color0 = usePalette(palette.accent[0])
  const color1 = usePalette(palette.accent[1])

  return (
    <Styled.Hero {...restProps}>
      <Three keepScrollPerspective>
        <ambientLight color={ambientColor} />
        <MouseOrbiter maxAngle={Math.PI * 0.25}>
          <Thing
            position-z={-100}
            // TODO: better color prop names
            color0={color0}
            color1={color1}
            // baseOpacity={-0.08}
          />
          <ThingTitle scale={[80, 80, 4]}>Hi ghost!</ThingTitle>
        </MouseOrbiter>
      </Three>
    </Styled.Hero>
  )
}
