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

type TCardProps = { src: string; iconSrc: string }

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

export default function Card({ src, iconSrc, ...restProps }: TCardProps) {
  const [measureRef, bounds] = useMeasure()
  const iconImage = useImage(iconSrc)

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

    const scale = CARD_PR

    canvas.width = CARD_WIDTH * scale
    canvas.height = CARD_HEIGHT * scale

    const iconAspect = iconImage.width / iconImage.height
    const iconHeight = 40 * scale
    const iconWidth = iconHeight * iconAspect
    const iconX = canvas.width - iconWidth + 1
    const iconY = canvas.height - iconHeight + 1

    ctx.save()
    ctx.drawImage(iconImage, iconX, iconY, iconWidth, iconHeight)
    ctx.restore()

    return new CanvasTexture(canvas)
  }, [iconImage])

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
