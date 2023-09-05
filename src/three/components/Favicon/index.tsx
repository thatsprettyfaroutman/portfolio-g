'use client'

import { useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import throttle from 'lodash.throttle'
import styled from 'styled-components'
import { RingGeometry, WebGLRenderer } from 'three'
import useWindowSize from '@/hooks/useWindowSize'
import AuroraDisc from '@/three/components/AuroraDisc'
import Camera from '@/three/components/Camera'

const FPS = 1000 / 15
const AURORA_GEOMETRY = new RingGeometry(0.4, 1, 36, 16)

type TFaviconProps = {}

const Wrapper = styled.div`
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 64px;
  height: 64px;
`

const useFavicons = () => {
  const [favicons, setFavicons] = useState<HTMLLinkElement[]>([])
  useEffect(() => {
    if (typeof document === 'undefined') {
      return []
    }

    const favicons: HTMLLinkElement[] = []
    const head = document.getElementsByTagName('head')[0]
    const favicon = document.createElement('link')
    favicon.type = 'image/x-icon'
    favicon.rel = 'icon'
    const appleFavicon = document.createElement('link')
    appleFavicon.rel = 'apple-touch-icon'
    favicons.push(favicon, appleFavicon)

    // Remove existing favicons
    // const existingFavicons = head.getElementsByTagName('link')
    // for (let i = existingFavicons.length; --i >= 0; ) {
    //   const rel = existingFavicons[i].getAttribute('rel')
    //   if (!rel) {
    //     continue
    //   }
    //   if (/\bicon\b/i.test(rel)) {
    //     head.removeChild(existingFavicons[i])
    //   }
    // }

    // Add new ones
    favicons.forEach((el) => head.appendChild(el))
    setFavicons(favicons)

    return () => {
      favicons.forEach((el) => head.removeChild(el))
    }
  }, [])
  return favicons
}

const useUpdateFavicons = (favicons: HTMLLinkElement[]) =>
  useMemo(
    () =>
      throttle((canvas: HTMLCanvasElement) => {
        const src = canvas.toDataURL()
        for (let i = favicons.length; --i >= 0; ) {
          favicons[i].setAttribute('href', src)
        }
      }, FPS),
    [favicons]
  )

const FaviconPrinter = () => {
  const favicons = useFavicons()
  const updateFavicons = useUpdateFavicons(favicons)
  useFrame((s) => {
    updateFavicons(s.gl.domElement)
  })
  return null
}

export default function Favicon(props: TFaviconProps) {
  const { width } = useWindowSize()
  if (width < 768) {
    // Don't animate favicon on mobile devices
    return null
  }

  return (
    <Wrapper {...props}>
      <Canvas
        linear
        flat
        gl={(canvas) =>
          new WebGLRenderer({
            canvas,
            preserveDrawingBuffer: true,
            alpha: true,
            antialias: false,
          })
        }
      >
        <Camera />
        <AuroraDisc
          scale={0.35}
          timeScale={2}
          geometry={AURORA_GEOMETRY}
          disableAppearAnimation
        />
        <FaviconPrinter />
      </Canvas>
    </Wrapper>
  )
}
