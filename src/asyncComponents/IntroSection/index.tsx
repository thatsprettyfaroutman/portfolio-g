import dynamic from 'next/dynamic'
import Brands from '@/asyncComponents/Brands'
import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import AnimatedText from '@/components/AnimatedText'
import Arrow from '@/components/Arrow/lazy'
import Author from '@/components/Author/lazy'
import { Heading1 } from '@/components/Text'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import {
  Wrapper,
  Hero,
  IntroContent,
  IntroFooter,
  CustomMarkdown,
} from './styled'

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default async function IntroSection({ ...restProps }) {
  const introSection = await useIntroSection()

  return (
    <Wrapper {...restProps}>
      <Hero>
        <ThreeScene />
        <Heading1>
          <AnimatedText delay={1000} trailDelay={800}>
            {introSection.title}
          </AnimatedText>
        </Heading1>
        <Arrow />
      </Hero>

      <IntroContent>
        <CustomMarkdown>{introSection.body}</CustomMarkdown>
        <IntroFooter>
          <SocialMediaLinks />
          <Author>{introSection.author}</Author>
        </IntroFooter>
      </IntroContent>

      <Brands />
    </Wrapper>
  )
}
