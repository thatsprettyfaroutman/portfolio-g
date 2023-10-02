'use client'

import { useEffect, useState } from 'react'
import { a, useSpringValue, config } from 'react-spring'
import styled, { keyframes } from 'styled-components'

type TArrowProps = { delay?: number }

const Wrapper = styled.div`
  transform: translateX(-50%);

  > svg {
    display: block;
    animation-name: ${keyframes`
      0%, 100% {
        transform: translate3d(0, 0, 0);
      }
      45% {
        transform: translate3d(0, calc(var(--space) / 8), 0);
      }
    `};
    animation-iteration-count: infinite;
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;

    > path {
      fill: var(--color-main-text);
    }
  }
`

const AWrapper = a(Wrapper)

function Arrow({ delay = 4000, ...restProps }: TArrowProps) {
  const [didScroll, setDidScroll] = useState(false)
  const opacity = useSpringValue(0)

  useEffect(() => {
    opacity.start(1, { delay, config: config.molasses })

    // Run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (didScroll) {
      return
    }
    const scroll = () => {
      setDidScroll(true)
      opacity.start(0, { config: config.default })
    }
    window.addEventListener('scroll', scroll)

    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [didScroll, opacity])

  return (
    <AWrapper {...restProps} style={{ opacity }}>
      <svg
        width="8"
        height="41"
        viewBox="0 0 8 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.64645 40.3536C3.84171 40.5488 4.15829 40.5488 4.35355 40.3536L7.53553 37.1716C7.7308 36.9763 7.7308 36.6597 7.53553 36.4645C7.34027 36.2692 7.02369 36.2692 6.82843 36.4645L4 39.2929L1.17157 36.4645C0.976311 36.2692 0.659728 36.2692 0.464466 36.4645C0.269204 36.6597 0.269204 36.9763 0.464466 37.1716L3.64645 40.3536ZM3.5 0L3.5 40H4.5L4.5 0L3.5 0Z"
          fill="white"
        />
      </svg>
    </AWrapper>
  )
}

// Sneakily make Arrow usable inside styled css
export default styled(Arrow)``
