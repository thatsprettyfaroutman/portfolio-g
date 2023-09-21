import { useEffect, useState } from 'react'
import chroma from 'chroma-js'
import path from 'ramda/src/path'
import useMediaQuery from 'react-use-media-query-ts'
import { css } from 'styled-components'
import { useTheme } from './ThemeProvider/context'

// Palettes
// ------------------------------------

const CSS_COLOR_PREFIX = '--color'
const alphas = [15, 30, 50, 70, 80]
const ups = [200]
const downs = [20]

const darkPalette = {
  main: {
    bg: '#080808',
    bgAlt: '#000',
    text: '#fff',
    border: '#b7b7b7',
  },
  shade: {
    bg: '#000',
    text: '#fff',
  },
  footer: {
    bg: '#000',
    text: '#fff',
  },
  panel: {
    bg: '#db00ff',
    bgAlt: '#00ffb2',
    text: '#fff',
  },
  accents: ['#f0f', '#0ff', '#40F'],
}

const lightPalette = {
  main: {
    bg: '#f8f8f8',
    bgAlt: '#fff',
    text: '#000',
    border: '#b7b7b7',
  },
  shade: {
    bg: '#000',
    text: '#fff',
  },
  footer: {
    bg: '#000',
    text: '#fff',
  },
  panel: {
    bg: '#db00ff',
    bgAlt: '#00ffb2',
    text: '#fff',
  },
  accents: ['#0f0', '#ff0', '#40F'],
}

// Recursively generate css variables from palette
const generateCss = <T extends typeof darkPalette>(
  palette: T,
  { levelDirection = 1 } = {}
) => {
  type TCssRules = Record<string, string> | string | string[] | TCssRules[]
  const crawl = (item: unknown, prefix = [CSS_COLOR_PREFIX]): TCssRules => {
    if (typeof item === 'string') {
      const key = prefix.join('-')
      return {
        // Base color
        [key]: item,

        // Ups (brightens)
        ...Object.fromEntries(
          ups.map((amount) => [
            `${key}-up-${amount}`,
            chroma(item)
              .brighten((amount / 100) * levelDirection)
              .css(),
          ])
        ),

        // Downs (darken)
        ...Object.fromEntries(
          downs.map((amount) => [
            `${key}-down-${amount}`,
            chroma(item)
              .darken((amount / 100) * levelDirection)
              .css(),
          ])
        ),

        // Alphas
        ...Object.fromEntries(
          alphas.map((amount) => [
            `${key}-alpha-${amount}`,
            chroma(item)
              .alpha(amount / 100)
              .css(),
          ])
        ),
      }
    }
    if (Array.isArray(item)) {
      return item.flatMap((x, i) => crawl(x, [...prefix, i.toString()]))
    }
    if (typeof item === 'object') {
      return (
        Object.entries(item as Record<string, string>)
          // Make sure we don't include nullish values
          .filter((x) => x?.[1] ?? false)
          .flatMap(([key, value]) => crawl(value, [...prefix, key]))
      )
    }
    return []
  }
  return css`
    ${crawl(palette)};
  `
}

export const darkCss = generateCss(darkPalette)
export const lightCss = generateCss(lightPalette)

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
  const [theme] = useTheme()
  const light =
    useMediaQuery('(prefers-color-scheme: light)') && theme === 'system'

  // Not using useMemo, so next doesn't complain build being different from render
  const [color, setColor] = useState(() => getColor(colorCssKey))
  useEffect(() => {
    setColor(getColor(colorCssKey, light ? lightPalette : darkPalette))
  }, [colorCssKey, light])
  return color
}
