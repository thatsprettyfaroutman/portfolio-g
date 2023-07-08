import styled from 'styled-components'
import FONT from '@/styles/fonts'
import { palette } from '@/styles/theme'

// TODO: Remove components/DeprecatedText

/**
 * @deprecated
 */
const MainHeading = styled.h1`
  font-family: ${FONT.Montserrat};
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 54px;
`

/**
 * @deprecated
 */
const Heading = styled.h2`
  font-family: ${FONT.Montserrat};
  font-style: normal;
  font-weight: 200;
  font-size: 40px;
  line-height: 48px;
`

/**
 * @deprecated
 */
const Paragraph = styled.p`
  font-family: ${FONT.Karla};
  font-style: normal;
  font-weight: 200;
  font-size: 28px;
  line-height: 48px;
  color: ${palette.main.text.darken(2.5)};
  // hyphens: auto;
`

/**
 * @deprecated
 */
const ParagraphSmall = styled.p`
  font-family: ${FONT.Karla};
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  line-height: 42px;
  color: ${palette.main.text.darken(2.5)};
  // hyphens: auto;
`

/**
 * @deprecated
 */
const Block = styled.div`
  max-width: 768px;
  padding: 0 32px;
  margin: 0 auto;

  > ${MainHeading} {
    text-align: center;
  }
`

/**
 * @deprecated
 */
const Text = {
  MainHeading,
  Heading,
  Paragraph,
  ParagraphSmall,
  Block,
}

export default Text
