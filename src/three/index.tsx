'use client'

import { ReactNode, CSSProperties, useState } from 'react'
import { useSpring } from '@react-spring/three'
import { extend } from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from 'react-merge-refs'
import styled from 'styled-components'
import { Group } from 'three'
import useWindowSize from '@/hooks/useWindowSize'
import CustomCanvas from '@/three/components/CustomCanvas'
import {
  ThreeContextProvider,
  type TPassToThreeContextProps,
} from '@/three/context'

extend({ Group })

type TThreeProps = TPassToThreeContextProps & {
  children?: ReactNode
  style?: CSSProperties
  className?: string
  inViewThreshold?: number
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;
  touch-action: pan-y;
`

/**
 * This is a wrapper component for the @react-three/fiber canvas.
 */
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
    ...restProps,
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
        <CustomCanvas>{children}</CustomCanvas>
      </ThreeContextProvider>
    </Wrapper>
  )
}
