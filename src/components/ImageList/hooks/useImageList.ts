import { useState, useRef, SyntheticEvent } from 'react'
import { useTransition } from 'react-spring'
import { TImageList } from '@/contentful/types'
import usePrefetchImage from '@/hooks/usePrefetchImage'

type TUseImageListProps = {
  children: TImageList
}

export default function useImageList({ children }: TUseImageListProps) {
  const images = children.images.items
  const { prefetchImage, bindPrefetchImage } = usePrefetchImage()
  const directionRef = useRef<0 | -1 | 1>(0)
  const [openIndex, setOpenIndex] = useState(-1)
  const openImage = images[openIndex]
  // Prefetch previous and next images when an image is opened
  const prevImage = openIndex >= 0 ? images[openIndex - 1] : undefined
  const nextImage = openIndex >= 0 ? images[openIndex + 1] : undefined
  prevImage && prefetchImage(prevImage.url)
  nextImage && prefetchImage(nextImage.url)

  const shadeTransitions = useTransition(openIndex > -1, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const imageTransitions = useTransition(openImage, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const handleOpenImage = (index: number) => (e: SyntheticEvent) => {
    e.preventDefault()
    directionRef.current = 0
    setOpenIndex(index)
  }

  const handleChangeImage = (direction: -1 | 1) => () => {
    directionRef.current = direction
    setOpenIndex((s) => {
      const next = s + direction
      if (next < 0 || next >= images.length) {
        return -1
      }
      return next
    })
  }

  const handleCloseImage = () => {
    directionRef.current = 0
    setOpenIndex(-1)
  }

  return {
    bindPrefetchImage,
    handleOpenImage,
    handleChangeImage,
    handleCloseImage,
    shadeTransitions,
    imageTransitions,
  }
}
