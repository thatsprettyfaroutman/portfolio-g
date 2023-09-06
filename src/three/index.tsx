'use client'

// TODO: clean up file
// TODO: move ThreeCanvas to own file
import {
  useMemo,
  ReactNode,
  CSSProperties,
  PropsWithChildren,
  useRef,
  useState,
} from 'react'
import { useSpring } from '@react-spring/three'
import { Edges, MeshDiscardMaterial } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import pick from 'ramda/src/pick'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from 'react-merge-refs'
import useMeasure from 'react-use-measure'
import styled from 'styled-components'
import { Group } from 'three'
import useWindowSize from '@/hooks/useWindowSize'
import Camera from '@/three/components/Camera'
import ViewSizeHelper from '@/three/components/ViewSizeHelper'
import {
  type TUseThreeContextProps,
  ThreeContextProvider,
  useThreeContext,
} from '@/three/context'

extend({ Group })

const CONTEXT_PROP_KEYS = [
  'debug',
  'keepScrollPerspective',
  'offsetX',
  'offsetY',
  'keepDefaultCamera',
  'dpr',
] as const

type TThreeProps = {
  children?: ReactNode
  style?: CSSProperties
  className?: string
  inViewThreshold?: number
} & Pick<TUseThreeContextProps, (typeof CONTEXT_PROP_KEYS)[number]>

type TThreeCanvasProps = PropsWithChildren

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;
  touch-action: pan-y;
`

function ThreeCanvas({ children, ...restProps }: TThreeCanvasProps) {
  const { renderEnabled, dpr, debug, keepDefaultCamera } = useThreeContext()

  return (
    <Canvas
      frameloop={renderEnabled ? 'always' : 'never'}
      linear
      flat
      dpr={dpr}
      {...restProps}
    >
      {!keepDefaultCamera && <Camera />}
      {children}
      {debug && (
        <>
          <mesh scale={100} rotation={[0, Math.PI * 0.25, 0]}>
            <boxGeometry />
            <MeshDiscardMaterial />
            <Edges color="#0ff" />
          </mesh>
          <ViewSizeHelper />
        </>
      )}
    </Canvas>
  )
}

export default function Three({
  className,
  children,
  inViewThreshold = 0.1,
  ...restProps
}: TThreeProps) {
  const [renderRef, renderEnabled] = useInView()
  const [inViewRef, inView] = useInView({
    threshold: inViewThreshold,
    rootMargin: '100% 0px 0px 0px',
  })
  const windowSize = useWindowSize()
  const [mousePresent, setMousePresent] = useState(false)

  // Handle bounds
  const [measureRef, bounds] = useMeasure({ scroll: inView })
  const lastBoundsRef = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  /**
   * @deprecated This is a hack to compensate for scroll position which shouldn't be needed anymore
   */
  const scrollCompensatedBounds = useMemo(() => {
    if (!inView) {
      return lastBoundsRef.current
    }
    lastBoundsRef.current = {
      x: bounds.x,
      // Non-scroll y
      y: (typeof window !== 'undefined' ? window.scrollY : 0) + bounds.y,
      width: bounds.width,
      height: bounds.height,
    }
    return lastBoundsRef.current
  }, [bounds.width, bounds.height, bounds.x, bounds.y, inView])

  const { inViewSpring } = useSpring({
    inViewSpring: inView ? 1 : 0,
  })

  const contextProps = {
    ...pick(CONTEXT_PROP_KEYS, restProps),
    renderEnabled,
    inView,
    inViewSpring,
    scrollCompensatedBounds,
    windowSize,
    mousePresent,
  }

  return (
    <Wrapper
      onPointerEnter={() => setMousePresent(true)}
      onPointerLeave={() => setMousePresent(false)}
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
