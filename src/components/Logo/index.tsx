'use client'

import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'
import FONT from '@/styles/fonts'
import { palette } from '@/styles/theme'

type TLogoProps = {
  children?: React.ReactNode
}

const Wrapper = styled(MiniHeading)`
  text-align: center;
  color: ${palette.main.text};
  /* font-family: ${FONT.Montserrat}; */
  /* font-size: 12px; */
  /* line-height: calc(var(--space) / 2); */
  letter-spacing: 0.5em;
  /* text-transform: none; */
`

export default function Logo({
  children = 'Viljami.dev / ghost',
  ...restProps
}: TLogoProps) {
  return <Wrapper {...restProps}>{children}</Wrapper>
}
