'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { mainTheme } from './theme'

export default function CustomThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={mainTheme}>
      <>{children}</>
    </ThemeProvider>
  )
}
