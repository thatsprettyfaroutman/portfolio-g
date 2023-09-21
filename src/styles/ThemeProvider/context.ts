import { useCallback, useEffect, useState } from 'react'
import constate from 'constate'
import useMediaQuery from 'react-use-media-query-ts'

const THEME_KEYS = ['system', 'light', 'dark'] as const

type TTheme = (typeof THEME_KEYS)[number]

const isTheme = (theme?: unknown): theme is TTheme =>
  typeof theme === 'string' &&
  // @ts-ignore
  THEME_KEYS.includes(theme)

const useThemeProviderContext = () => {
  const [theme, setTheme] = useState<TTheme>('dark')
  useEffect(() => {
    const theme = localStorage.getItem('theme')
    setTheme(isTheme(theme) ? theme : 'system')
  }, [])

  const changeTheme = useCallback((theme: TTheme) => {
    if (!isTheme(theme)) {
      throw new Error(`Invalid theme, must be ${THEME_KEYS.join(',')}`)
    }
    localStorage.setItem('theme', theme)
    setTheme(theme)
  }, [])

  const prefersLight = useMediaQuery('(prefers-color-scheme: light)')
  const computedTheme =
    theme === 'light' || (theme === 'system' && prefersLight) ? 'light' : 'dark'

  const res = [computedTheme, changeTheme] as [
    typeof computedTheme,
    typeof changeTheme
  ] & {
    state: typeof theme
    computedTheme: typeof computedTheme
    changeTheme: typeof changeTheme
  }
  res.state = theme
  res.computedTheme = computedTheme
  res.changeTheme = changeTheme
  return res
}

export const [ThemeContextProvider, useTheme] = constate(
  useThemeProviderContext
)
