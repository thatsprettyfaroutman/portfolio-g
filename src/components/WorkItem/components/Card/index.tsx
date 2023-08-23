import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import Three from '@/three/lazy'
import useCssVariable from '@/hooks/useCssVariable'
import VideoCard from '@/three/components/VideoCard'
import Scene from './scene'
import useBackMap from './hooks/useBackMap'

const CARD_PIXEL_RATIO = 2

type TCardProps = {
  src: string
  iconSrc: string
  backText: string
  width?: number
  height?: number
}

const Wrapper = styled.div<{ aspectRatio: number }>`
  display: grid;
  position: relative;
  justify-items: start;
  box-sizing: border-box;
  aspect-ratio: ${(p) => p.aspectRatio};

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

function Card({
  width = 400,
  height = 600,
  backText,
  src,
  iconSrc,
  ...restProps
}: TCardProps) {
  const [measureRef, bounds] = useMeasure()
  const aspectRatio = width / height
  const col = useCssVariable('--col')

  const backMap = useBackMap({
    text: backText,
    width: width * CARD_PIXEL_RATIO,
    height: height * CARD_PIXEL_RATIO,
    padding: col * CARD_PIXEL_RATIO,
  })

  return (
    <Wrapper ref={measureRef} {...restProps} aspectRatio={aspectRatio}>
      <Three keepScrollPerspective dpr={CARD_PIXEL_RATIO}>
        <Scene>
          <VideoCard
            src={src}
            width={bounds.width}
            height={bounds.width / aspectRatio}
            iconMapSrc={iconSrc}
            backMap={backMap}
          />
        </Scene>
      </Three>
    </Wrapper>
  )
}

// Make Card usable inside styled-components
export default styled(Card)``
