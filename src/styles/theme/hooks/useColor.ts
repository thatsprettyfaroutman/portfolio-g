import { useState, useEffect } from 'react'
import { path } from 'ramda'
// Uncomment to add theme support 1/2
// import { useTheme } from '@/styles/ThemeProvider/context'
import { CSS_COLOR_PREFIX } from '../consts'
import { darkPalette, lightPalette } from '../palettes'

const getColor = (colorCssKey: string, palette = darkPalette) => {
  const keyPath = colorCssKey.replace(`${CSS_COLOR_PREFIX}-`, '').split('-')
  const color = path<string | undefined>(keyPath, palette)

  if (!color) {
    console.error(`Color ${colorCssKey} not found in theme`)
    return ''
  }

  return color
}

export const useColor = (colorCssKey: string) => {
  // Uncomment to add theme support 1/2
  // const [theme] = useTheme()
  const theme = 'dark' as 'dark' | 'light'

  // Not using useMemo, so next doesn't complain build being different from render
  const [color, setColor] = useState(() => getColor(colorCssKey))

  useEffect(() => {
    setColor(
      getColor(colorCssKey, theme === 'light' ? lightPalette : darkPalette)
    )
  }, [colorCssKey, theme])

  return color
}
