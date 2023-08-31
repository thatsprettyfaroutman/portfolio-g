import { type SyntheticEvent, useState, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from 'react-merge-refs'
// TODO: add drag controls
// import { useDrag } from '@use-gesture/react'
import { useTransition } from 'react-spring'
import { TImageList } from '@/contentful/types'
import usePrefetchImage from '@/hooks/usePrefetchImage'

type TUseImageListProps = {
  children: TImageList
}

export default function useImageList({ children }: TUseImageListProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const images = children.images.items
  const [inViewRef, inView] = useInView({ threshold: 0.9 })
  const { prefetchImage } = usePrefetchImage()
  const directionRef = useRef<0 | -1 | 1>(0)
  const [openIndex, setOpenIndex] = useState(-1)
  const openImage = images[openIndex]

  // Prefetch previous and next images when an image is opened
  const prevImage = openIndex >= 0 ? images[openIndex - 1] : undefined
  const nextImage = openIndex >= 0 ? images[openIndex + 1] : undefined
  prevImage && prefetchImage(prevImage.url)
  nextImage && prefetchImage(nextImage.url)

  const shadeTransitions = useTransition(openIndex > -1, {
    from: { progress: 1 },
    enter: { progress: 0 },
    leave: { progress: -1 },
  })

  const imageTransitions = useTransition(openImage, {
    from: { progress: 1 },
    enter: { progress: 0 },
    leave: { progress: -1 },
  })

  const scrollIntoView = useCallback(() => {
    if (inView || !wrapperRef.current) {
      return
    }
    wrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [inView])

  const handleOpenImage = useCallback(
    (index: number) => (e: SyntheticEvent) => {
      e.preventDefault()
      directionRef.current = 0
      setOpenIndex(index)
    },
    []
  )

  const handleChangeImage = useCallback(
    (direction: -1 | 1) => () => {
      directionRef.current = direction
      setOpenIndex((s) => {
        const next = s + direction
        if (next < 0 || next >= images.length) {
          scrollIntoView()
          return -1
        }
        return next
      })
    },
    [images.length, scrollIntoView]
  )

  const handleCloseImage = useCallback(() => {
    directionRef.current = 0
    setOpenIndex(-1)
    scrollIntoView()
  }, [scrollIntoView])

  const mixProgressDirection = useCallback(
    (progress: number) => progress * directionRef.current,
    []
  )

  return {
    ref: mergeRefs([wrapperRef, inViewRef]),
    handleOpenImage,
    handleChangeImage,
    handleCloseImage,
    shadeTransitions,
    imageTransitions,
    mixProgressDirection,
    isFirstImage: !prevImage,
    isLastImage: !nextImage,
  }
}
