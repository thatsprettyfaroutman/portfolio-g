'use client'

import Image from 'next/image'
import { a } from 'react-spring'
import { TSocialMediaLink } from '@/contentful/types'
import { palette } from '@/styles/theme'
import { type TSocialMediaLinkStyledProps, Wrapper, Name } from './styled'

const ICON_HEIGHT = 12

export type TSocialMediaLinkProps = {
  children: TSocialMediaLink
} & Partial<TSocialMediaLinkStyledProps>

const AWrapper = a(Wrapper)

export default function SocialMediaLink({
  children,
  variant = palette.main,
  ...restProps
}: TSocialMediaLinkProps) {
  const iconAspectRatio = children.icon.width / children.icon.height

  return (
    <AWrapper variant={variant} href={children.href} {...restProps}>
      <Name>{children.name}</Name>
      <Image
        src={children.icon.url}
        width={ICON_HEIGHT * iconAspectRatio}
        height={ICON_HEIGHT}
        alt=""
      />
    </AWrapper>
  )
}
