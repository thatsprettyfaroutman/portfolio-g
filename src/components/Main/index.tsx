'use client'

import { useEffect, type PropsWithChildren } from 'react'
import useMediaQuery from 'react-use-media-query-ts'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'

const Wrapper = styled.main`
  > :not(:last-child) {
    margin-bottom: var(--space);
  }

  ${MEDIA.tablet} {
    > :not(:last-child) {
      margin-bottom: initial;
    }
  }
`

export default function Main(props: PropsWithChildren) {
  const phone = !useMediaQuery(MEDIA.tabletLandscape.replace('@media ', ''))
  const landscape = useMediaQuery('(orientation: landscape)')

  // Zoom out a bit on landscape phone to fit content more nicely without having to change every single component style
  const scale = phone && landscape ? 0.5 : 1

  // Update viewport meta tag based on `scale`
  useEffect(() => {
    const viewportMeta = document.head.querySelector('meta[name="viewport"]')
    if (!viewportMeta) {
      return
    }
    viewportMeta.setAttribute(
      'content',
      `width=device-width, initial-scale=${scale}, viewport-fit=cover`
    )
  }, [scale])

  return <Wrapper {...props} />
}
