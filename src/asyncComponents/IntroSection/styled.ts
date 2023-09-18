'use client'

import { type FC } from 'react'
import styled from 'styled-components'
import Section from '@/components/Section'
import SmoothLink from '@/components/SmoothLink'
import { MediumParagraph, Heading3, Markdown } from '@/components/Text'
import { MEDIA } from '@/styles/media'

export const Wrapper = styled.section`
  display: grid;
  grid-gap: calc(var(--space) * 1.5);
`

export const IntroContent = styled(Section).attrs({ as: 'div' })`
  max-width: 800px;
  grid-gap: calc(var(--space) / 2);
`

export const IntroFooter = styled.div`
  display: grid;
  grid-gap: var(--space);
  justify-items: center;
  min-height: var(--space);
  margin-top: calc(var(--space) / 4);

  > :last-child {
    grid-row: 1;
    justify-self: end;
  }

  ${MEDIA.tablet} {
    grid-template-columns: auto auto;
    justify-items: start;

    > :last-child {
      grid-row: initial;
    }
  }
`

export const CustomMarkdown = styled(Markdown).attrs((props) => ({
  ...props,
  components: {
    ...props.components,
    p: MediumParagraph as FC,
    h1: Heading3 as FC,
    h2: Heading3 as FC,
    a: SmoothLink as FC,
  },
}))`
  grid-gap: calc(var(--space) / 4);

  > ${MediumParagraph} {
    margin-right: calc(var(--fluidSpace) / -4);
  }

  > ${Heading3} {
    text-align: center;
    margin-bottom: calc(var(--space) / 2);
  }
`
