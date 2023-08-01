'use client'

import styled from 'styled-components'
import GridSection from '@/components/GridSection'

export const Wrapper = styled(GridSection)`
  position: relative;
  grid-row-gap: calc(var(--col) * 4);
  padding-bottom: calc(var(--col) * 4);
`

export const WorkItems = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-gap: max(50vh, calc(var(--col) * 4));
`
