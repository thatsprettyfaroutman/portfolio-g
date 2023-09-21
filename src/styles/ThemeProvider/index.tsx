import { type PropsWithChildren } from 'react'
import { createGlobalStyle } from 'styled-components'
import { darkCss, lightCss } from '@/styles/theme'
import { ThemeContextProvider, useTheme } from './context'

export { useTheme } from './context'

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
  }
`

const LightTheme = createGlobalStyle`
  :root {
    ${lightCss};
  }
`

const ThemeHandler = ({ children }: PropsWithChildren) => {
  const { state } = useTheme()

  console.log('state', state)

  return (
    <>
      {state === 'system' ? <SystemTheme /> : null}
      {state === 'light' ? <LightTheme /> : null}
      {state === 'dark' ? <DarkTheme /> : null}
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
