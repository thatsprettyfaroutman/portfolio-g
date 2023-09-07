import dynamic from 'next/dynamic'
import useMeasure from 'react-use-measure'
import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'
import FONT from '@/styles/fonts'
import { MEDIA } from '@/styles/media'
import Three from '@/three/lazy'

const VideoCard = dynamic(() => import('@/three/components/VideoCard'), {
  ssr: false,
})

const CARD_PIXEL_RATIO = 2

type TCardProps = {
  src: string
  backText: string
  width?: number
  height?: number
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 3);
  font-family: ${FONT.Fasthand};

  > ${MiniHeading} {
    display: none;
  }

  ${MEDIA.tablet} {
    > ${MiniHeading} {
      display: initial;
      text-align: right;
    }
  }
`

const ThreeWrapper = styled.div`
  position: relative;

  > .three {
    position: absolute;
    top: calc(var(--space) * -2);
    right: calc(var(--fluidSpace) * -1);
    bottom: calc(var(--space) * -2);
    left: calc(var(--fluidSpace) * -1);
    width: auto;
    height: auto;

    // Align right on tablet and desktop
    ${MEDIA.tablet} {
      left: auto;
      right: calc(var(--fluidSpace) * -1);
      width: calc(100% + var(--fluidSpace) * 2);
      max-width: calc(400px + var(--fluidSpace) * 2);
    }
  }
`

function Card({
  width = 400,
  height = 600,
  backText,
  src,
  ...restProps
}: TCardProps) {
  const [measureRef, bounds] = useMeasure()
  const aspect = width / height
  const computedWidth = Math.min(width, bounds.width)
  const computedHeight = computedWidth / aspect || height

  return (
    <Wrapper ref={measureRef} {...restProps}>
      <MiniHeading>Flip Card</MiniHeading>
      <ThreeWrapper
        style={{
          height: computedHeight,
          minHeight: computedHeight,
        }}
      >
        <Three dpr={CARD_PIXEL_RATIO} inViewThreshold={0.5}>
          <VideoCard
            src={src}
            width={computedWidth}
            height={computedHeight}
            backText={backText}
          />
        </Three>
      </ThreeWrapper>
    </Wrapper>
  )
}

// Make Card usable inside styled-components
export default styled(Card)``
