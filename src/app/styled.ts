'use client'

import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  html, body {
    background-color: #000;
    height: 100%;
    touch-action: none;
    overflow: hidden
  }
`
