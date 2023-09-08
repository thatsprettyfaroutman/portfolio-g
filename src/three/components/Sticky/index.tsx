import { type PropsWithChildren, useCallback, useMemo, useEffect } from 'react'
import { easings } from '@react-spring/three'
import { extend, useThree, useFrame } from '@react-three/fiber'
import lerp from 'lerp'
import clamp from 'ramda/src/clamp'
import { Group } from 'three'
import { useThreeContext } from '@/three/context'

extend({ Group })

type TStickyProps = PropsWithChildren<{
  topMargin?: number
  bottomMargin?: number
  height?: number
  stickySmoothness?: number
}>

/**
 * This component sticks content in the middle of the view when scrolling
 */
export default function Sticky({
  topMargin = 0,
  bottomMargin = 0,
  height = 0,
  stickySmoothness = 0.5,
  ...restProps
}: TStickyProps) {
  const { camera } = useThree()
  const { scrollCompensatedBounds: bounds, windowSize } = useThreeContext()
  const stickyEnabled =
    bounds.height - topMargin - bottomMargin > height &&
    windowSize.height > height

  const offsetCameraView = useCallback(
    (y = 0) => {
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

  const getStickyPosition = useMemo(() => {
    // Handle sticking of content in the middle of the view while scrolling using easing methods to ease the content into the sticky position.

    // Compute as much as possible outside of the render loop
    const boundsHeightDelta = bounds.height - height
    const windowHeightDelta = windowSize.height - height
    const viewRange = windowHeightDelta * 0.5
    const boundsRange = boundsHeightDelta * 0.5
    const scrollStartOffset = -windowHeightDelta + topMargin
    const scrollEndOffset = boundsHeightDelta - bottomMargin
    const stickMiddleOffset = (bounds.height - windowSize.height) * 0.5

    const clampSmoothStickyAlpha = clamp(0, 1)
    const clampBounds = clamp(
      -boundsRange + topMargin,
      boundsRange - bottomMargin
    )

    return (deltaScroll: number) => {
      const deltaScrollStart = deltaScroll + scrollStartOffset
      const deltaScrollEnd = deltaScroll + scrollEndOffset

      // Sticky y positions for content while scrolling
      // We are going to be alternating between these while scrolling
      const stickMiddle = deltaScroll + stickMiddleOffset
      const stickEdge = stickMiddle - viewRange

      // Start smooth scroll when content bottom is visible
      const smoothStickyStartAlpha = clampSmoothStickyAlpha(
        stickySmoothness * (deltaScrollStart / -viewRange)
      )
      // End smooth scroll to content top hitting the top of the view
      const smoothStickyEndAlpha = clampSmoothStickyAlpha(
        1 - stickySmoothness * (deltaScrollEnd / viewRange)
      )

      // Apply easing functions
      const easedStickyAlphaStart = easings.easeOutSine(smoothStickyStartAlpha)
      const easedStickyAlphaEnd = easings.easeInSine(smoothStickyEndAlpha)

      // This is used to change the sticky position of the content while scrolling. It is a value between 0 and 2.
      // 0 - stick to bottom edge
      // 1 - stick to middle
      // 2 - stick to top edge
      const stickyAlpha = easedStickyAlphaStart + easedStickyAlphaEnd

      // Lerp between different sticky positions using the stickyAlpha value
      const smoothStickyPosition = lerp(stickEdge, stickMiddle, stickyAlpha)

      // Clamp to bounds and return
      return clampBounds(smoothStickyPosition)
    }
  }, [
    bottomMargin,
    bounds.height,
    height,
    stickySmoothness,
    topMargin,
    windowSize.height,
  ])

  useFrame(() => {
    if (!stickyEnabled) {
      return
    }

    const deltaScroll = bounds.y - window.scrollY
    offsetCameraView(getStickyPosition(deltaScroll))
  })

  useEffect(() => {
    if (stickyEnabled) {
      return
    }

    // Reset camera offset when sticky is disabled
    offsetCameraView(0)
  }, [stickyEnabled, offsetCameraView])

  return <group {...restProps} />
}
