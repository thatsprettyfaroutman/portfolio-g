'use client'

import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'
import { palette } from '@/styles/theme'

type TLogoProps = {
  children?: React.ReactNode
}

const Wrapper = styled(MiniHeading)`
  text-align: center;
  color: ${palette.main.text};
  letter-spacing: 0.5em;
`

export default function Logo({
  children = 'Viljami.dev / ghost',
  ...restProps
}: TLogoProps) {
  return <Wrapper {...restProps}>{children}</Wrapper>
}
