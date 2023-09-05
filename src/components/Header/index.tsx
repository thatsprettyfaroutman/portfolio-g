'use client'

import styled from 'styled-components'
import Logo from '@/components/Logo'

type THeaderProps = {
  children: React.ReactNode
}

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: calc(var(--space) / 2);
  padding: calc(var(--space) / 2) var(--space);

  display: flex;
  justify-content: space-between;
  align-items: center;

  user-select: none;
`

export default function Header({ children, ...restProps }: THeaderProps) {
  return (
    <Wrapper {...restProps}>
      <Logo />
      {children}
    </Wrapper>
  )
}
