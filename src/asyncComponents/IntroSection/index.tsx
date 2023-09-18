import { type PropsWithChildren } from 'react'
import Brands from '@/asyncComponents/Brands'
import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import Author from '@/components/Author/lazy'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import { Wrapper, IntroContent, IntroFooter, CustomMarkdown } from './styled'

type TIntroSectionProps = PropsWithChildren

export default async function IntroSection({
  children,
  ...restProps
}: TIntroSectionProps) {
  const introSection = await useIntroSection()

  return (
    <Wrapper {...restProps}>
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
