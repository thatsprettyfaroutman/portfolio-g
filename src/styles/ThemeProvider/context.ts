// To enable theme toggling look for commit: `feat: disable theme toggling for now`

const THEME_KEYS = ['system', 'light', 'dark'] as const

type TTheme = (typeof THEME_KEYS)[number]

const NOOP = () => {}

export const useTheme = () => {
  const theme = 'dark' as TTheme
  const computedTheme = theme
  const changeTheme = NOOP

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
