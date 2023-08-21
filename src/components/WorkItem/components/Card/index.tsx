import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { MEDIA } from '@/styles/media'
import Three from '@/three'
import VideoCard from '@/three/components/VideoCard'
import Sticky from '@/three/components/Sticky'
import useCssVariable from '@/hooks/useCssVariable'

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
  /* TODO: rm outline */
  /* outline: 1px solid #0f0; */

  ${MEDIA.tablet} {
    grid-column: 10 / -1;
    grid-row: 1 / 4;
    justify-items: end;
    aspect-ratio: initial;
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

export default function Card({
  width = 400,
  height = 600,
  src,
  iconSrc,
  ...restProps
}: TCardProps) {
  const [measureRef, bounds] = useMeasure()
  const aspectRatio = width / height
  const col = useCssVariable('--col')

  return (
    <Wrapper ref={measureRef} {...restProps} aspectRatio={aspectRatio}>
      <Three dpr={CARD_PIXEL_RATIO}>
        <Sticky
          topMargin={col}
          bottomMargin={col}
          height={bounds.width / aspectRatio}
        >
          <VideoCard
            src={src}
            width={bounds.width}
            height={bounds.width / aspectRatio}
            iconMapSrc={iconSrc}
          />
        </Sticky>
      </Three>
    </Wrapper>
  )
}
