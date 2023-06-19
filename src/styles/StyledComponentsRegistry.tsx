'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import CustomThemeProvider from './CustomThemeProvider'
import GlobalStyle from './GlobalStyle'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()

    // clearTag is a function
    // @ts-ignore
    styledComponentsStyleSheet.instance.clearTag()

    return <>{styles}</>
  })

  if (typeof window !== 'undefined') {
    return (
      <CustomThemeProvider>
        <>
          {/* @ts-ignore */}
          <GlobalStyle />
          <>{children}</>
        </>
      </CustomThemeProvider>
    )
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <CustomThemeProvider>
        <>
          {/* @ts-ignore */}
          <GlobalStyle />
          <>{children}</>
        </>
      </CustomThemeProvider>
    </StyleSheetManager>
  )
}
