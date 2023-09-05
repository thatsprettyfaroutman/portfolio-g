import createThemes from 'styled-palette'

// Palettes
// ------------------------------------

const mainPalette = {
  main: {
    background: '#f8f8f8',
    backgroundAlt: '#fff',
    text: '#000',
    border: '#b7b7b7',
  },
  shade: {
    background: '#000',
    text: '#fff',
  },
  footer: {
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

export type TPaletteColor = typeof palette.main.background
