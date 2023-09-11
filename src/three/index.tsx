'use client'

import { ReactNode, CSSProperties, PropsWithChildren, useState } from 'react'
import { useSpring } from '@react-spring/three'
import { Edges, MeshDiscardMaterial } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import pick from 'ramda/src/pick'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from 'react-merge-refs'
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

// TODO: move ThreeCanvas to its own file

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

  const { inViewSpring } = useSpring({
    inViewSpring: inView ? 1 : 0,
  })

  const contextProps = {
    ...pick(CONTEXT_PROP_KEYS, restProps),
    renderEnabled,
    inView,
    inViewSpring,
    windowSize,
    mousePresent,
  }

  return (
    <Wrapper
      onPointerEnter={() => setMousePresent(true)}
      onPointerLeave={() => setMousePresent(false)}
      className={`three ${className || ''}`}
      ref={mergeRefs([renderRef, inViewRef])}
      {...restProps}
    >
      <ThreeContextProvider {...contextProps}>
        <ThreeCanvas>{children}</ThreeCanvas>
      </ThreeContextProvider>
    </Wrapper>
  )
}
