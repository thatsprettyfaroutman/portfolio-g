import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { MEDIA } from '@/styles/media'
import Three from '@/three'
import VideoCard from '@/three/components/Card/components/Video'
import { useEffect, useMemo, useState } from 'react'
import { CanvasTexture } from 'three'

const CARD_PIXEL_RATIO = 2

type TCardProps = {
  src: string
  iconSrc: string
  width?: number
  height?: number
}

const Wrapper = styled.div<{ aspectRatio: number }>`
  display: grid;
  position: relative;
  justify-items: start;
  box-sizing: border-box;
  aspect-ratio: ${(p) => p.aspectRatio};

  grid-row: 2;

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
  width = 400,
  height = 600,
  src,
  iconSrc,
  ...restProps
}: TCardProps) {
  const [measureRef, bounds] = useMeasure()
  const iconImage = useImage(iconSrc)
  const aspectRatio = width / height

  // TODO: prolly move this somewhere
  const overlayMap = useMemo(() => {
    if (!iconImage) {
      return
    }
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Skip if canvas not supported
    if (!ctx) {
      return
    }

    const scale = CARD_PIXEL_RATIO

    canvas.width = width * scale
    canvas.height = height * scale

    const iconAspect = iconImage.width / iconImage.height
    const iconHeight = 40 * scale
    const iconWidth = iconHeight * iconAspect
    const iconX = canvas.width - iconWidth + 1
    const iconY = canvas.height - iconHeight + 1

    ctx.save()
    ctx.drawImage(iconImage, iconX, iconY, iconWidth, iconHeight)
    ctx.restore()

    return new CanvasTexture(canvas)
  }, [iconImage, width, height])

  return (
    <Wrapper ref={measureRef} {...restProps} aspectRatio={aspectRatio}>
      <Three keepScrollPerspective dpr={CARD_PIXEL_RATIO}>
        {/* @ts-ignore */}
        <VideoCard
          src={src}
          width={bounds.width}
          height={bounds.width / aspectRatio}
          overlayMap={overlayMap}
        />
      </Three>
    </Wrapper>
  )
}
