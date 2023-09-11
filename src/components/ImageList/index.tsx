import { a } from 'react-spring'
import styled from 'styled-components'
import { TImageList } from '@/contentful/types'
import MorphyIcon from './components/MorphyIcon'
import OpenImage from './components/OpenImage'
import Thumb from './components/Thumb'
import useImageList from './hooks/useImageList'
import { Wrapper, Items, Shade, Controls, ImageTitle } from './styled'

type TImageListProps = {
  children: TImageList
}

const AShade = a(Shade)
const AControls = a(Controls)
const AImageTitle = a(ImageTitle)

function ImageList({ children, ...restProps }: TImageListProps) {
  const images = children.images.items

  const {
    ref,
    openIndex,
    handleOpenImage,
    handleChangeImage,
    handleCloseImage,
    shadeTransitions,
    showProgress,
    imageTransitions,
    mixProgressDirection,
    isFirstImage,
    isLastImage,
  } = useImageList({
    images,
  })

  return (
    <Wrapper {...restProps} ref={ref}>
      {/* Relative image thumb buttons */}
      <Items>
        {images.map((image, i) => (
          <Thumb
            key={image.sys.id}
            href={image.url}
            open={openIndex === i}
            onClick={handleOpenImage(i)}
          >
            {image}
          </Thumb>
        ))}
      </Items>

      {/* Fixed background shade */}
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

      {/* Fixed opened image */}
      {imageTransitions(({ progress, opacity }, image, { phase }) => {
        return (
          image && (
            <OpenImage
              key={`${image.sys.id}-${phase}`}
              opacity={opacity}
              xProgress={mixProgressDirection(progress)}
              showProgress={showProgress}
              onChangeImage={handleChangeImage}
              onCloseImage={handleCloseImage}
              phase={phase}
            >
              {image}
            </OpenImage>
          )
        )
      })}

      {/* Fixed image title */}
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

      {/* Fixed navigation controls over the image */}
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
    </Wrapper>
  )
}

// Make ImageList usable inside styled-components
export default styled(ImageList)``
