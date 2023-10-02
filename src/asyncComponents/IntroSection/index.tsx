import { type PropsWithChildren } from 'react'
import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import Author from '@/components/Author'
import Hero from '@/components/Hero/lazy'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import {
  Wrapper,
  IntroContent,
  IntroInfo,
  PhoneIntroFooter,
  AbsoluteArrow,
  CustomMarkdown,
} from './styled'

type TIntroSectionProps = PropsWithChildren

export default async function IntroSection({
  children,
  ...restProps
}: TIntroSectionProps) {
  const introSection = await useIntroSection()

  return (
    <Wrapper {...restProps}>
      <IntroContent>
        <Hero />
        <IntroInfo>
          <CustomMarkdown>{introSection.body}</CustomMarkdown>
          <PhoneIntroFooter>
            <Author>{introSection.author}</Author>
            <SocialMediaLinks />
          </PhoneIntroFooter>
        </IntroInfo>
        <AbsoluteArrow />
      </IntroContent>
    </Wrapper>
  )
}
