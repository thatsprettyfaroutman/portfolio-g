import Image from 'next/image'
import Link from 'next/link'
import { a } from 'react-spring'
import styled from 'styled-components'
import Magnet from '@/components/Magnet'
import { TImageList } from '@/contentful/types'
import usePrefetchImage from '@/hooks/usePrefetchImage'
import MorphyIcon from './components/MorphyIcon'
import OpenImage from './components/OpenImage'
import Spinner from './components/Spinner'
import useImageList from './hooks/useImageList'
import { Wrapper, Items, Shade, Controls, ImageTitle } from './styled'

type TImageListProps = {
  children: TImageList
}

const AShade = a(Shade)
const AControls = a(Controls)
const AImageTitle = a(ImageTitle)

function ImageList({ children, ...restProps }: TImageListProps) {
  const {
    ref,
    openIndex,
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
                style={{
                  transform:
                    openIndex === i
                      ? `translateY(calc(var(--space)/-8))`
                      : undefined,
                }}
              />
              {prefetchingUrl(image.url) && <Spinner />}
            </Link>
          )
        })}
      </Items>

      {shadeTransitions(({ progress, opacity }, showing) => {
        return (
          showing && (
            <AShade
              style={{
                opacity,
                // Let users quickly interact with another element when this one is not fully visible (fading out)
                pointerEvents: progress.to((p) => (p < 0 ? 'none' : undefined)),
              }}
              onClick={handleCloseImage}
            />
          )
        )
      })}

      {imageTransitions(({ progress, opacity }, image, { phase }) => {
        return (
          image && (
            <OpenImage
              name={image.title}
              key={`${image.sys.id}-${phase}`}
              opacity={opacity}
              openProgress={mixProgressDirection(progress)}
              onChangeImage={handleChangeImage}
              onCloseImage={handleCloseImage}
              phase={phase}
            >
              {image}
            </OpenImage>
          )
        )
      })}

      {shadeTransitions(({ progress, opacity }, showing) => {
        return (
          showing && (
            <AControls
              style={{
                opacity,
                pointerEvents: progress.to((p) => (p < 0 ? 'none' : undefined)),
              }}
            >
              <div onClick={handleChangeImage(-1)}>
                <MorphyIcon icon={isFirstImage ? 'leftCross' : 'left'} />
              </div>
              <div onClick={handleChangeImage(1)}>
                <MorphyIcon icon={isLastImage ? 'rightCross' : 'right'} />
              </div>
              <div onClick={handleCloseImage}>
                <MorphyIcon icon="rightCross" />
              </div>
            </AControls>
          )
        )
      })}

      {imageTransitions(({ progress, opacity }, image) => {
        return (
          image && (
            <AImageTitle
              style={{
                opacity,
                x: mixProgressDirection(progress).to(
                  (p) => `calc(var(--space) * ${p * 0.5})`
                ),
              }}
            >
              {image.title}
            </AImageTitle>
          )
        )
      })}
    </Wrapper>
  )
}

// Make ImageList usable inside styled-components
export default styled(ImageList)``
