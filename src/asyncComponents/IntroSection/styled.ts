'use client'

import styled from 'styled-components'
import GradedFullHeight from '@/components/GradedFullHeight'
import Section from '@/components/Section'
import { MEDIA } from '@/styles/media'
import { palette } from '@/styles/theme'

export const Wrapper = styled.section``

export const Hero = styled(GradedFullHeight)`
  position: relative;
  display: grid;
  height: 100vh;
  min-height: 600px;
  place-items: center;
  user-select: none;

  > .three {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

export const TextContent = styled(Section).attrs({ as: 'div' })`
  max-width: 960px;
`

export const IntroFooter = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 2);
  justify-items: center;

  > :last-child {
    grid-row: 1;
    justify-self: end;
  }

  ${MEDIA.tablet} {
    grid-template-columns: auto auto;
    justify-items: start;

    > :last-child {
      grid-row: initial;
    }
  }
`
