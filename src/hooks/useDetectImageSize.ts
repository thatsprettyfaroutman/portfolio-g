import { useState, useEffect } from 'react'

export default function useDetectImageSize(src: string) {
  const [size, setSize] = useState({
    ready: false,
    width: 0,
    height: 0,
    aspect: 0,
  })

  useEffect(() => {
    if (size.ready) {
      return
    }

    const loader = new Image()

    const updateSize = () => {
      if (loader.width && loader.height) {
        setSize({
          ready: true,
          width: loader.width,
          height: loader.height,
          aspect: loader.width / loader.height,
        })
      }
    }

    loader.src = src
    loader.onload = updateSize

    // Usually the image size is available before the whole image is loaded
    const t = setInterval(updateSize, 10)

    return () => {
      clearInterval(t)
    }
  }, [src, size.ready])

  return size
}
