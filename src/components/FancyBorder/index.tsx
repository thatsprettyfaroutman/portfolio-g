import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { a, useSpring } from 'react-spring'
import { palette, usePalette } from '@/styles/theme'

type TFancyBorderProps = {
  showing?: boolean
  delay?: number
  borderWidth?: number
  borderRadius?: number
}

export const Wrapper = styled.div`
  position: absolute;
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
  showing = true,
  delay = 100,
  borderWidth = 1,
  borderRadius = 12,
  ...restProps
}: TFancyBorderProps) {
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

  const show = bounds.width && showing

  const { p } = useSpring({
    from: { p: 0 },
    p: show ? 1 : 0,
    delay: show ? delay : 0,
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
          opacity: p,
        }}
      >
        <a.path
          style={{
            strokeDasharray: p.to((p) => {
              const l = w + h

              return `0 ${(1 - p) * l * 0.5} ${p * l} ${l}`
            }),
          }}
          d={d}
          strokeWidth={borderWidth}
          stroke="url(#FancyBorder__gradient)"
        />
        <defs>
          <linearGradient
            id="FancyBorder__gradient"
            x1="0"
            y1={h}
            x2={w}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={usePalette(palette.accents[0])} />
            <stop offset="1" stopColor={usePalette(palette.accents[1])} />
          </linearGradient>
        </defs>
      </a.svg>
    </Wrapper>
  )
}
