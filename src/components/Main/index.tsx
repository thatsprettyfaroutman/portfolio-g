'use client'

import { useEffect, type PropsWithChildren } from 'react'
import useMediaQuery from 'react-use-media-query-ts'
import styled from 'styled-components'
import useWindowSize from '@/hooks/useWindowSize'
import { MEDIA } from '@/styles/media'

const Wrapper = styled.main`
  display: grid;
  grid-gap: var(--space);
`

export default function Main(props: PropsWithChildren) {
  const tablet = useMediaQuery(MEDIA.tablet)
  const { width, height } = useWindowSize()
  const aspectRatio = width / height
  const landscape = aspectRatio > 1
  const landscapePhone = !tablet && landscape

  // Zoom out a bit on landscape phone to fit content more nicely without having to change every single component style
  const scale = landscapePhone ? 0.5 : 1

  // Update viewport meta tag based on `scale`
  useEffect(() => {
    const viewportMeta = document.head.querySelector('meta[name="viewport"]')
    if (!viewportMeta) return
    viewportMeta.setAttribute(
      'content',
      `width=device-width, initial-scale=${scale}, viewport-fit=cover`
    )
  }, [scale])

  return <Wrapper {...props} />
}
