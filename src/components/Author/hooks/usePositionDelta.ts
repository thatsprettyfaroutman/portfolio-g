import { useEffect, useCallback, useRef, useState } from 'react'
import { mergeRefs } from 'react-merge-refs'
import useMeasure from 'react-use-measure'

const MEASURE_OPTIONS = { debounce: 120 }

export default function usePositionDelta() {
  const ref = useRef<HTMLDivElement>(null)
  const [fromRef, fromBounds] = useMeasure(MEASURE_OPTIONS)
  const [toRef, toBounds] = useMeasure(MEASURE_OPTIONS)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (!ref.current) {
      return
    }
    setOffset({ x: ref.current.offsetLeft, y: ref.current.offsetTop })
  }, [fromBounds.x, fromBounds.y])

  const getX = useCallback(
    (a: number) => (toBounds.x - fromBounds.x) * a,
    [toBounds.x, fromBounds.x]
  )

  const getY = useCallback(
    (a: number) => (toBounds.y - fromBounds.y) * a,
    [toBounds.y, fromBounds.y]
  )

  const getScale = useCallback(
    (a: number) => (toBounds.width / fromBounds.width - 1) * a + 1,
    [toBounds.width, fromBounds.width]
  )

  return {
    fromRef: mergeRefs([fromRef, ref]),
    toRef,
    getX,
    getY,
    getScale,
    offset,
  }
}
