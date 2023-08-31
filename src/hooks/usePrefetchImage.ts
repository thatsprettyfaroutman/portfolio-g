import { useCallback, useState } from 'react'
import uniq from 'ramda/src/uniq'

const fetchedImages = new Set<string>()

export default function usePrefetchImage() {
  const [urlsPrefetching, setUrlsPrefetching] = useState<string[]>([])

  const prefetchImage = useCallback((src: string) => {
    if (fetchedImages.has(src)) {
      return
    }
    setUrlsPrefetching((s) => uniq([...s, src]))
    const loader = new Image()
    loader.src = src
    loader.onload = loader.onerror = () => {
      setUrlsPrefetching((s) => s.filter((url) => url !== src))
    }
    fetchedImages.add(src)
  }, [])

  const prefetchingUrl = useCallback(
    (src: string) => urlsPrefetching.includes(src),
    [urlsPrefetching]
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
