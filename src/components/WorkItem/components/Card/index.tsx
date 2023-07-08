import styled from 'styled-components'
import { MEDIA } from '@/styles/media'

type TCardProps = {}

const Wrapper = styled.div`
  display: grid;
  position: relative;
  justify-items: start;
  box-sizing: border-box;
  // TODO: rm commented styles
  /* border: 1px solid #0ff8;
  border-left: none;
  border-right: none; */
  grid-row: 2;

  ${MEDIA.tablet} {
    grid-column: 10 / -1;
    grid-row: 1 / 4;
    justify-items: end;
  }

  ${MEDIA.desktop} {
    grid-column-start: 13;
    grid-row: 1/6;
    justify-items: start;
  }

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
`

export default function Card({ ...restProps }: TCardProps) {
  return (
    <Wrapper {...restProps}>
      <div />
    </Wrapper>
  )
}
