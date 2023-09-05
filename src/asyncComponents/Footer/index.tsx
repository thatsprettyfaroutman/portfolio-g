import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import Logo from '@/components/Logo'
import { Heading4, MiniHeading } from '@/components/Text'
import { Wrapper } from './styled'

export default async function Footer({ ...restProps }) {
  return (
    <Wrapper {...restProps}>
      <Heading4>Get in touch</Heading4>
      <SocialMediaLinks />
      <MiniHeading>@thatsprettyfaroutman</MiniHeading>
    </Wrapper>
  )
}
