import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import Logo from '@/components/Logo'
import { Wrapper } from './styled'

export default async function Header({ ...restProps }) {
  return (
    <Wrapper {...restProps}>
      <Logo />
      <SocialMediaLinks stealthMode />
    </Wrapper>
  )
}
