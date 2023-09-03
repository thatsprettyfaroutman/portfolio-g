'use client'

import { type PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet'
import useMediaQuery from 'react-use-media-query-ts'
import styled from 'styled-components'
import useWindowSize from '@/hooks/useWindowSize'
import { MEDIA } from '@/styles/media'

const Wrapper = styled.main`
  display: grid;
  grid-gap: calc(var(--space) * 4);
`

export default function Main(props: PropsWithChildren) {
  const tablet = useMediaQuery(MEDIA.tablet)
  const { width, height } = useWindowSize()
  const aspectRatio = width / height
  const landscape = aspectRatio > 1
  const landscapePhone = !tablet && landscape
  const scale = landscapePhone ? 0.5 : 1

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content={`width=device-width, initial-scale=${scale}, viewport-fit=cover`}
        />
      </Helmet>
      <Wrapper {...props} />
    </>
  )
}
