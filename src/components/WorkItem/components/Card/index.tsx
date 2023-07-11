import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { MEDIA } from '@/styles/media'
import Three from '@/three'
import VideoCard from '@/three/components/Card/components/Video'

type TCardProps = { src: string }

const Wrapper = styled.div`
  display: grid;
  position: relative;
  justify-items: start;
  box-sizing: border-box;
  // TODO: rm border
  border: 1px solid #0ff8;
  /* background-color: #111; */
  grid-row: 2;

  ${MEDIA.tablet} {
    grid-column: 10 / -1;
    grid-row: 2 / 4;
    justify-items: end;
  }

  ${MEDIA.desktop} {
    grid-column-start: 13;
    grid-row: 2 / 6;
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

/*

 > div {
    aspect-ratio: 2 / 3;
    width: min(400px, 100%);
    background-color: #f0f;

    ${MEDIA.tablet} {
      // TODO: ease stickiness when using 3d card
      position: sticky;
      top: calc(50% - min(300px, 50vh - var(--col)));
      width: min(calc(var(--col) * 8.5), 100%);
      max-height: max(600px, calc(100vh - var(--col) * 2));
    }

    ${MEDIA.desktop} {
      width: min(400px, 100%);
    }
  }

*/

export default function Card({ src, ...restProps }: TCardProps) {
  const [measureRef, bounds] = useMeasure()

  return (
    <Wrapper ref={measureRef} {...restProps}>
      {/* <div /> */}

      <Three keepScrollPerspective>
        {/* @ts-ignore */}
        <VideoCard
          src={src}
          width={bounds.width}
          height={bounds.width / (2 / 3)}
        />
      </Three>
    </Wrapper>
  )
}
