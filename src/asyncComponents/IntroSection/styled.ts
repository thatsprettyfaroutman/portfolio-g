'use client'

import styled from 'styled-components'
import GradedFullHeight from '@/components/GradedFullHeight'
import Section from '@/components/Section'
import { palette } from '@/styles/theme'

export const Wrapper = styled.section``

export const Hero = styled(GradedFullHeight)`
  position: relative;
  display: grid;
  height: 100vh;
  min-height: 600px;
  place-items: center;
  /* background: linear-gradient(
    ${palette.main.backgroundAlt},
    ${palette.main.backgroundAlt.alpha(0)}
  ); */

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
  display: flex;
  justify-content: space-between;
  align-items: center;

  > :last-child {
    margin-left: auto;
  }
`
