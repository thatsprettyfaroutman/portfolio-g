import chroma from 'chroma-js'
import createThemes from 'styled-palette'

// Palettes
// ------------------------------------

const mainPalette = {
  main: {
    background: {
      top: chroma('#0ff').darken(5).hex(),
      bottom: '#000',
    },
    text: '#fff',
    border: '#fff',
  },
  accents: ['#f0f', '#0ff', '#40F'],
}

// Theme
// ------------------------------------

const {
  themes: [mainTheme],
  palette,
  usePalette,
} = createThemes([mainPalette])

export { palette, usePalette, mainTheme }
