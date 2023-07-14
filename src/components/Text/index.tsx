import styled, { css } from 'styled-components'
import FONT from '@/styles/fonts'

const noMargins = css`
  margin-top: 0;
  margin-bottom: 0;
`

const Heading1 = styled.h1`
  ${noMargins};
  font-family: ${FONT.Montserrat};
  font-weight: 400;
  font-size: 48px;
  line-height: 48px;
`

const Heading2 = styled(Heading1).attrs({ as: 'h2' })``

const Heading3 = styled.h3`
  ${noMargins};
  font-family: ${FONT.Montserrat};
  font-weight: 400;
  font-size: 28px;
  line-height: 40px;
`

const HeadingBlock = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 8);
  grid-column: 1 / -1;
  place-items: center;
`

const Paragraph = styled.p`
  ${noMargins};
  font-family: ${FONT.Karla};
  font-weight: 400;
  font-size: 17px;
  line-height: 25.5px;
`

const ParagraphBlock = styled.div<{ allowEndBleed?: boolean }>`
  display: grid;
  grid-gap: calc(var(--maxCol) / 4);

  ${(p) =>
    p.allowEndBleed &&
    css`
      // Allow text to bleed outside to visually balance text lines
      margin-right: calc(var(--col) / -2);
    `}
`

const SmallParagraph = styled(Paragraph)`
  font-size: 15px;
  line-height: 22.5px;
`

const SmallParagraphBlock = styled(ParagraphBlock)``

const MediumParagraph = styled(Paragraph)`
  font-family: ${FONT.Montserrat};
  font-size: 18px;
  line-height: 36px;
`
const MediumParagraphBlock = styled(ParagraphBlock)`
  grid-gap: calc(var(--maxCol) / 2);
`

const BigParagraph = styled(Paragraph)`
  font-family: ${FONT.Montserrat};
  font-size: 24px;
  line-height: 36px;
`
const BigParagraphBlock = styled(ParagraphBlock)`
  grid-gap: calc(var(--maxCol) / 2);
`

const Text = {
  Heading1,
  Heading2,
  Heading3,
  HeadingBlock,
  Paragraph,
  ParagraphBlock,
  SmallParagraph,
  SmallParagraphBlock,
  MediumParagraph,
  MediumParagraphBlock,
  BigParagraph,
  BigParagraphBlock,
}

export default Text
