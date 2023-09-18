'use client'

import { PropsWithChildren } from 'react'
import range from 'ramda/src/range'
import useMeasure from 'react-use-measure'
import styled, { css, keyframes } from 'styled-components'

type TMarqueeProps = PropsWithChildren

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const Slider = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;

  ${(p) =>
    p.$active &&
    css`
      animation-name: ${keyframes`
    0% { transform: translate3d(0%, 0, 0)}
    100% { transform: translate3d(-100%, 0, 0)}
  `};
      animation-timing-function: linear;
      animation-duration: 20s;
      animation-iteration-count: infinite;
    `};
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

export default function Marquee({ children, ...restProps }: TMarqueeProps) {
  const [wrapperRef, wrapperBounds] = useMeasure()
  const [contentRef, contentBounds] = useMeasure()
  const numContentsFit = contentBounds.width
    ? Math.ceil(wrapperBounds.width / contentBounds.width) + 1
    : 4

  const ready = !!contentBounds.width

  return (
    <Wrapper
      {...restProps}
      ref={wrapperRef}
      style={{ height: contentBounds.height }}
    >
      <Slider
        $active={ready}
        style={{
          width: contentBounds.width,
          height: contentBounds.height,
        }}
      >
        {range(0, numContentsFit).map((i) => (
          <Content
            ref={i === 0 ? contentRef : null}
            key={i}
            style={{
              transform: `translate(${i * 100}%, -50%)`,
            }}
          >
            {children}
          </Content>
        ))}
      </Slider>
    </Wrapper>
  )
}
