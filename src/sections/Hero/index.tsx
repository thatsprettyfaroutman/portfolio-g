import styled from 'styled-components'
import Three from '@/three'
import { usePalette, palette } from '@/styles/theme'
import Text from '@/components/Text'
import MouseOrbiter from '@/three/components/MouseOrbiter'
import AuroraDisc from '@/three/components/AuroraDisc'

// TODO: lazy load three stuff

const Wrapper = styled.section`
  position: relative;
  display: grid;
  height: 100vh;
  min-height: 600px;
  place-items: center;
  background: linear-gradient(
    ${palette.main.background.top},
    ${palette.main.background.bottom}
  );
  user-select: none;

  > .three {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

export default function Hero({ ...restProps }) {
  const color0 = usePalette(palette.accent[0])
  const color1 = usePalette(palette.accent[1])

  return (
    <Wrapper {...restProps}>
      <Three keepScrollPerspective>
        <MouseOrbiter maxAngle={Math.PI * 0.125}>
          <AuroraDisc color0={color0} color1={color1} />
        </MouseOrbiter>
      </Three>
      <Text.Heading1>Hello Ghost</Text.Heading1>
    </Wrapper>
  )
}
