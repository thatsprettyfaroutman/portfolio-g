'use client'

// TODO: clean up file
// TODO: move ThreeCanvas to own file

import {
  useEffect,
  useRef,
  useMemo,
  ReactNode,
  CSSProperties,
  PropsWithChildren,
} from 'react'
import { Group } from 'three'
import { Canvas, extend } from '@react-three/fiber'
import styled from 'styled-components'
import pick from 'ramda/src/pick'
import { mergeRefs } from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'
import useMeasure from 'react-use-measure'
import {
  type TUseThreeContextProps,
  ThreeContextProvider,
  useThreeContext,
} from './context'
import Camera from './components/Camera'

// TODO: remove debug stuff
// import { Edges, MeshDiscardMaterial } from '@react-three/drei'
// import ViewSizeDebug from './components/ViewSizeDebug'
import { useSpringValue } from 'react-spring'

// Uncomment to print loading images (part 1/2)
// import { WebGLRenderer } from 'three'
// import { printImage } from './lib'

extend({ Group })

const CONTEXT_PROP_KEYS = [
  'keepScrollPerspective',
  'offsetX',
  'offsetY',
  'dpr',
] as const

type TThreeProps = {
  onResize?: (width: number, height: number) => {}
  children?: ReactNode
  style?: CSSProperties
  className?: string
} & Pick<TUseThreeContextProps, (typeof CONTEXT_PROP_KEYS)[number]>

type TThreeCanvasProps = PropsWithChildren<>

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  > * {
    border-radius: inherit;
  }
`

function ThreeCanvas({ children, ...restProps }: TThreeCanvasProps) {
  const { renderEnabled, dpr } = useThreeContext()

  return (
    <Canvas
      frameloop={renderEnabled ? 'always' : 'never'}
      linear
      flat
      dpr={dpr}
      // Uncomment to print loading images (part 2/2)
      // gl={(canvas) => {
      //   printImage()
      //   return new WebGLRenderer({ canvas, preserveDrawingBuffer: true })
      // }}
      {...restProps}
    >
      <Camera />
      {children}

      {/* TODO: remove debug stuff */}
      {/* <mesh scale={100} rotation={[0, Math.PI * 0.25, 0]}>
          <boxGeometry />
          <MeshDiscardMaterial />
          <Edges color="#0ff" />
        </mesh>
        */}
      {/* <ViewSizeDebug /> */}
    </Canvas>
  )
}

export default function Three({
  className,
  children,
  onResize,
  ...restProps
}: TThreeProps) {
  const [measureRef, bounds] = useMeasure()
  const [renderRef, renderEnabled] = useInView()
  const [inViewRef, inView] = useInView({
    threshold: 1,
    rootMargin: '320px 0px',
  })
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
      y: (typeof window !== 'undefined' ? window.scrollY : 0) + bounds.y,
      width: bounds.width,
      height: bounds.height,
    }),
    [bounds.width, bounds.height, bounds.x, bounds.y]
  )

  const inViewSpring = useSpringValue(0)
  useEffect(() => {
    inViewSpring.start(inView ? 1 : 0)
  }, [inView, inViewSpring])

  const contextProps = {
    ...pick(CONTEXT_PROP_KEYS, restProps),
    renderEnabled,
    inView,
    inViewSpring,
    scrollCompensatedBounds,
  }

  return (
    <Wrapper
      className={`three ${className || ''}`}
      ref={mergeRefs([renderRef, inViewRef, measureRef])}
      {...restProps}
    >
      <ThreeContextProvider {...contextProps}>
        <ThreeCanvas>{children}</ThreeCanvas>
      </ThreeContextProvider>
    </Wrapper>
  )
}
