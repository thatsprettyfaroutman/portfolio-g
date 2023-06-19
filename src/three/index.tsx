'use client'

import {
  forwardRef,
  useEffect,
  useRef,
  useMemo,
  ForwardedRef,
  ReactNode,
} from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import { mergeRefs } from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'
import useMeasure from 'react-use-measure'
import Camera from './components/Camera'

type TThreeProps = {
  name?: string
  keepScrollPerspective?: boolean
  offsetX?: number
  offsetY?: number
  onResize?: (width: number, height: number) => {}
  children?: ReactNode
}

const StyledThree = styled.div`
  width: 100%;
  height: 100%;
`

function Three(
  {
    name,
    children,
    keepScrollPerspective,
    offsetX = 0,
    offsetY = 0,
    onResize,
    ...restProps
  }: TThreeProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const [ref, inView] = useInView()
  const [measureRef, bounds] = useMeasure()

  // No need to trigger when onResize function changes
  // Also, this way no need to useCallback onResize
  const onResizeRef = useRef(onResize)
  onResizeRef.current = onResize
  useEffect(() => {
    if (typeof onResizeRef.current === 'function') {
      onResizeRef.current(bounds.width, bounds.height)
    }
  }, [bounds.width, bounds.height])

  const scrollCompensatedBounds = useMemo(
    () => ({
      x: bounds.x,
      // Non-scroll y
      y: window.scrollY + bounds.y,
      width: bounds.width,
      height: bounds.height,
    }),
    [bounds.width, bounds.height, bounds.x, bounds.y]
  )

  return (
    <StyledThree
      className="three"
      ref={mergeRefs([ref, forwardedRef, measureRef])}
      {...restProps}
    >
      <Canvas frameloop={inView ? 'always' : 'never'} linear flat>
        <Camera
          // TODO: constate instead of prop-drilling
          bounds={scrollCompensatedBounds}
          offsetX={offsetX}
          offsetY={offsetY}
          keepScrollPerspective={keepScrollPerspective}
        />
        {children}
      </Canvas>
    </StyledThree>
  )
}

export default forwardRef<HTMLDivElement, TThreeProps>(Three)
