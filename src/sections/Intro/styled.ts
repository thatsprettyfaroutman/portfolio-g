'use client'

import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import Section from '@/components/Section'

export const Wrapper = styled(Section)`
  max-width: calc(var(--maxWidth) / 2);
`

export const IntroFooter = styled.div`
  display: flex;

  > :last-child {
    margin-left: auto;
  }
`
