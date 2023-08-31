import Image from 'next/image'
import Link from 'next/link'
import { a } from 'react-spring'
import styled from 'styled-components'
import { TImageList } from '@/contentful/types'
import usePrefetchImage from '@/hooks/usePrefetchImage'
import MorphyIcon from './components/MorphyIcon'
import Spinner from './components/Spinner'
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
    ref,
    handleOpenImage,
    handleChangeImage,
    handleCloseImage,
    shadeTransitions,
    imageTransitions,
    mixProgressDirection,
    isFirstImage,
    isLastImage,
  } = useImageList({
    children,
  })

  const { bindPrefetchImage, prefetchingUrl } = usePrefetchImage()

  return (
    <Wrapper {...restProps} ref={ref}>
      <Items>
        {children.images.items.map((image, i) => {
          const aspectRatio = image.width / image.height
          return (
            <Link
              key={image.sys.id}
              href={image.url}
              prefetch
              onClick={handleOpenImage(i)}
              // Prefetch image when hovering
              {...bindPrefetchImage(image.url)}
            >
              <Image
                height={80}
                width={80 * aspectRatio}
                quality={100}
                loading="lazy"
                src={image.url}
                alt={image.title}
                placeholder="blur"
                blurDataURL={image.placeholder}
              />
              {prefetchingUrl(image.url) && <Spinner />}
            </Link>
          )
        })}
      </Items>

      {shadeTransitions(({ progress }, showing) => {
        return (
          showing && (
            <AShade
              style={{
                opacity: progress.to((p) => 1 - Math.abs(p)),
                // Let users quickly interact with another element when this one is not fully visible (fading out)
                pointerEvents: progress.to((p) => (p < 0 ? 'none' : undefined)),
              }}
              onClick={handleCloseImage}
            />
          )
        )
      })}

      {imageTransitions(
        ({ progress }, image) =>
          image && (
            <AOpenImage
              style={{
                opacity: progress.to((p) => 1 - Math.abs(p)),
                x: progress.to((p0) => {
                  const p = mixProgressDirection(p0)
                  return `calc(var(--space) * ${p})`
                }),
              }}
            >
              {/* 
                Image placeholder not behaving as expected. 
                So, using img instead.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width={image.width}
                height={image.height}
                src={image.placeholder}
                alt=""
              />
              <Spinner />
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.title}
                loading="eager"
              />
            </AOpenImage>
          )
      )}

      {shadeTransitions(({ progress }, showing) => {
        return (
          showing && (
            <AControls
              style={{
                opacity: progress.to((p) => 1 - Math.abs(p)),
                pointerEvents: progress.to((p) => (p < 0 ? 'none' : undefined)),
              }}
            >
              <div onClick={handleChangeImage(-1)}>
                <MorphyIcon icon={isFirstImage ? 'leftCross' : 'left'} />
              </div>
              <div onClick={handleChangeImage(1)}>
                <MorphyIcon icon={isLastImage ? 'rightCross' : 'right'} />
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
