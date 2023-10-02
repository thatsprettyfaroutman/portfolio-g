'use client'

import { type ReactNode, useEffect } from 'react'
import { a, useSpringValue } from 'react-spring'
import { Wrapper } from './styled'

export type TToggleProps = {
  children: ReactNode
  onClick?: () => void
}

export default function ProfileToggle({
  children,
  ...restProps
}: TToggleProps) {
  const appear = useSpringValue(0)

  useEffect(() => {
    appear.start(1, { config: { friction: 20 } })
  }, [appear])
  return (
    <Wrapper {...restProps}>
      <a.div style={{ scale: appear, y: appear.to([0, 1], [80, 0]) }}>
        {children}
      </a.div>
    </Wrapper>
  )
}
