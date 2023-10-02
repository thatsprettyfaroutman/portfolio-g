'use client'

import styled from 'styled-components'
import { MEDIA } from '@/styles/media'

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  height: 400px;
  place-items: center;
  user-select: none;
  overflow: hidden;
  top: var(--space);

  ${MEDIA.tablet} {
    height: 600px;
  }

  ${MEDIA.tabletLandscape} {
    height: 100vh;
    max-height: 1024px;
    top: 0;
    grid-gap: var(--space);
  }

  > .spline {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`
