import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { MEDIA } from '@/styles/media'
import Three from '@/three'
import VideoCard from '@/three/components/Card/components/Video'
import { useEffect, useMemo, useState } from 'react'
import { CanvasTexture } from 'three'

const CARD_WIDTH = 400
const CARD_HEIGHT = 600
const CARD_ASPECT = CARD_WIDTH / CARD_HEIGHT
const CARD_PR = 2

type TCardProps = { src: string; label: string; labelImageSrc: string }

const Wrapper = styled.div`
  display: grid;
  position: relative;
  justify-items: start;
  box-sizing: border-box;
  grid-row: 2;
  aspect-ratio: ${CARD_ASPECT};

  ${MEDIA.tablet} {
    grid-column: 10 / -1;
    grid-row: 2 / 4;
    justify-items: end;
  }

  ${MEDIA.desktop} {
    grid-column-start: 13;
    grid-row: 1 / 6;
    justify-items: start;
  }

  > .three {
    position: absolute;
    top: calc(var(--col) * -1);
    right: calc(var(--col) * -1);
    bottom: calc(var(--col) * -1);
    left: calc(var(--col) * -1);
    width: auto;
    height: auto;
  }
`

function useImage(src: string) {
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null)
  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      setLoadedImage(image)
    }
  }, [src])
  return loadedImage
}

export default function Card({
  src,
  label,
  labelImageSrc,
  ...restProps
}: TCardProps) {
  const [measureRef, bounds] = useMeasure()
  const labelImage = useImage(labelImageSrc)

  // TODO: prolly move this somewhere
  const overlayMap = useMemo(() => {
    if (!labelImage) {
      return
    }
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Skip if canvas not supported
    if (!ctx) {
      return
    }

    const scale = CARD_PR

    canvas.width = CARD_WIDTH * scale
    canvas.height = CARD_HEIGHT * scale

    const labelImageAspect = labelImage.width / labelImage.height
    const labelImageHeight = 40 * scale
    const labelImageWidth = labelImageHeight * labelImageAspect
    const labelImageX = canvas.width - labelImageWidth + 1
    const labelImageY = canvas.height - labelImageHeight + 1

    ctx.save()
    ctx.drawImage(
      labelImage,
      labelImageX,
      labelImageY,
      labelImageWidth,
      labelImageHeight
    )
    ctx.restore()

    // Label Box + Text
    ctx.save()
    const hPadding = 20 * scale
    const fontSize = 15 * scale
    ctx.font = `${fontSize}px Karla, sans-serif`
    const textMeasure = ctx.measureText(label)
    const textHeight =
      textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent
    const textX = hPadding //labelImageX - textMeasure.width - hPadding
    const textY = labelImageY + labelImageHeight * 0.5 + textHeight
    ctx.fillStyle = '#fff'
    ctx.fillRect(
      textX - hPadding,
      labelImageY,
      textMeasure.width + hPadding * 2,
      labelImageHeight
    )
    ctx.fillStyle = '#000'
    ctx.fillText(label, textX, textY)
    ctx.restore()

    return new CanvasTexture(canvas)
  }, [labelImage, label])

  return (
    <Wrapper ref={measureRef} {...restProps}>
      <Three keepScrollPerspective dpr={CARD_PR}>
        {/* @ts-ignore */}
        <VideoCard
          src={src}
          width={bounds.width}
          height={bounds.width / CARD_ASPECT}
          overlayMap={overlayMap}
        />
      </Three>
    </Wrapper>
  )
}
