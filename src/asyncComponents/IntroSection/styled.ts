'use client'

import styled, { keyframes } from 'styled-components'
import Arrow from '@/components/Arrow'
import GradedFullHeight from '@/components/GradedFullHeight'
import Section from '@/components/Section'
import { MEDIA } from '@/styles/media'

export const Wrapper = styled.section`
  display: grid;
  grid-gap: var(--space);
`

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

  > ${Arrow} {
    position: absolute;
    left: 50%;
    bottom: var(--space);
  }
`

export const IntroContent = styled(Section).attrs({ as: 'div' })`
  max-width: 960px;
  grid-gap: var(--space);
`

export const IntroFooter = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 2);
  justify-items: center;
  min-height: var(--space);

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
