import { type PropsWithChildren } from 'react'
import ThemeToggle from '@/components/ThemeToggle/lazy'
import { type THeaderStyledProps, Wrapper } from './styled'

type THeaderProps = PropsWithChildren<THeaderStyledProps>

export default function Header({ children, ...restProps }: THeaderProps) {
  return (
    <Wrapper {...restProps}>
      {children}
      <ThemeToggle />
    </Wrapper>
  )
}
