'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useSpring, useInView } from 'react-spring'
import { mergeRefs } from 'react-merge-refs'
import lerp from 'lerp'
import useProfilePictureDelta from './useProfilePictureDelta'

const EXPANDED_CONTENT_SAFE_TOP_MARGIN = 20

export default function useAuthor() {
  const [open, setOpen] = useState(false)
  const [inViewRef, isInView] = useInView({
    // This is used for auto collapsing the popup when there is less than 10% of the popup visible
    amount: 0.1,
  })
  const expandedContentRef = useRef<HTMLDivElement>(null)
  const profilePictureDelta = useProfilePictureDelta()
  const scrollRef = useRef(null as { from: number; to: number } | null)

  // Springs
  // ------------------------------------------------------

  const { open: x } = useSpring({
    open: open ? 1 : 0,
  })

  // Separate spring for y axis because we want to add a whimsically wobbly effect to it
  const { open: y } = useSpring({
    config: { friction: 15 },
    open: open ? 1 : 0,
    onChange: ({ value: { open } }) => {
      // Scroll with y if needed
      if (!scrollRef.current) {
        return
      }
      const { from, to } = scrollRef.current
      window.scrollTo(window.scrollX, lerp(from, to, open))
    },
  })

  // Events and effects
  // ------------------------------------------------------

  // Handle interaction
  const handleToggle = useCallback(() => {
    setOpen((open) => {
      const next = !open

      // Scroll the view if the (to be) expanded content is out of view
      if (next) {
        const profilePictureYMin =
          expandedContentRef.current!.getBoundingClientRect().y -
          EXPANDED_CONTENT_SAFE_TOP_MARGIN
        if (profilePictureYMin < 0) {
          scrollRef.current = {
            from: window.scrollY,
            to: window.scrollY + profilePictureYMin,
          }
        }
      } else {
        scrollRef.current = null
      }

      return next
    })
  }, [])

  // Collapse automatically if there is less than 10% of the popup visible
  useEffect(() => {
    if (!isInView && open) {
      handleToggle()
    }
  }, [isInView, open, handleToggle])

  // Styles
  // ------------------------------------------------------

  const collapsedContentStyle = {
    opacity: x.to((p) => 1 - p),
    pointerEvents: x.to((p) => (p > 0.5 ? 'none' : undefined)),
  }

  // ExpandedContent is visible when `open` is true
  const expandedContentStyle = {
    opacity: x,
    pointerEvents: x.to((p) => (p < 0.5 ? 'none' : undefined)),
  }

  // Profile picture flies from closed to open in fluid motion
  const profilePictureStyle = {
    x: x.to(profilePictureDelta.getX),
    y: y.to(profilePictureDelta.getY),
    scale: x.to(profilePictureDelta.getScale),
  }

  return {
    open,
    handleToggle,
    style: {
      collapsedContent: collapsedContentStyle,
      expandedContent: expandedContentStyle,
      profilePicture: profilePictureStyle,
    },
    expandedContentRef: mergeRefs([expandedContentRef, inViewRef]),
    profilePictureDelta,
  }
}
