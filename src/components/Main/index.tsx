'use client'

import styled from 'styled-components'
import { palette } from '@/styles/theme'

const Main = styled.main`
  display: grid;
  grid-gap: var(--maxCol);
  grid-gap: calc(var(--maxCol) * 4);
  background-color: ${palette.main.background.bottom};
`

export default Main
