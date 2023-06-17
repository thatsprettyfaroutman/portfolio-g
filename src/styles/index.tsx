import { PropsWithChildren, useState, useEffect } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import createThemes from 'styled-palette'
import { FONT } from './fonts'

// Palettes
// ------------------------------------

const mainPalette = {
  main: {
    bg: '#010A2D',
    fg: '#fff',
  },
  accent: ['#f0f', '#0ff'],
}

// Theme
// ------------------------------------

const {
  themes: [mainTheme],
  palette,
  usePalette,
} = createThemes([mainPalette])

const useFontsReady = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setLoaded(true)
      return
    }
    document.fonts.ready.then(() => {
      setLoaded(true)
    })
  }, [])

  return loaded
}

// Global styles
// ------------------------------------

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: ${palette.main.bg};
    color: ${palette.main.fg};
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

// Custom theme provider
// ------------------------------------

function CustomThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>
}

// Exports
// ------------------------------------

export {
  GlobalStyle,
  CustomThemeProvider,
  palette,
  usePalette,
  useFontsReady,
  FONT,
}
