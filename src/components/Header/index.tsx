import { type PropsWithChildren } from 'react'
import { type THeaderStyledProps, Wrapper } from './styled'

// To enable theme toggling look for commit: `feat: disable theme toggling for now`

type THeaderProps = PropsWithChildren<THeaderStyledProps>

export default function Header({ children, ...restProps }: THeaderProps) {
  return (
    <Wrapper {...restProps}>
      {/* 
        // TODO: fix type error
        @ts-ignore */}
      {children}
    </Wrapper>
  )
}
