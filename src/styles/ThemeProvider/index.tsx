import { type PropsWithChildren } from 'react'
import { createGlobalStyle } from 'styled-components'
import { darkCss, lightCss } from '@/styles/theme'
import { ThemeContextProvider, useTheme } from './context'

const SystemTheme = createGlobalStyle`
  :root {
    ${darkCss};
    @media (prefers-color-scheme: light) {
      ${lightCss};
    }
  }
`

const DarkTheme = createGlobalStyle`
  :root {
    ${darkCss};
    @media (prefers-color-scheme: light) {
      ${darkCss};
    }
  }
`

const LightTheme = createGlobalStyle`
  :root {
    ${lightCss};
    @media (prefers-color-scheme: light) {
      ${lightCss};
    }
  }
`

const ThemeHandler = ({ children }: PropsWithChildren) => {
  const [theme] = useTheme()
  return (
    <>
      <SystemTheme />
      {theme === 'dark' ? <DarkTheme /> : null}
      {theme === 'light' ? <LightTheme /> : null}
      {children}
    </>
  )
}

export default function ThemeProvider(props: PropsWithChildren) {
  return (
    <ThemeContextProvider>
      <ThemeHandler {...props} />
    </ThemeContextProvider>
  )
}
