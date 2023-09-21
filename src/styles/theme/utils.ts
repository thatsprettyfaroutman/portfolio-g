import chroma from 'chroma-js'
import { css } from 'styled-components'
import { CSS_COLOR_PREFIX, ups, downs, alphas } from './consts'
import { darkPalette } from './palettes'

// Recursively generate css variables from palette
export const generateCss = <T extends typeof darkPalette>(
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
