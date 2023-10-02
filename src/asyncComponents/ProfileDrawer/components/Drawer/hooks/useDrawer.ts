import { useState, useRef } from 'react'
import lerp from 'lerp'
import { useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'

export default function useDrawer() {
  const [contentRef, contentBounds] = useMeasure()
  const [open, setOpen] = useState(false)
  const { p: openSpring } = useSpring({
    p: open ? 1 : 0,
  })

  const [opening, setOpening] = useState(false)
  const { p: flierSpring } = useSpring({
    p: open ? 1 : 0,
    config: { friction: 20 },
    onStart: () => setOpening(true),
    onRest: () => setOpening(false),
  })

  const flierFromRef = useRef<HTMLImageElement>(null)
  const flierToRef = useRef<HTMLImageElement>(null)
  const flightPath = useRef({
    from: {
      position: { x: 0, y: 0 },
      scale: 1,
    },
    to: {
      position: { x: 0, y: 0 },
      scale: 1,
    },
  })

  const updateFlightPath = () => {
    if (!flierFromRef.current || !flierToRef.current) {
      return
    }
    const fromBounds = flierFromRef.current.getBoundingClientRect()
    const toBounds = flierToRef.current.getBoundingClientRect()
    const { from, to } = flightPath.current

    from.position.x = fromBounds.left - fromBounds.width * 0.5
    from.position.y = fromBounds.top - fromBounds.height * 0.5
    from.scale = fromBounds.width / toBounds.width

    to.position.x =
      toBounds.left + lerp(-contentBounds.width, 0, openSpring.get())
    to.position.y = toBounds.top
    to.scale = 1
  }

  const flierStyle = {
    opacity: opening ? 1 : 0,
    transform: flierSpring.to((p) => {
      const { from, to } = flightPath.current
      const x = lerp(from.position.x, to.position.x, p)
      const y = lerp(from.position.y, to.position.y, p)
      const scale = lerp(from.scale, to.scale, p)
      return `
        translate3d(${x}px, ${y}px, 0)
        scale3d(${scale}, ${scale}, 1)
      `
    }),
  }

  if (flierFromRef.current) {
    flierFromRef.current.style.opacity = opening
      ? '0'
      : flierSpring.get() < 0.5
      ? ''
      : '0'
  }
  if (flierToRef.current) {
    flierToRef.current.style.opacity = opening
      ? '0'
      : flierSpring.get() > 0.5
      ? ''
      : '0'
  }

  const toggle = (override?: boolean) => {
    updateFlightPath()
    setOpen(typeof override === 'boolean' ? override : (s) => !s)
  }

  return {
    open,
    openSpring,
    contentRef,
    flierFromRef,
    flierToRef,
    flierStyle,
    toggle,
  }
}
