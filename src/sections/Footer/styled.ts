'use client'

import styled from 'styled-components'
import Section from '@/components/Section'
import FullView from '@/components/FullView'

export const Wrapper = styled(Section)`
  padding-left: 0;
  padding-right: 0;
  max-width: none;
  grid-gap: calc(var(--maxCol) * 4);
`

export const ThreeWrapper = styled(FullView)`
  position: relative;
  max-height: 800px;
  max-width: 100%;
  overflow: hidden;
`
