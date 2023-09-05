import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import { Heading4, MiniHeading } from '@/components/Text'
import { Wrapper, socialMediaLinksVariant } from './styled'

export default async function Footer({ ...restProps }) {
  return (
    <Wrapper {...restProps}>
      <Heading4>Get in touch</Heading4>
      <SocialMediaLinks variant={socialMediaLinksVariant} />
      <MiniHeading>Viljami.dev</MiniHeading>
    </Wrapper>
  )
}
