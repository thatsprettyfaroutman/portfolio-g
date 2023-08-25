'use client'

import styled from 'styled-components'
import Section from '@/components/Section'

export const Wrapper = styled(Section)`
  grid-gap: calc(var(--space) * 4);
`

export const Head = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 8);
  grid-column: 1 / -1;
  place-items: center;
`

export const WorkItems = styled.div`
  display: grid;
  grid-gap: calc(var(--space) * 4);
`
