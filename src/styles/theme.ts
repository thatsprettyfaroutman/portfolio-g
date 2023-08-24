import chroma from 'chroma-js'
import createThemes from 'styled-palette'

// Palettes
// ------------------------------------

const mainPalette = {
  main: {
    background: {
      top: chroma('#40F').darken(4).css(),
      bottom: chroma('#40F').darken(6).css(),
    },
    text: '#fff',
    border: chroma('#fff').alpha(0.3).css(),
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
