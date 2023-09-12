import { useCallback, useEffect, useRef, useState } from 'react'

const imageStatusesStore = new Map<string, 'fetching' | 'done'>()

export default function usePrefetchImage() {
  const [imageStatuses, setImageStatuses] = useState(imageStatusesStore)
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const prefetchImage = useCallback((src: string) => {
    if (imageStatusesStore.has(src)) {
      return
    }
    imageStatusesStore.set(src, 'fetching')
    setImageStatuses(new Map(imageStatusesStore))

    const loader = new Image()
    loader.src = src
    loader.onload = loader.onerror = () => {
      imageStatusesStore.set(src, 'done')
      if (mounted.current) {
        setImageStatuses(new Map(imageStatusesStore))
      }
    }
  }, [])

  const prefetchingUrl = useCallback(
    (src: string) => imageStatuses.get(src) === 'fetching',
    [imageStatuses]
  )

  return {
    prefetchingUrl,
    prefetchImage,
    bindPrefetchImage: useCallback(
      (src: string) => ({
        onMouseEnter: () => prefetchImage(src),
        onPointerEnter: () => prefetchImage(src),
        onTouchStart: () => prefetchImage(src),
      }),
      [prefetchImage]
    ),
  }
}
