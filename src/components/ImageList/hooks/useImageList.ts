import { type SyntheticEvent, useState, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from 'react-merge-refs'
import { SpringValue, useSpring, useTransition } from 'react-spring'
import { TImageList } from '@/contentful/types'
import usePrefetchImage from '@/hooks/usePrefetchImage'

type TUseImageListProps = {
  images: TImageList['images']['items']
}

export default function useImageList({ images }: TUseImageListProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
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

  const { showProgress } = useSpring({
    showProgress: openIndex > -1 ? 1 : 0,
  })

  const shadeTransitions = useTransition(openIndex > -1, {
    from: { progress: 1, opacity: 0 },
    enter: { progress: 0, opacity: 1 },
    leave: { progress: -1, opacity: 0 },
  })

  const imageTransitions = useTransition(openImage, {
    from: { progress: 1, opacity: 0 },
    enter: { progress: 0, opacity: 1 },
    leave: { progress: -1, opacity: 0 },
    unique: true,
  })

  const scrollIntoView = useCallback(() => {
    if (inView || !wrapperRef.current) {
      return
    }
    wrapperRef.current.scrollIntoView({
      // behavior: 'smooth',
      block: 'center',
    })
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
    (direction: number) => () => {
      const dir = Math.sign(direction)
      directionRef.current = dir as 0 | 1 | -1

      if (dir === 0) {
        return
      }

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
    (progress: SpringValue<number>) =>
      progress.to((p) => p * directionRef.current),
    []
  )

  return {
    ref: mergeRefs([wrapperRef, inViewRef]),
    openIndex,
    handleOpenImage,
    handleChangeImage,
    handleCloseImage,
    shadeTransitions,
    showProgress,
    imageTransitions,
    mixProgressDirection,
    isFirstImage: !prevImage,
    isLastImage: !nextImage,
  }
}
