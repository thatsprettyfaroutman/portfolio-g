'use client'

import lerp from 'lerp'
import { a, useSpringValue } from 'react-spring'
import { SmallUi } from '@/components/Text'
import { useTheme } from '@/styles/ThemeProvider'
import { Wrapper, Switch, SwitchButton } from './styled'

const STATES = ['dark', 'light', 'system'] as const

// switch width - button width - left - (left-border)
const MAX_X = 60 - 10 - 5 - 3

type TThemeToggleProps = {}

const ASwitchButton = a(SwitchButton)

export default function ThemeToggle(props: TThemeToggleProps) {
  const { state, changeTheme } = useTheme()
  const index = STATES.indexOf(state)
  const spring = useSpringValue(0)
  spring.start(index / (STATES.length - 1))

  return (
    <Wrapper
      {...props}
      onClick={() => {
        const nextIndex = (index + 1) % STATES.length
        spring.start(nextIndex / (STATES.length - 1))
        changeTheme(STATES[nextIndex])
      }}
    >
      <Switch>
        <ASwitchButton
          style={{
            transform: spring.to(
              (p) => `translate3d(${lerp(0, MAX_X, p)}px, 0, 0)`
            ),
          }}
        />
      </Switch>
      <SmallUi>{state}</SmallUi>
    </Wrapper>
  )
}
