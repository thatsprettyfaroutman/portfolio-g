'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'
import FONT from '@/styles/fonts'
import { noProp } from '@/styles/utils'

export type TSocialMediaLinkStyledProps = {
  variant?: 'footer'
  stealthMode: boolean
}

export const Wrapper = styled(Link).withConfig(
  noProp(['stealthMode', 'variant'])
)<TSocialMediaLinkStyledProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 calc(var(--space) / 4);
  gap: calc(var(--space) / 8);
  color: var(--color-main-text);
  transform: translate3d(0, 0px, 0);
  text-decoration: none;
  transition: transform 200ms ease-in-out;
  user-select: none;

  ::before {
    content: ' ';
    position: absolute;
    top: -1px;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: calc(var(--space) / 4);
    border: 1px solid transparent;
    border-bottom-width: 4px;
    transition-property: border-color, border-bottom-width, bottom;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;

    ${(p) =>
      !p.stealthMode &&
      css`
        border-bottom-width: 1px;
        border-color: var(--color-main-text);
      `};
  }

  > img {
    display: block;
    margin-top: -2px;
  }

  :hover {
    transform: translate3d(0, -4px, 0);

    ::before {
      bottom: -4px;
      border-bottom-width: 4px;
      border-color: var(--color-main-text);
    }
  }

  ${(p) =>
    p.variant === 'footer' &&
    css`
      color: var(--color-footer-text);

      ::before {
        border-color: var(--color-footer-text);
      }
    `};
`

export const Name = styled.span`
  position: relative;
  font-family: ${FONT.Montserrat};
  font-size: 12px;
  line-height: calc(var(--space) / 2);
  letter-spacing: 0.1em;
  color: inherit;
`
