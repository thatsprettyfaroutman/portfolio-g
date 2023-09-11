'use client'

import styled, { keyframes } from 'styled-components'

type TAnimatedTextProps = {
  children: string
  delay?: number
  trailDelay?: number
}

const Word = styled.span<{
  index: number
  delay: number
  trailDelay: number
}>`
  animation-name: ${keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `};
  animation-duration: 1000ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: ${(p) => p.index * p.trailDelay + p.delay}ms;
  animation-fill-mode: backwards;
`

export default function AnimatedText({
  children,
  delay = 0,
  trailDelay = 0,
}: TAnimatedTextProps) {
  const words = children.split(' ')

  return words.map((word, i) => (
    <Word delay={delay} trailDelay={trailDelay} index={i} key={i}>
      {word}{' '}
    </Word>
  ))
}
