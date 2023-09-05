'use client'

import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'
import { palette } from '@/styles/theme'

export const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 4);
`

export const Title = styled(MiniHeading)`
  text-align: center;
`

export const BrandsWrapper = styled.div`
  position: relative;
  padding: var(--space) 0;
  background-color: ${palette.main.background.darken(0.2)};
  min-height: calc(var(--space) / 2);
`

export const Brands = styled.div`
  display: flex;
  flex-direction: row;
  // Update Marquee space if this is changed
  gap: var(--space);
  row-gap: calc(var(--space) / 2);
  justify-content: start;
  align-items: center;
  min-height: calc(var(--space) / 2);
`
