'use client'

import { PropsWithChildren } from 'react'
import range from 'ramda/src/range'
import useMeasure from 'react-use-measure'
import styled, { keyframes } from 'styled-components'

type TMarqueeProps = PropsWithChildren

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const Slider = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  animation-name: ${keyframes`
    0% { transform: translate3d(0%, -50%, 0)}
    100% { transform: translate3d(-100%, -50%, 0)}
  `};
  animation-timing-function: linear;
  animation-duration: 20s;
  animation-iteration-count: infinite;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

export default function Marquee({ children, ...restProps }: TMarqueeProps) {
  const [wrapperRef, wrapperBounds] = useMeasure()
  const [contentRef, contentBounds] = useMeasure()
  const numContentsFit = Math.ceil(wrapperBounds.width / contentBounds.width)

  return (
    <Wrapper
      {...restProps}
      ref={wrapperRef}
      style={{ height: contentBounds.height }}
    >
      <Slider
        style={{
          width: contentBounds.width,
          height: contentBounds.height,
        }}
      >
        <Content ref={contentRef}>{children}</Content>
        {range(0, numContentsFit).map((i) => (
          <Content
            key={i}
            style={{
              left: contentBounds.width * (i + 1),
            }}
          >
            {children}
          </Content>
        ))}
      </Slider>
    </Wrapper>
  )
}
