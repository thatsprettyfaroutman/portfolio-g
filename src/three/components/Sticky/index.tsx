import {
  type PropsWithChildren,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { Box3, Group, Vector3 } from 'three'
import { extend, useThree, useFrame } from '@react-three/fiber'
import clamp from 'ramda/src/clamp'
import { easings } from '@react-spring/three'
import { useThreeContext } from '@/three/context'
import lerp from 'lerp'

// TODO: dont stick when content is taller than viewport height

extend({ Group })

type TStickyProps = PropsWithChildren<{
  topMargin?: number
  bottomMargin?: number
  height?: number
}>

const clampZeroOne = clamp(0, 1)

/**
 * This component sticks content in the middle of the view when scrolling
 */
export default function Sticky({
  topMargin = 0,
  bottomMargin = 0,
  height = 0,
  ...restProps
}: TStickyProps) {
  const ref = useRef<Group>(null)
  const { camera } = useThree()
  const { scrollCompensatedBounds: bounds } = useThreeContext()

  // const [contentBounds, setContentBounds] = useState(
  //   null as null | { width: number; height: number; depth: number }
  // )

  // useEffect(() => {
  //   if (!ref.current) {
  //     return
  //   }
  //   const box = new Box3().setFromObject(ref.current)
  //   const size = box.getSize(new Vector3())
  //   setContentBounds({ width: size.x, height: size.y, depth: size.z })
  // }, [bounds.width, bounds.height])

  const lastYRef = useRef(0)
  const offsetCameraView = useCallback(
    (y = 0) => {
      if (lastYRef.current === y) {
        return
      }
      lastYRef.current = y
      camera.setViewOffset(
        bounds.width,
        bounds.height,
        0,
        y,
        bounds.width,
        bounds.height
      )
    },
    [camera, bounds.width, bounds.height]
  )

  useFrame(() => {
    // Handle sticking of content in the middle of the view while scrolling using easing methods to ease the content into the sticky position.

    // TODO: smoothSpeed could be prop
    const smoothSpeed = 0.5
    const viewRange = (window.innerHeight - height) * 0.5
    const boundsRange = (bounds.height - height) * 0.5

    // TODO: if viewRange < 0 dont stick since card taller than view
    // TODO: fix mobile crash

    if (viewRange < 0) {
      offsetCameraView(0)
      return
    }

    const deltaScroll = bounds.y - window.scrollY

    // Start smooth scroll when content bottom is visible
    const deltaScrollStart =
      deltaScroll - (window.innerHeight - height) + topMargin

    // End smooth scroll to content top hitting the top of the view
    const deltaScrollEnd = deltaScroll + bounds.height - height - bottomMargin

    // Sticky y positions for content while scrolling
    // We are going to be alternating between these while scrolling based on how far user has scrolled
    const stickMiddle = deltaScroll + (bounds.height - window.innerHeight) * 0.5
    const stickTop = stickMiddle + viewRange
    const stickBottom = stickMiddle - viewRange

    // Percentage value for smooth stickiness at start
    // Moves from 0 to 1 when starting from top
    const smoothStickyStart = clampZeroOne(
      smoothSpeed * (deltaScrollStart / -viewRange)
    )

    // Percentage value for smooth stickiness at end
    // Moves from 1 to 0 when end is reached
    const smoothStickyEnd = clampZeroOne(
      smoothSpeed * (deltaScrollEnd / viewRange)
    )

    // Ease
    const easeStart = easings.easeOutSine(smoothStickyStart)
    const easeEnd = easings.easeOutSine(smoothStickyEnd)

    // Lerp between different sticky positions based on scroll
    const easedStickyY = lerp(
      stickTop,
      lerp(stickBottom, stickMiddle, easeStart),
      easeEnd
    )

    // Handle bounds
    const clampedStickyY = clamp(
      -boundsRange + topMargin,
      boundsRange - bottomMargin,
      easedStickyY
    )

    offsetCameraView(clampedStickyY)
  })

  return <group ref={ref} {...restProps} />
}
