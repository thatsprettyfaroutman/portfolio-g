import { createGlobalStyle } from 'styled-components'
import FONT from './fonts'
import { gridVars } from './grid'

const GlobalStyle = createGlobalStyle`
  :root {
    ${gridVars};
    background-color: var(--color-main-bg);
    color: var(--color-main-text);
    font-family: ${FONT.Montserrat};
    font-size: 16px;
    line-height: 1.4;
  }

  body {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, p, li, a, strong, i, em {
    ::selection {
      background-color: var(--color-accents-0-up-2);
      color: var(--color-main-bg);
      text-shadow: 0 2px 0 var(--color-accents-0);
    }
  }

`

export default GlobalStyle
