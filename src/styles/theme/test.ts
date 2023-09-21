import * as palettes from './palettes'

describe('theme palettes', () => {
  // @ts-ignore
  const deepKeys = (obj: Record<string, unknown>, prefix = []) => {
    return Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value) || typeof value === 'object') {
        // @ts-ignore
        return [key, ...deepKeys(value, [...prefix, key])]
      }
      return [...prefix, key].join('.')
    })
  }

  const paletteKeys = Object.values(palettes).map((x) => deepKeys(x))

  it('palette keys are the same', () => {
    const comparisonPalette = paletteKeys[0]
    paletteKeys.forEach((palette) => {
      expect(palette).toEqual(comparisonPalette)
    })
  })
})
