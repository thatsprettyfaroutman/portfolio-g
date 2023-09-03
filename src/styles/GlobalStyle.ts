import { createGlobalStyle } from 'styled-components'
import FONT from './fonts'
import { gridVars } from './grid'
import { palette } from './theme'

const GlobalStyle = createGlobalStyle`
  :root {
    ${gridVars};

    background-color: ${palette.main.background.bottom};
    color: ${palette.main.text};
    font-family: ${FONT.Montserrat};
    font-size: 16px;
    line-height: 1.4;
  }

  body {
    margin: 0;
    background-image: url(/paper.png);
    background-size: ${512 / 4}px;
    background-blend-mode: overlay;
  }

  h1, h2, h3, h4, h5, h6, p, li, a, strong {
    ::selection {
    background-color: ${palette.accents[0].brighten(2)};
    color: ${palette.main.background.bottom};
    text-shadow: 0 2px 0 ${palette.accents[0]};
  }

`

export default GlobalStyle
