import { type PropsWithChildren } from 'react'
// Uncomment to enable theme toggle 1/2
// import ThemeToggle from '@/components/ThemeToggle/lazy'
import { type THeaderStyledProps, Wrapper } from './styled'

type THeaderProps = PropsWithChildren<THeaderStyledProps>

export default function Header({ children, ...restProps }: THeaderProps) {
  return (
    <Wrapper {...restProps}>
      {/* 
        // TODO: fix type error
        @ts-ignore */}
      {children}
      {/* Uncomment to enable theme toggle 2/2 */}
      {/* <ThemeToggle /> */}
    </Wrapper>
  )
}
