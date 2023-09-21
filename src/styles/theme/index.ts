import { darkPalette, lightPalette } from './palettes'
import { generateCss } from './utils'

export { useColor } from './hooks/useColor'
export { useColorBrightness } from './hooks/useColorBrightness'

export const darkCss = generateCss(darkPalette)
export const lightCss = generateCss(lightPalette)
