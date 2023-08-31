import { PropsWithChildren } from 'react'
import styled, { keyframes } from 'styled-components'
import { palette } from '@/styles/theme'

const Wrapper = styled.svg`
  display: block;
  animation-name: ${keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `};
  animation-duration: 1s;
  animation-iteration-count: infinite;

  > path {
    stroke: ${palette.main.background.top};
  }
`

export default function Spinner(props: PropsWithChildren) {
  return (
    <Wrapper
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1"
        strokeWidth={1}
      />
    </Wrapper>
  )
}
