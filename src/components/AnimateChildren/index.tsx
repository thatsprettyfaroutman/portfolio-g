'use client'

import {
  type PropsWithChildren,
  type MutableRefObject,
  useRef,
  useEffect,
  useState,
} from 'react'
import { useTransition } from 'react-spring'
import styled from 'styled-components'

type TAnimateChildrenProps = PropsWithChildren<{
  showing?: boolean
  reverseAnimationOrder?: boolean
  delay?: number
  trailDelay?: number
  childQuerySelector?: string
  childStyleInterpolator?: typeof defaultChildStyleInterpolator
}>

const Wrapper = styled.div<{
  $childQuerySelector: string
  $childStyleInterpolatorRef: MutableRefObject<
    typeof defaultChildStyleInterpolator
  >
}>`
  // Try to mimic the wrapping component
  display: inherit;
  flex-direction: inherit;
  gap: inherit;
  grid-row-gap: inherit;
  grid-column-gap: inherit;
  grid-gap: inherit;

  // Get initial styles for children
  ${(p) => p.$childQuerySelector} {
    ${(p) => p.$childStyleInterpolatorRef.current(0)};
  }
`

const defaultChildStyleInterpolator = (p: number): Record<string, string> => ({
  opacity: p.toString(),
  transform: `perspective(1000px) translate3d(${[
    0,
    `calc(var(--space) / 8 * ${1 - p})`,
    `calc(var(--space) * -2 * ${1 - p})`,
  ].join(',')})`,
})

/**
 * This component animates the children with a trailing spring.
 */

export default function AnimateChildren({
  showing = true,
  reverseAnimationOrder = false,
  delay,
  trailDelay = 200,
  childQuerySelector = 'h1, h2, h3, h4, h5, h6, p, li, .animate',
  childStyleInterpolator = defaultChildStyleInterpolator,
  ...restProps
}: TAnimateChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [styleKeys, setStyleKeys] = useState([] as string[])
  const [childElements, setChildElements] = useState([] as HTMLElement[])

  // Store the childStyleInterpolator in a ref so that it doesn't cause re-renders
  const childStyleInterpolatorRef = useRef(childStyleInterpolator)
  childStyleInterpolatorRef.current = childStyleInterpolator

  useEffect(() => {
    if (!ref.current) {
      return
    }

    // Store style keys for later use in the onChange callback
    setStyleKeys(Object.keys(childStyleInterpolatorRef.current(0)))

    // Get the child dom elements to be animated and reverse them if needed
    const childElements = Array.from(
      ref.current.querySelectorAll(childQuerySelector)
    ) as HTMLElement[]
    if (reverseAnimationOrder) {
      childElements.reverse()
    }

    setChildElements(childElements)
  }, [childQuerySelector, reverseAnimationOrder, restProps.children])

  // Handle child element transitions
  useTransition<HTMLElement, {}>(showing ? childElements : [], {
    from: { p: 0 },
    enter: { p: 1 },
    leave: { p: 0 },
    delay,
    trail: trailDelay / (childElements.length - 1),
    onChange: ({ value }, _, child) => {
      if (!child || !child.isConnected) {
        return
      }
      const p = value.p as number
      const style = childStyleInterpolatorRef.current(p)
      for (const key of styleKeys) {
        child.style.setProperty(key, style[key] as string)
      }
    },
  })

  return (
    <Wrapper
      ref={ref}
      {...restProps}
      $childStyleInterpolatorRef={childStyleInterpolatorRef}
      $childQuerySelector={childQuerySelector}
    />
  )
}
