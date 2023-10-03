import { useLayoutEffect, useRef, useState } from 'react'
import { mergeRefs } from 'react-merge-refs'
import useMeasure from 'react-use-measure'

export default function useElementOffset() {
  const ref = useRef<HTMLDivElement>(null)
  const [measureRef, bounds] = useMeasure()
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  })

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    setOffset({
      x: ref.current.offsetLeft,
      y: ref.current.offsetTop,
    })
  }, [bounds.x, bounds.y, bounds.width, bounds.height])

  return { ref: mergeRefs([ref, measureRef]), offset, elementRef: ref, bounds }
}
