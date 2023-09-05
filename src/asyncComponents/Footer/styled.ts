'use client'

import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'
import { palette } from '@/styles/theme'

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${palette.footer.background};
  color: ${palette.footer.text};
  padding: calc(var(--space) * 1.5) var(--fluidSpace);
  gap: calc(var(--space) / 2);
  max-width: none;

  > ${MiniHeading} {
    color: ${palette.footer.text.alpha(0.5)};
    letter-spacing: 0.25em;
    user-select: none;
  }
`

export const socialMediaLinksVariant = palette.footer
