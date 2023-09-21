'use client'

import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'

type TLogoProps = {
  children?: React.ReactNode
}

const Wrapper = styled(MiniHeading)`
  text-align: center;
  color: var(--color-main-text);
  letter-spacing: 0.5em;
`

export default function Logo({
  children = 'viljami.dev',
  ...restProps
}: TLogoProps) {
  return <Wrapper {...restProps}>{children}</Wrapper>
}
