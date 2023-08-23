'use client'

import styled from 'styled-components'
import { palette } from '@/styles/theme'
import FullView from '@/components/FullView'

export const Wrapper = styled(FullView)`
  position: relative;
  display: grid;
  height: 100vh;
  min-height: 600px;
  place-items: center;
  background: linear-gradient(
    ${palette.main.background.top},
    ${palette.main.background.bottom}
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
