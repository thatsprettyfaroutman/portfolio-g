import chroma from 'chroma-js'
import createThemes from 'styled-palette'

// Palettes
// ------------------------------------

const mainPalette = {
  main: {
    // background: {
    //   top: chroma('#40F').darken(4).css(),
    //   bottom: chroma('#40F').darken(6).css(),
    // },
    background: { top: '#fff', bottom: '#f8f8f8' },
    text: '#000',
    border: chroma('#000').alpha(0.3).css(),
  },
  shade: {
    background: '#000',
    text: '#fff',
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
