'use client'

import styled from 'styled-components'
import FullView from '@/components/FullView'
import Section from '@/components/Section'
import { palette } from '@/styles/theme'

export const Wrapper = styled.section``

export const Hero = styled(FullView)`
  position: relative;
  display: grid;
  height: 100vh;
  min-height: 600px;
  place-items: center;
  background: linear-gradient(
    ${palette.main.background.top},
    ${palette.main.background.top.alpha(0)}
  );

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

  > :last-child {
    margin-left: auto;
  }
`
