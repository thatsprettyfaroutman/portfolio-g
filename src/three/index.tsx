'use client'

import { useEffect, useRef, useMemo, ReactNode, CSSProperties } from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import { mergeRefs } from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'
import useMeasure from 'react-use-measure'

// TODO: remove debug stuff
// import { Edges, MeshDiscardMaterial } from '@react-three/drei'
// import ViewSizeDebug from './components/ViewSizeDebug'

import Camera from './components/Camera'

// Uncomment to print loading images (part 1/2)
// import { WebGLRenderer } from 'three'
// import { printImage } from './lib'

type TThreeProps = {
  name?: string
  keepScrollPerspective?: boolean
  offsetX?: number
  offsetY?: number
  onResize?: (width: number, height: number) => {}
  children?: ReactNode
  style?: CSSProperties
  dpr?: number
}

const StyledThree = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  > * {
    border-radius: inherit;
  }
`

export default function Three({
  name,
  children,
  keepScrollPerspective,
  offsetX = 0,
  offsetY = 0,
  onResize,
  dpr,
  ...restProps
}: TThreeProps) {
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
      ref={mergeRefs([
        ref,
        // forwardedRef,
        measureRef,
      ])}
      {...restProps}
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        linear
        flat
        dpr={dpr}
        // Uncomment to print loading images (part 2/2)
        // gl={(canvas) => {
        //   printImage()
        //   return new WebGLRenderer({ canvas, preserveDrawingBuffer: true })
        // }}
      >
        <Camera
          // TODO: constate instead of prop-drilling
          bounds={scrollCompensatedBounds}
          offsetX={offsetX}
          offsetY={offsetY}
          keepScrollPerspective={keepScrollPerspective}
        />
        {children}

        {/* TODO: remove debug stuff */}
        {/* <mesh scale={100} rotation={[0, Math.PI * 0.25, 0]}>
          <boxGeometry />
          <MeshDiscardMaterial />
          <Edges color="#0ff" />
        </mesh>
        <ViewSizeDebug /> */}
      </Canvas>
    </StyledThree>
  )
}
