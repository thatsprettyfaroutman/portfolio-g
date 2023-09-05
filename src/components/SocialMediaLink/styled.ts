'use client'

import chroma from 'chroma-js'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import FONT from '@/styles/fonts'
import { type TPaletteColor } from '@/styles/theme'
import { noProp } from '@/styles/utils'

export type TSocialMediaLinkStyledProps = {
  variant: {
    background: TPaletteColor
    text: TPaletteColor
  }
  stealthMode: boolean
}

export const Wrapper = styled(Link).withConfig(
  noProp(['stealthMode', 'variant'])
)<{
  variant: {
    background: TPaletteColor
    text: TPaletteColor
  }
  stealthMode: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 calc(var(--space) / 4);
  gap: calc(var(--space) / 8);
  color: ${(p) => p.variant.text};
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
    transition: border-color 200ms ease-in-out;

    ${(p) =>
      !p.stealthMode &&
      css`
        border-color: ${p.variant.text};
        border-bottom-width: 1px;
      `};
  }

  > img {
    display: block;
    margin-top: -2px;

    ${(p) =>
      chroma(p.variant.text(p)).get('hsl.l') < 0.5 &&
      css`
        filter: invert();
      `}
  }

  :hover {
    transform: translate3d(0, -1.5px, 0);

    ::before {
      bottom: -4px;
      border-color: ${(p) => p.variant.text};
      border-bottom-width: 4px;
    }
  }
`

export const Name = styled.span`
  position: relative;
  font-family: ${FONT.Montserrat};
  font-size: 12px;
  line-height: calc(var(--space) / 2);
  letter-spacing: 0.1em;
  color: inherit;
`
