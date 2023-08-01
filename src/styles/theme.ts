import chroma from 'chroma-js'
import createThemes from 'styled-palette'

// Palettes
// ------------------------------------

const mainPalette = {
  main: {
    background: {
      top: chroma('#0ff').darken(5).hex(),
      bottom: chroma('#f0f').darken(6).hex(),
    },
    text: '#fff',
    border: '#fff',
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

export { palette, usePalette, mainTheme }
