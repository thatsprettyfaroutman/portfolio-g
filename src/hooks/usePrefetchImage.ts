import { useCallback } from 'react'

const fetchedImages = new Set<string>()

const prefetchImage = (src: string) => {
  if (fetchedImages.has(src)) {
    return
  }
  const loader = new Image()
  loader.src = src
  fetchedImages.add(src)
}

export default function usePrefetchImage() {
  return {
    prefetchImage,
    bindPrefetchImage: useCallback(
      (src: string) => ({
        onMouseEnter: () => prefetchImage(src),
        onPointerEnter: () => prefetchImage(src),
        onTouchStart: () => prefetchImage(src),
      }),
      []
    ),
  }
}
