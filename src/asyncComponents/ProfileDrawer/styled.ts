'use client'

import styled from 'styled-components'
import { MEDIA } from '@/styles/media'

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  display: none;

  ${MEDIA.tablet} {
    display: block;
  }
`
