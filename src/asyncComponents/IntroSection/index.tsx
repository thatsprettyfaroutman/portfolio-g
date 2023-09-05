import dynamic from 'next/dynamic'
import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import AnimatedText from '@/components/AnimatedText'
import Header from '@/components/Header'
import { Heading1, BigMarkdown, MiniHeading } from '@/components/Text'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import { Wrapper, Hero, TextContent, IntroFooter } from './styled'

const Scene = dynamic(() => import('./ThreeScene'), { ssr: false })
const Author = dynamic(() => import('@/components/Author'), { ssr: false })

export default async function IntroSection({ ...restProps }) {
  const intro = await useIntroSection()

  return (
    <Wrapper {...restProps}>
      <Header>
        <SocialMediaLinks stealthMode />
      </Header>
      <Hero>
        <Scene />
        <Heading1>
          <AnimatedText delay={1000} trailDelay={800}>
            {intro.title}
          </AnimatedText>
        </Heading1>
      </Hero>

      <TextContent>
        <BigMarkdown>{intro.body}</BigMarkdown>
        <IntroFooter>
          <SocialMediaLinks />
          <Author>{intro.author}</Author>
        </IntroFooter>
      </TextContent>
    </Wrapper>
  )
}
