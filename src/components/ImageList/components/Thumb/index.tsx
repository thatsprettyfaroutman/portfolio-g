import { type SyntheticEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { a, useSpring } from 'react-spring'
import styled from 'styled-components'
import { type TRichAsset } from '@/contentful/types'
import useCssVariable from '@/hooks/useCssVariable'
import usePrefetchImage from '@/hooks/usePrefetchImage'
import { palette } from '@/styles/theme'
import Spinner from '../Spinner'

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
  const space = useCssVariable('--space')
  const aspectRatio = image.width / image.height
  const spring = useSpring({
    config: { clamp: true },
    scale: open ? 1.25 : 1,
  })
  const { bindPrefetchImage, prefetchingUrl } = usePrefetchImage()

  return (
    <AWrapper style={spring} {...bindPrefetchImage(image.url)} {...restProps}>
      <Image
        height={80}
        width={80 * aspectRatio}
        loading="lazy"
        src={image.url}
        alt={image.title}
        placeholder="blur"
        blurDataURL={image.placeholder}
      />
      {prefetchingUrl(image.url) && <CustomSpinner />}
    </AWrapper>
  )
}
