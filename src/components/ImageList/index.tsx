import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTransition, a } from 'react-spring'
import styled from 'styled-components'
import { TImageList } from '@/contentful/types'
import usePrefetchImage from '@/hooks/usePrefetchImage'
import MorphyIcon from './components/MorphyIcon'
import useImageList from './hooks/useImageList'
import { Wrapper, Items, OpenImage, Shade, Controls } from './styled'

type TImageListProps = {
  children: TImageList
}

const AShade = a(Shade)
const AOpenImage = a(OpenImage)
const AControls = a(Controls)

function ImageList({ children, ...restProps }: TImageListProps) {
  const {
    bindPrefetchImage,
    handleOpenImage,
    handleChangeImage,
    handleCloseImage,
    shadeTransitions,
    imageTransitions,
    getStyleProgress,
    isFirst,
    isLast,
  } = useImageList({
    children,
  })

  return (
    <Wrapper {...restProps}>
      <Items>
        {children.images.items.map((image, i) => {
          const aspectRatio = image.width / image.height
          return (
            <Link
              key={image.sys.id}
              href={image.url}
              prefetch
              onClick={handleOpenImage(i)}
              // Prefectch image when hovering
              {...bindPrefetchImage(image.url)}
            >
              <Image
                height={80}
                width={80 * aspectRatio}
                quality={100}
                loading="lazy"
                src={image.url}
                alt={image.title}
              />
            </Link>
          )
        })}
      </Items>

      {shadeTransitions((style, showing) => {
        return (
          showing && (
            <AShade
              style={{
                ...style,

                // Let users quickly interact with another element when this one is not fully visible (fading out)
                pointerEvents: style.opacity.to((o) =>
                  o < 0.9 ? 'none' : undefined
                ),
              }}
              onClick={handleCloseImage}
            />
          )
        )
      })}

      {imageTransitions(
        (style, image, { phase }) =>
          image && (
            <AOpenImage
              style={{
                ...style,
                x: style.opacity.to((o) => {
                  const p = getStyleProgress(o, phase)
                  return `calc(var(--space) * ${p})`
                }),
              }}
            >
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.title}
              />
            </AOpenImage>
          )
      )}

      {shadeTransitions((style, showing) => {
        return (
          showing && (
            <AControls style={style}>
              <div onClick={handleChangeImage(-1)}>
                <MorphyIcon icon={isFirst ? 'leftCross' : 'left'} />
              </div>
              <div onClick={handleChangeImage(1)}>
                <MorphyIcon icon={isLast ? 'rightCross' : 'right'} />
              </div>
            </AControls>
          )
        )
      })}
    </Wrapper>
  )
}

// Make ImageList usable inside styled-components
export default styled(ImageList)``
