'use client'

import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import styled, { css } from 'styled-components'
import FONT from '@/styles/fonts'
import { palette } from '@/styles/theme'

// TODO: clean up deprecated styles

export const noMargins = css`
  margin-top: 0;
  margin-bottom: 0;
`

export const Heading1 = styled.h1`
  ${noMargins};
  font-family: ${FONT.Montserrat};
  font-weight: 400;
  font-size: 48px;
  line-height: 48px;
`

export const Heading2 = styled(Heading1).attrs({ as: 'h2' })``

export const Heading3 = styled.h3`
  ${noMargins};
  font-family: ${FONT.Montserrat};
  font-weight: 400;
  font-size: 28px;
  line-height: 40px;
`

export const Heading4 = styled.h4`
  ${noMargins};
  font-family: ${FONT.Montserrat};
  font-weight: 400;
  font-size: 17px;
  line-height: 25.5px;
`

export const MiniHeading = styled.h5`
  ${noMargins};
  font-family: ${FONT.Montserrat};
  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${palette.main.border.brighten(0.7)};
`

export const Paragraph = styled.p`
  ${noMargins};
  font-family: ${FONT.Karla};
  font-weight: 400;
  font-size: 17px;
  line-height: 25.5px;
  color: ${palette.main.text.alpha(0.9)};

  > strong {
    color: ${palette.main.text};
    font-weight: inherit;
  }
`

export const UnorderedList = styled.ul`
  ${noMargins};
  padding: 0;
  padding-left: calc(var(--space) / 4);
`

export const ListItem = styled(Paragraph).attrs({ as: 'li' })``

export const MarkdownImage = styled.img`
  width: 32px;
  height: auto;
`

export const SmallParagraph = styled(Paragraph)`
  font-size: 15px;
  line-height: 22.5px;
`

export const SmallListItem = styled(SmallParagraph).attrs({ as: 'li' })``

export const MediumParagraph = styled(Paragraph)`
  font-family: ${FONT.Montserrat};
  font-size: 18px;
  line-height: 36px;
`

export const BigParagraph = styled(Paragraph)`
  font-family: ${FONT.Montserrat};
  font-size: 24px;
  line-height: 36px;
`

export const Markdown = styled(ReactMarkdown).attrs({
  components: {
    h1: Heading1 as FC,
    h2: Heading2 as FC,
    h3: Heading3 as FC,
    h4: Heading4 as FC,
    h5: Heading4 as FC,
    h6: Heading4 as FC,
    p: Paragraph as FC,
    ul: UnorderedList as FC,
    li: ListItem as FC,
    img: MarkdownImage as FC,
  },
})`
  display: grid;
  grid-gap: calc(var(--space) / 4);
`

// TODO: move these custom markdowns to components, e.g. AuthorMarkdown = styled(Markdown)...
/**
 * @deprecated
 */
export const SmallMarkdown = styled(Markdown).attrs((props) => ({
  components: {
    ...props.components,
    p: SmallParagraph as FC,
    h1: Heading4 as FC,
    h2: Heading4 as FC,
    h3: Heading4 as FC,
    li: SmallListItem as FC,
  },
}))``

/**
 * @deprecated
 */
export const MediumMarkdown = styled(Markdown).attrs((props) => ({
  components: {
    ...props.components,
    p: MediumParagraph as FC,
  },
}))`
  grid-gap: calc(var(--space) / 4);
`

/**
 * @deprecated
 */
export const BigMarkdown = styled(Markdown).attrs((props) => ({
  components: {
    ...props.components,
    p: BigParagraph as FC,
    h2: Heading4 as FC,
  },
}))`
  grid-gap: calc(var(--space) / 2);
`
