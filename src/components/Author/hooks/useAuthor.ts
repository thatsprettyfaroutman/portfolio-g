'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import lerp from 'lerp'
import { mergeRefs } from 'react-merge-refs'
import { useSpring, useInView } from 'react-spring'
import usePositionDelta from './usePositionDelta'

const EXPANDED_CONTENT_SCROLL_SAFETY_AREA = 20

export default function useAuthor() {
  const [isOpen, setOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [inViewRef, isInView] = useInView({
    // This is used for auto collapsing the popup when there is less than 10% of the popup visible
    amount: 0.1,
    rootMargin: `-50% 0px 0px 0px`,
  })
  const expandedContentRef = useRef<HTMLDivElement>(null)
  const profilePictureDelta = usePositionDelta()
  const scrollRef = useRef(null as { from: number; to: number } | null)

  // Springs
  // ------------------------------------------------------

  const { progress: progressX } = useSpring({
    progress: isOpen ? 1 : 0,
  })

  // Separate spring for y axis because we want to add a whimsically wobbly effect to it
  const { progress: progressY } = useSpring({
    config: { friction: 15 },
    progress: isOpen ? 1 : 0,
    onChange: ({ value: { progress } }) => {
      // Scroll with y if needed
      if (!scrollRef.current) {
        return
      }
      const { from, to } = scrollRef.current
      window.scrollTo(window.scrollX, lerp(from, to, progress))
    },
    onRest: () => {
      setIsOpening(false)
    },
  })

  // Events and effects
  // ------------------------------------------------------

  const updateScrollRef = useCallback((nextIsOpen: boolean) => {
    // Scroll the view if the expanded content is out of view
    if (nextIsOpen) {
      const expandedContentRect =
        expandedContentRef.current!.getBoundingClientRect()

      // If expanded content fits in view then scroll so expanded content is in the middle of the view
      if (
        expandedContentRect.height <
        window.innerHeight - EXPANDED_CONTENT_SCROLL_SAFETY_AREA * 2
      ) {
        scrollRef.current = {
          from: window.scrollY,
          to:
            window.scrollY +
            expandedContentRect.y -
            (window.innerHeight - expandedContentRect.height) / 2,
        }
        return
      }

      // Otherwise scroll so expanded content is at the top of the view
      const expandedContentMinScroll =
        expandedContentRect.y - EXPANDED_CONTENT_SCROLL_SAFETY_AREA
      if (expandedContentMinScroll < 0) {
        scrollRef.current = {
          from: window.scrollY,
          to: window.scrollY + expandedContentMinScroll,
        }
      }
      return
    }

    // Don't scroll if content isn't expanded
    scrollRef.current = null
  }, [])

  // Handle interaction
  const toggle = useCallback(() => {
    setOpen((previousIsOpen) => {
      const nextIsOpen = !previousIsOpen
      updateScrollRef(nextIsOpen)
      setIsOpening(nextIsOpen)
      return nextIsOpen
    })
  }, [updateScrollRef])

  // Collapse automatically if there's less than 10% of the popup visible
  useEffect(() => {
    if (!isInView && isOpen && !isOpening) {
      toggle()
    }
  }, [isInView, isOpen, isOpening, toggle])

  // Styles
  // ------------------------------------------------------

  const shadeStyle = {
    opacity: progressX,
    pointerEvents: progressX.to((p) => (p < 0.5 ? 'none' : undefined)),
  }

  const collapsedContentStyle = {
    opacity: progressX.to((p) => 1 - p),
    pointerEvents: progressX.to((p) => (p > 0.5 ? 'none' : undefined)),
  }

  // ExpandedContent is visible when `open` is true
  const expandedContentStyle = {
    opacity: progressX,
    pointerEvents: progressX.to((p) => (p < 0.5 ? 'none' : undefined)),
    y: (expandedContentRef.current?.getBoundingClientRect().height || 0) * 0.5,
  }

  // Profile picture flies from closed to open in fluid motion
  const profilePictureStyle = {
    x: progressX.to(profilePictureDelta.getX),
    y: progressY.to(profilePictureDelta.getY),
    scale: progressX.to(profilePictureDelta.getScale),
    offset: profilePictureDelta.offset,
  }

  return {
    isOpen,
    toggle,
    style: {
      shade: shadeStyle,
      collapsedContent: collapsedContentStyle,
      expandedContent: expandedContentStyle,
      profilePicture: profilePictureStyle,
    },
    expandedContentRef: mergeRefs([expandedContentRef, inViewRef]),
    profilePictureDelta,
  }
}
