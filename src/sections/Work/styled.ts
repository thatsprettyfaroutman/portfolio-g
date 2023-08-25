'use client'

import styled from 'styled-components'
import Section from '@/components/Section'

export const Wrapper = styled(Section)`
  grid-gap: calc(var(--maxCol) * 4);
`

export const WorkItems = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) * 4);
`
