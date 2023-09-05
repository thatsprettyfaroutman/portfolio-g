'use client'

import Image from 'next/image'
import Link from 'next/link'
import { a } from 'react-spring'
import styled, { css } from 'styled-components'
import { TSocialMediaLink } from '@/contentful/types'
import FONT from '@/styles/fonts'
import { palette } from '@/styles/theme'

const ICON_HEIGHT = 12

type TSocialMediaLinkProps = {
  children: TSocialMediaLink
  stealthMode?: boolean
}

const Wrapper = styled(Link)<{ stealthMode: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: calc(var(--space) / 64) calc(var(--space) / 4);
  gap: calc(var(--space) / 8);
  color: ${palette.main.text};
  transform: translate3d(0, 0px, 0);
  text-decoration: none;
  transition: transform 200ms ease-in-out, border-color 200ms ease-in-out,
    background-color 200ms ease-in-out;

  ::before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: calc(var(--space) / 4);
    border: 1px solid transparent;
    border-bottom-width: 1px;
    background-color: ${palette.main.background};

    ${(p) =>
      !p.stealthMode &&
      css`
        border-color: ${palette.main.text};
      `};
  }

  > img {
    display: block;
    margin-top: -2px;
    filter: invert();
  }

  :hover {
    transform: translate3d(0, -2px, 0);

    ::before {
      bottom: -3px;
      border-color: ${palette.main.text};
      border-bottom-width: 4px;
      background-color: ${palette.main.backgroundAlt};
    }
  }
`

const Name = styled.span`
  position: relative;
  font-family: ${FONT.Montserrat};
  font-size: 12px;
  line-height: calc(var(--space) / 2);
  letter-spacing: 0.1em;
  color: inherit;
`

const AWrapper = a(Wrapper)

export default function SocialMediaLink({
  children,
  ...restProps
}: TSocialMediaLinkProps) {
  const iconAspectRatio = children.icon.width / children.icon.height

  return (
    <AWrapper href={children.href} {...restProps}>
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
