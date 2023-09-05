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
    background: '#f8f8f8',
    backgroundAlt: '#fff',
    text: '#000',
    border: '#b7b7b7',
  },
  shade: {
    background: '#000',
    text: '#fff',
  },
  panel: {
    background: '#db00ff',
    backgroundAlt: '#00ffb2',
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
