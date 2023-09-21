'use client'

import styled from 'styled-components'
import Marquee from '@/components/Marquee'
import { MiniHeading } from '@/components/Text'

export const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 4);
`

export const Title = styled(MiniHeading)`
  text-align: center;
`

export const BrandsMarquee = styled(Marquee)`
  position: relative;
  padding: var(--space) 0;
  background-color: var(--color-main-bg-down-20);
  min-height: calc(var(--space) / 2);
`

export const Brands = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: var(--space);
  gap: var(--space);
  row-gap: calc(var(--space) / 2);
  justify-content: start;
  align-items: center;
  min-height: calc(var(--space) / 2);
`
