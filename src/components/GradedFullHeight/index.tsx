'use client'

import { type PropsWithChildren, type CSSProperties, useRef } from 'react'
import styled from 'styled-components'
import useWindowSize from '@/hooks/useWindowSize'

type TGradedFullHeightProps = PropsWithChildren<{
  threshold?: number
  style?: CSSProperties
  tag?: string
}>

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`

export default function GradedFullHeight({
  threshold = 320,
  tag,
  ...restProps
}: TGradedFullHeightProps) {
  const { height } = useWindowSize()

  const lastHeightRef = useRef(0)

  if (!lastHeightRef.current) {
    lastHeightRef.current = height
  }

  const heightDiff = Math.abs(height - lastHeightRef.current)

  if (heightDiff > threshold) {
    lastHeightRef.current = height
  }

  return (
    <Wrapper
      {...restProps}
      // @ts-ignore
      as={tag}
      style={{ height: lastHeightRef.current || undefined, ...restProps.style }}
    />
  )
}
