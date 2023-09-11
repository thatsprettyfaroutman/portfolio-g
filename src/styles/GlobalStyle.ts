import { createGlobalStyle } from 'styled-components'
import FONT from './fonts'
import { gridVars } from './grid'
import { palette } from './theme'

const GlobalStyle = createGlobalStyle`
  :root {
    ${gridVars};

    background-color: ${palette.main.background};
    color: ${palette.main.text};
    font-family: ${FONT.Montserrat};
    font-size: 16px;
    line-height: 1.4;
  }

  body {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, p, li, a, strong, i, em {
    ::selection {
      background-color: ${palette.accents[0].brighten(2)};
      color: ${palette.main.background};
      text-shadow: 0 2px 0 ${palette.accents[0]};
    }
  }

`

export default GlobalStyle
