import chroma from 'chroma-js'
import { useColor } from './useColor'

export const useColorBrightness = (colorCssKey: string) => {
  const color = useColor(colorCssKey)
  return chroma(color).get('lab.l') * 0.01
}
