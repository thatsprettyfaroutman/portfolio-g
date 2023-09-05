'use client'

import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'
import { palette } from '@/styles/theme'

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space);
  gap: calc(var(--space) / 2);
  max-width: none;
  border-top: 1px solid ${palette.main.border.alpha(0.3)};

  > ${MiniHeading} {
    color: ${palette.main.text.alpha(0.5)};
    letter-spacing: 0.25em;
  }
`
