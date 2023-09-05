import dynamic from 'next/dynamic'
import Brands from '@/asyncComponents/Brands'
import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import AnimatedText from '@/components/AnimatedText'
import Author from '@/components/Author/lazy'
import { Heading1, BigMarkdown } from '@/components/Text'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import { Wrapper, Hero, IntroContent, IntroFooter } from './styled'

const Scene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default async function IntroSection({ ...restProps }) {
  const introSection = await useIntroSection()

  return (
    <Wrapper {...restProps}>
      <Hero>
        <Scene />
        <Heading1>
          <AnimatedText delay={1000} trailDelay={800}>
            {introSection.title}
          </AnimatedText>
        </Heading1>
      </Hero>

      <IntroContent>
        <BigMarkdown>{introSection.body}</BigMarkdown>
        <IntroFooter>
          <SocialMediaLinks />
          <Author>{introSection.author}</Author>
        </IntroFooter>
      </IntroContent>

      <Brands />
    </Wrapper>
  )
}
