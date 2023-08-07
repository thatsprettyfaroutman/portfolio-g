import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { a, useSpring } from 'react-spring'
import { palette, usePalette } from '@/styles/theme'

export const Wrapper = styled.div`
  position: absolute;
  /* top: calc(var(--maxCol) / 8); */
  /* left: calc(var(--maxCol) / 8); */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  > svg {
    display: block;
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

export default function FancyBorder({
  borderWidth = 2,
  borderRadius = 12,
  ...restProps
}) {
  const [ref, bounds] = useMeasure()
  const w = bounds.width
  const h = bounds.height
  const hbw = borderWidth * 0.5
  const br = borderRadius
  const d = `
    M${w - hbw},${hbw}
    L${w - hbw},${h - br - hbw}
    A${br} ${br} 0 0 1 ${w - br - hbw},${h - hbw}
    L${hbw},${h - hbw}
  `

  const { p } = useSpring({
    from: { p: 0 },
    p: bounds.width ? 1 : 0,
    delay: 300,
  })

  return (
    <Wrapper ref={ref} {...restProps}>
      <a.svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: p.to((p) => {
            const pos = `calc(var(--maxCol) / 8 * ${1 - p})`
            return `translate3d(${pos}, ${pos}, 0)`
          }),
          opacity: p,
        }}
      >
        <path
          d={d}
          strokeWidth={borderWidth}
          stroke="url(#paint0_linear_317_301)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_317_301"
            x1="0"
            y1={h}
            x2={w}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={usePalette(palette.accent[0])} />
            <stop offset="1" stopColor={usePalette(palette.accent[1])} />
          </linearGradient>
        </defs>
      </a.svg>
    </Wrapper>
  )
}
