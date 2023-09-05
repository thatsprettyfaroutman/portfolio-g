import { PropsWithChildren } from 'react'
import SocialMediaLink, {
  type TSocialMediaLinkProps,
} from '@/components/SocialMediaLink'
import useSocialMediaLinks from '@/contentful/hooks/useSocialMediaLinks'
import { Wrapper } from './styled'

type TSocialMediaLinksProps = PropsWithChildren<
  Omit<TSocialMediaLinkProps, 'children'>
>

export default async function SocialMediaLinks({
  children,
  variant,
  stealthMode,
  ...restProps
}: TSocialMediaLinksProps) {
  const links = await useSocialMediaLinks()
  return (
    <Wrapper {...restProps}>
      {children}
      {links.map((link) => (
        <SocialMediaLink
          key={link.sys.id}
          stealthMode={stealthMode}
          variant={variant}
        >
          {link}
        </SocialMediaLink>
      ))}
    </Wrapper>
  )
}
