'use client'

import styled, { css } from 'styled-components'
import { MEDIA } from '@/styles/media'
import { noProp } from '@/styles/utils'

export type THeaderStyledProps = {
  absolute?: boolean
}

export const Wrapper = styled.header.withConfig(
  noProp(['absolute'])
)<THeaderStyledProps>`
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
  height: calc(var(--space) / 1.5);
  padding: calc(var(--space) / 2) var(--fluidSpace);
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-flow: row wrap; */
  gap: calc(var(--space) / 4);

  user-select: none;

  > :not(:first-child, :last-child) {
    display: none;
  }

  > :first-child {
    /* min-width: 100%; */
    margin-right: auto;
  }

  ${MEDIA.tablet} {
    justify-content: space-between;

    > :not(:first-child, :last-child) {
      display: flex;
    }

    > :first-child {
      min-width: initial;
      margin-left: calc(var(--space) / 4);
    }
  }
  ${MEDIA.desktop} {
    gap: var(--space);
  }
`
