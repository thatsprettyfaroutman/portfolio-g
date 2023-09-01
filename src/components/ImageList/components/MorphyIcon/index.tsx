import React from 'react'
import { a, useSpring } from 'react-spring'
import styled from 'styled-components'
import { palette } from '@/styles/theme'

const PATH = {
  right: ['M9 5L5 9', 'M5 1L9 5'],
  rightCross: ['M11 1L3 9', 'M3 1L11 9'],
  left: ['M5 5L9 9', 'M9 1L5 5'],
  leftCross: ['M3 1L11 9', 'M11 1L3 9'],
} as const

type TMorphyIconProps = { icon: keyof typeof PATH }

const Wrapper = styled.svg`
  display: block;
  width: 100%;
  height: 100%;

  > g {
    transform-origin: 50% 50%;
  }

  > g > path {
    stroke: ${palette.shade.text};
  }
`

export default function MorphyIcon({ icon, ...restProps }: TMorphyIconProps) {
  const paths = PATH[icon]

  const { d0, d1, rotation } = useSpring({
    d0: paths[0],
    d1: paths[1],
    rotation: icon.includes('Cross') ? 90 : 0,
  })

  return (
    <Wrapper
      width="128"
      height="128"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <a.g
        transform={rotation.to((angle) => `rotate(${angle}) translate(4 6)`)}
      >
        <a.path
          strokeWidth={22 / 40}
          strokeLinecap="round"
          strokeLinejoin="round"
          d={d0}
        />

        <a.path
          strokeWidth={22 / 40}
          strokeLinecap="round"
          strokeLinejoin="round"
          d={d1}
        />
      </a.g>
    </Wrapper>
  )
}
