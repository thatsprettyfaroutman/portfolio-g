import createThemes from 'styled-palette'

// TODO: remove styled-palette as is

// Palettes
// ------------------------------------

const mainPalette = {
  main: {
    bg: '#000',
    fg: '#fff',
    // bg: '#010A2D',
    // fg: '#fff',
  },
  accent: ['#f0f', '#0ff'],
}

// Theme
// ------------------------------------

const {
  themes: [mainTheme],
  palette, //: palette0,
  usePalette,
} = createThemes([mainPalette])

export { palette, usePalette, mainTheme }
