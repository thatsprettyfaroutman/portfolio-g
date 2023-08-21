import { PropsWithChildren } from 'react'
import useIntro from '@/contentful/hooks/useIntro'
import Three from '@/three/lazy'
import { Heading1 } from '@/components/Text'
import MouseOrbiter from '@/three/components/MouseOrbiter'
import AuroraDisc from '@/three/components/AuroraDisc'

import { Wrapper } from './styled'

// TODO: lazy load three stuff

export default async function Hero(props: PropsWithChildren) {
  const intro = await useIntro()

  return (
    <Wrapper {...props}>
      <Three keepScrollPerspective>
        <MouseOrbiter maxAngle={Math.PI * 0.06125}>
          <AuroraDisc />
        </MouseOrbiter>
      </Three>
      <Heading1>{intro.title}</Heading1>
    </Wrapper>
  )
}
