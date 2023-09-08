'use client'

import styled from 'styled-components'
import { MEDIA } from '@/styles/media'

export const Wrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
