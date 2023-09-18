'use client'

import styled, { css } from 'styled-components'
import { MEDIA } from '@/styles/media'
import { noProp } from '@/styles/utils'

const Header = styled.header.withConfig(noProp(['absolute']))<{
  absolute?: boolean
}>`
  position: relative;

  ${(p) =>
    p.absolute &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    `};

  z-index: 1;
  height: calc(var(--space) / 2);
  padding: calc(var(--space) / 2) var(--fluidSpace);
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  gap: var(--space);

  user-select: none;

  > :first-child {
    min-width: 100%;
  }

  ${MEDIA.tablet} {
    justify-content: space-between;
    > :first-child {
      min-width: initial;
      margin-left: calc(var(--space) / 4);
    }
  }
`

export default Header
