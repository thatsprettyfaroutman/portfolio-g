import { createGlobalStyle } from 'styled-components'
import FONT from './fonts'
import { palette } from './theme'
import { gridVars } from './grid'

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
  }

`

export default GlobalStyle
