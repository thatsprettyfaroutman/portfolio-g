import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import Three from '@/three/lazy'
import useCssVariable from '@/hooks/useCssVariable'
import VideoCard from '@/three/components/VideoCard'
import useBackMap from './hooks/useBackMap'

const CARD_PIXEL_RATIO = 2

type TCardProps = {
  src: string
  iconSrc: string
  backText: string
  width?: number
  height?: number
}

const Wrapper = styled.div`
  position: relative;

  > .three {
    position: absolute;
    top: calc(var(--maxCol) * -1);
    right: calc(var(--col) * -1);
    bottom: calc(var(--maxCol) * -1);
    left: calc(var(--col) * -1);
    width: auto;
    height: auto;
  }
`

function Card({
  width = 400,
  height = 600,
  backText,
  src,
  iconSrc,
  ...restProps
}: TCardProps) {
  const [measureRef, bounds] = useMeasure()
  const aspect = width / height
  const maxCol = useCssVariable('--maxCol')

  const computedWidth = Math.min(width, bounds.width)
  const computedHeight = computedWidth / aspect

  const backMap = useBackMap({
    text: backText,
    width: width * CARD_PIXEL_RATIO,
    height: height * CARD_PIXEL_RATIO,
    padding: maxCol * 0.5 * CARD_PIXEL_RATIO,
  })

  return (
    <Wrapper
      ref={measureRef}
      {...restProps}
      style={{ height: computedHeight, minHeight: computedHeight }}
    >
      <Three keepScrollPerspective dpr={CARD_PIXEL_RATIO}>
        <VideoCard
          src={src}
          width={computedWidth}
          height={computedHeight}
          iconMapSrc={iconSrc}
          backMap={backMap}
        />
      </Three>
    </Wrapper>
  )
}

// Make Card usable inside styled-components
export default styled(Card)``
