import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTransition, a } from 'react-spring'
import styled from 'styled-components'
import { TImageList } from '@/contentful/types'
import usePrefetchImage from '@/hooks/usePrefetchImage'
import { palette } from '@/styles/theme'
import MorphyIcon from './components/MorphyIcon'

type TImageListProps = {
  children: TImageList
}

const Wrapper = styled.div``

const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: calc(var(--space) / 4);

  > a {
    position: relative;
    display: inline-block;

    ::before {
      content: ' ';
      position: absolute;
      top: calc(var(--space) / 16);
      left: calc(var(--space) / 16);
      width: 100%;
      height: 100%;
      border: 1px solid ${palette.main.text};
      border-top: none;
      border-left: none;
    }

    > img {
      position: relative;
      display: block;
      margin: 0;
    }
  }
`

const OpenImage = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;

  > img {
    position: absolute;
    top: calc(var(--space) / 2);
    left: calc(var(--space) / 2);
    width: calc(100% - var(--space));
    height: calc(100% - var(--space));
    object-fit: contain;
  }
`

const Shade = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #0004;
  z-index: 1;
  user-select: none;
`

const Controls = styled.div`
  position: fixed;
  top: 50%;
  height: var(--space);
  right: 0;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
  user-select: none;

  > div {
    position: absolute;
    width: var(--space);
    height: 100%;
    top: 50%;
    left: 0;
    cursor: pointer;
    background-color: ${palette.main.background.top};

    :last-child {
      left: auto;
      right: 0;
    }
  }
`

const AShade = a(Shade)
const AOpenImage = a(OpenImage)
const AControls = a(Controls)

function ImageList({ children, ...restProps }: TImageListProps) {
  const [openIndex, setOpenIndex] = useState(-1)
  const { prefetchImage, bindPrefetchImage } = usePrefetchImage()

  const openImage = children.images.items[openIndex]
  const prevImage =
    openIndex >= 0 ? children.images.items[openIndex - 1] : undefined
  const nextImage =
    openIndex >= 0 ? children.images.items[openIndex + 1] : undefined
  prevImage && prefetchImage(prevImage.url)
  nextImage && prefetchImage(nextImage.url)

  const shadeTransitions = useTransition(openIndex > -1, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const imageTransitions = useTransition(openImage, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const directionRef = useRef(0)

  const handleOpenImage = (index: number) => (e) => {
    e.preventDefault()
    directionRef.current = 0
    setOpenIndex(index)
  }

  const handleNextImage = (direction: -1 | 1) => () => {
    directionRef.current = direction
    setOpenIndex((s) => {
      const next = s + direction
      if (next < 0 || next >= children.images.items.length) {
        return -1
      }
      return next
    })
  }

  const handleCloseImage = () => {
    directionRef.current = 0
    setOpenIndex(-1)
  }

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
                  const p =
                    (1 - o) *
                    directionRef.current *
                    (phase === 'enter' ? -1 : 1)
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
              <div onClick={handleNextImage(-1)}>
                <MorphyIcon icon={prevImage ? 'left' : 'leftCross'} />
              </div>
              <div onClick={handleNextImage(1)}>
                <MorphyIcon icon={nextImage ? 'right' : 'rightCross'} />
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
