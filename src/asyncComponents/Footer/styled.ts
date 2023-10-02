'use client'

import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-footer-bg);
  color: var(--color-footer-text);
  padding: calc(var(--space) * 1.5) var(--fluidSpace);
  gap: calc(var(--space) / 2);
  max-width: none;
  margin-top: calc(var(--space) * 2);

  > ${MiniHeading} {
    color: var(--color-footer-text-alpha-50);
    letter-spacing: 0.25em;
    user-select: none;
  }
`
