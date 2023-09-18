'use client'

import styled from 'styled-components'
import Arrow from '@/components/Arrow'
import GradedFullHeight from '@/components/GradedFullHeight'

export const Wrapper = styled(GradedFullHeight)`
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
