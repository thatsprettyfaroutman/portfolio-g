import { useCallback } from 'react'
import useMeasure from 'react-use-measure'

const MEASURE_OPTIONS = { debounce: 120 }

export default function usePositionDelta() {
  const [fromRef, fromBounds] = useMeasure(MEASURE_OPTIONS)
  const [toRef, toBounds] = useMeasure(MEASURE_OPTIONS)

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
    fromRef,
    toRef,
    getX,
    getY,
    getScale,
  }
}
