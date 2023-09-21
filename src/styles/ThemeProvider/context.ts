import { useCallback, useEffect, useState } from 'react'
import constate from 'constate'

const THEME_KEYS = ['system', 'light', 'dark'] as const

type TTheme = (typeof THEME_KEYS)[number]

const isTheme = (theme?: unknown): theme is TTheme =>
  typeof theme === 'string' &&
  // @ts-ignore
  THEME_KEYS.includes(theme)

const useThemeProviderContext = () => {
  const [theme, setTheme] = useState<TTheme>('system')
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

  const res = [theme, changeTheme] as [typeof theme, typeof changeTheme] & {
    theme: typeof theme
    changeTheme: typeof changeTheme
  }
  res.theme = theme
  res.changeTheme = changeTheme
  return res
}

export const [ThemeContextProvider, useTheme] = constate(
  useThemeProviderContext
)
