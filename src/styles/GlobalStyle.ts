import { createGlobalStyle } from 'styled-components'
import FONT from './fonts'
import { palette } from './theme'

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: ${palette.main.background.bottom};
    color: ${palette.main.text};
    font-family: ${FONT.Barlow};
    font-size: 16px;
    line-height: 1.4;
  }

  body {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${FONT.Blinker};
  }
`

export default GlobalStyle
