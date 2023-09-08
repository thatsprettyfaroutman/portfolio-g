import { type SyntheticEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { a, useSpring } from 'react-spring'
import styled from 'styled-components'
import { type TRichAsset } from '@/contentful/types'
import usePrefetchImage from '@/hooks/usePrefetchImage'
import { palette } from '@/styles/theme'
import Spinner from '../Spinner'

const THUMB_HEIGHT = 80

type TThumbProps = {
  href: string
  image: TRichAsset
  open?: boolean
  onClick?: (e: SyntheticEvent) => void
}

const Wrapper = styled(Link)`
  position: relative;
  display: block;

  > img {
    position: relative;
    display: block;
    margin: 0;
    border-radius: 4px;
    box-shadow: 0 calc(var(--space) / 8) calc(var(--space) / 8)
      ${palette.main.text.alpha(0.15)};
  }
`

const CustomSpinner = styled(Spinner)`
  position: absolute;
  bottom: calc(var(--space) / 16);
  right: calc(var(--space) / 16);
  width: calc(var(--space) / 4);
  height: calc(var(--space) / 4);
`

const AWrapper = a(Wrapper)

export default function Thumb({
  image,
  open = false,
  ...restProps
}: TThumbProps) {
  const aspectRatio = image.width / image.height
  const spring = useSpring({
    scale: open ? 1.25 : 1,
  })
  const { bindPrefetchImage, prefetchingUrl } = usePrefetchImage()

  const imageProps = {
    width: THUMB_HEIGHT * aspectRatio,
    height: THUMB_HEIGHT,
    src: image.url,
    alt: image.title,
    style: {
      backgroundImage: image.placeholder && `url(${image.placeholder})`,
    },
  }

  return (
    <AWrapper style={spring} {...bindPrefetchImage(image.url)} {...restProps}>
      {image.contentType.includes('image') ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image {...imageProps} loading="lazy" placeholder="empty" />
      ) : (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img {...imageProps} src={image.poster} />
      )}
      {prefetchingUrl(image.url) && <CustomSpinner />}
    </AWrapper>
  )
}
