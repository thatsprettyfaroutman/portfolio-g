'use client'

import styled from 'styled-components'
import Section from '@/components/Section'

export const Wrapper = styled(Section)`
  max-width: 960px;
`

export const IntroFooter = styled.div`
  display: flex;

  > :last-child {
    margin-left: auto;
  }
`
