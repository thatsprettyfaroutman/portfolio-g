import dynamic from 'next/dynamic'
import AnimatedText from '@/components/AnimatedText'
import Arrow from '@/components/Arrow/lazy'
import { Heading1 } from '@/components/Text'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import { Wrapper } from './styled'

const ThreeScene = dynamic(() => import('./components/ThreeScene'), {
  ssr: false,
})

type THeroGhostProps = {
  title?: string
}

export default async function HeroGhost({
  title,
  ...restProps
}: THeroGhostProps) {
  const introSection = await useIntroSection()

  return (
    <Wrapper {...restProps}>
      <ThreeScene />
      <Heading1>
        <AnimatedText delay={1000} trailDelay={800}>
          {title || introSection.title}
        </AnimatedText>
      </Heading1>
      <Arrow />
    </Wrapper>
  )
}
