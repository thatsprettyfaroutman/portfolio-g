import styled, { keyframes } from 'styled-components'
import { palette } from '@/styles/theme'

type TSpinnerProps = {}

const Wrapper = styled.div`
  > svg {
    display: block;
    width: 100%;
    height: 100%;
    animation-name: ${keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `};
    animation-duration: 1s;
    animation-iteration-count: infinite;

    > path {
      stroke: ${palette.shade.text};
    }
  }
`

export default function Spinner(props: TSpinnerProps) {
  return (
    <Wrapper {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1"
          strokeWidth={2}
        />
      </svg>
    </Wrapper>
  )
}
