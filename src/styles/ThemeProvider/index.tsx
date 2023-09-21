import { type PropsWithChildren } from 'react'
import { createGlobalStyle } from 'styled-components'
import { darkCss } from '@/styles/theme'

export { useTheme } from './context'

// To enable theme toggling look for commit: `feat: disable theme toggling for now`

const DarkTheme = createGlobalStyle`
  :root {
    ${darkCss};
  }
`

const ThemeHandler = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DarkTheme />
      {children}
    </>
  )
}

export default function ThemeProvider(props: PropsWithChildren) {
  return <ThemeHandler {...props} />
}
