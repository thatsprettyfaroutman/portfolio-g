'use client'

import styled from 'styled-components'
import Section from '@/components/Section'

export const Wrapper = styled(Section)`
  padding-bottom: max(50vh, calc(var(--maxCol) * 4));
  grid-gap: calc(var(--maxCol) * 4);
`

export const WorkItems = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) * 4);
`
