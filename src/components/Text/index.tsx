'use client'

import { FC } from 'react'
import styled, { css } from 'styled-components'
import ReactMarkdown from 'react-markdown'
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

/**
 * @deprecated
 */
export const HeadingBlock = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 8);
  grid-column: 1 / -1;
  place-items: center;
`

export const Paragraph = styled.p`
  ${noMargins};
  font-family: ${FONT.Karla};
  font-weight: 400;
  font-size: 17px;
  line-height: 25.5px;
  color: ${palette.main.text.alpha(0.7)};
`
/**
 * @deprecated
 */
export const ParagraphBlock = styled.div<{ allowEndBleed?: boolean }>`
  display: grid;
  grid-gap: calc(var(--maxCol) / 4);

  ${(p) =>
    p.allowEndBleed &&
    css`
      // Allow text to bleed outside to visually balance text lines
      margin-right: calc(var(--col) / -2);
    `}
`

export const UnorderedList = styled.ul`
  ${noMargins};
  padding: 0;
  padding-left: calc(var(--maxCol) / 4);
`

export const SmallParagraph = styled(Paragraph)`
  font-size: 15px;
  line-height: 22.5px;
`
/**
 * @deprecated
 */
export const SmallParagraphBlock = styled(ParagraphBlock)``

export const MediumParagraph = styled(Paragraph)`
  font-family: ${FONT.Montserrat};
  font-size: 18px;
  line-height: 36px;
`
/**
 * @deprecated
 */
export const MediumParagraphBlock = styled(ParagraphBlock)`
  grid-gap: calc(var(--maxCol) / 2);
`

export const BigParagraph = styled(Paragraph)`
  font-family: ${FONT.Montserrat};
  font-size: 24px;
  line-height: 36px;
`
/**
 * @deprecated
 */
export const BigParagraphBlock = styled(ParagraphBlock)`
  grid-gap: calc(var(--maxCol) / 2);
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
    li: styled(Paragraph).attrs({ as: 'li' })`` as FC,
    img: styled.img`
      width: 32px;
      height: auto;
    ` as FC,
  },
})<{
  // TODO: rename endBleed
  allowEndBleed?: boolean
}>`
  display: grid;
  grid-gap: calc(var(--maxCol) / 4);

  ${(p) =>
    p.allowEndBleed &&
    css`
      // Allow text to bleed outside to visually balance text lines
      margin-right: calc(var(--col) / -2);
    `}

  strong {
    color: ${palette.main.text};
    font-weight: inherit;
  }
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
    li: styled(SmallParagraph).attrs({ as: 'li' })`` as FC,
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
  grid-gap: calc(var(--maxCol) / 4);
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
  grid-gap: calc(var(--maxCol) / 2);
`
