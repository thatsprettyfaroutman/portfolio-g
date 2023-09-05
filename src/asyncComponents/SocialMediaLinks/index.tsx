import { PropsWithChildren } from 'react'
import SocialMediaLink from '@/components/SocialMediaLink'
import useSocialMediaLinks from '@/contentful/hooks/useSocialMediaLinks'
import { Wrapper } from './styled'

type TSocialMediaLinksProps = PropsWithChildren<{
  stealthMode?: boolean
}>

export default async function SocialMediaLinks({
  children,
  stealthMode,
  ...restProps
}: TSocialMediaLinksProps) {
  const links = await useSocialMediaLinks()
  return (
    <Wrapper {...restProps}>
      {children}
      {links.map((link) => (
        <SocialMediaLink key={link.sys.id} stealthMode={stealthMode}>
          {link}
        </SocialMediaLink>
      ))}
    </Wrapper>
  )
}
