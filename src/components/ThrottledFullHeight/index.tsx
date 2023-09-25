'use client'

import {
  type PropsWithChildren,
  type CSSProperties,
  useRef,
  forwardRef,
} from 'react'
import styled from 'styled-components'
import useWindowSize from '@/hooks/useWindowSize'

type TThrottledFullHeightProps = PropsWithChildren<{
  threshold?: number
  style?: CSSProperties
  tag?: string
}>

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`

/**
 * This component takes full height of the viewport by default and only updates it when the viewport height change is more than the `threshold`. Helpful on some phone browsers where viewport height changes when user scrolls and the browsers address bar is hidden.
 */
const ThrottledFullHeight = forwardRef<
  HTMLDivElement,
  TThrottledFullHeightProps
>(({ threshold = 320, tag, ...restProps }, ref) => {
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
      ref={ref}
      // @ts-ignore
      as={tag}
      style={{ height: lastHeightRef.current || undefined, ...restProps.style }}
    />
  )
})

ThrottledFullHeight.displayName = 'ThrottledFullHeight'

export default ThrottledFullHeight
