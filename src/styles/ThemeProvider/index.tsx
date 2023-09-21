import { type PropsWithChildren } from 'react'
import { createGlobalStyle } from 'styled-components'
import {
  darkCss, // Uncomment to add theme support 0/6
  // lightCss
} from '@/styles/theme'

// Uncomment to add theme support 1/6
// import { ThemeContextProvider, useTheme } from './context'

export { useTheme } from './context'

// Uncomment to add theme support 2/6
// const SystemTheme = createGlobalStyle`
//   :root {
//     ${darkCss};
//     @media (prefers-color-scheme: light) {
//       ${lightCss};
//     }
//   }
// `
//
// const LightTheme = createGlobalStyle`
//   :root {
//     ${lightCss};
//   }
// `

const DarkTheme = createGlobalStyle`
  :root {
    ${darkCss};
  }
`

const ThemeHandler = ({ children }: PropsWithChildren) => {
  // Uncomment to add theme support 3/6
  // const { state } = useTheme()

  return (
    <>
      {/* Uncomment to add theme support 4/6 */}
      {/* 
        {state === 'system' ? <SystemTheme /> : null}
        {state === 'light' ? <LightTheme /> : null}
        {state === 'dark' ? <DarkTheme /> : null} 
      */}
      {/* Remove next line if using multiple themes 5/6 */}
      <DarkTheme />
      {children}
    </>
  )
}

export default function ThemeProvider(props: PropsWithChildren) {
  // Uncomment to add theme support 5/6
  // return (
  //   <ThemeContextProvider>
  //     <ThemeHandler {...props} />
  //   </ThemeContextProvider>
  // )
  return <ThemeHandler {...props} />
}
