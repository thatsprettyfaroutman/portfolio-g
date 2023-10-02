'use client'

import { type FC } from 'react'
import styled from 'styled-components'
import Arrow from '@/components/Arrow'
import CenteredWrapper from '@/components/CenteredWrapper'
import SmoothLink from '@/components/SmoothLink'
import { MediumParagraph, Heading3, Markdown } from '@/components/Text'
import { MEDIA } from '@/styles/media'

export const Wrapper = styled.section`
  display: grid;
  grid-gap: calc(var(--space) * 1.5);
  background: linear-gradient(
    var(--color-hero-bg),
    var(--color-hero-bg-alpha-0)
  );
  margin-bottom: calc(var(--space) * -1);
`

export const IntroContent = styled(CenteredWrapper)`
  position: relative;
  max-width: none;
  align-items: center;
  justify-content: center;

  ${MEDIA.tabletLandscape} {
    grid-gap: calc(var(--space) / 2);
    grid-template-columns: 1fr 1fr;
    justify-content: initial;
  }
`

export const IntroInfo = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 2);
  max-width: 600px;
`

export const PhoneIntroFooter = styled.div`
  display: grid;
  grid-gap: var(--space);
  justify-items: center;
  min-height: var(--space);
  margin-top: calc(var(--space) / 4);

  ${MEDIA.tablet} {
    display: none;
  }
`

export const AbsoluteArrow = styled(Arrow)`
  position: absolute;
  bottom: var(--space);
  left: 50%;
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
    margin-bottom: calc(var(--space) / 2);
    text-align: center;
    ${MEDIA.tabletLandscape} {
      text-align: initial;
    }
  }
`
