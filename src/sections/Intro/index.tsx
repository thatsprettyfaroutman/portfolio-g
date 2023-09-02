import dynamic from 'next/dynamic'
import AnimatedText from '@/components/AnimatedText'
import Author from '@/components/Author'
import { Heading1, BigMarkdown } from '@/components/Text'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import { Wrapper, Hero, TextContent, IntroFooter } from './styled'

const Scene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default async function Intro({ ...restProps }) {
  const intro = await useIntroSection()

  return (
    <Wrapper {...restProps}>
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
          <Author>{intro.author}</Author>
        </IntroFooter>
      </TextContent>
    </Wrapper>
  )
}
