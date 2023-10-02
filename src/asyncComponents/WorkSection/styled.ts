'use client'

import styled from 'styled-components'
import CenteredWrapper from '@/components/CenteredWrapper'

export const Wrapper = styled.section`
  display: grid;
  padding-top: var(--space);
  grid-gap: calc(var(--space) * 2);
`

export const WorkItems = styled(CenteredWrapper)`
  grid-gap: calc(var(--space) * 2);
`
