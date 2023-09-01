import range from 'ramda/src/range'
import styled from 'styled-components'
import { SmallParagraph } from '@/components/Text'
import { templateCols } from '@/styles/grid'
import { MEDIA } from '@/styles/media'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  user-select: none;
`

const MeasureCol = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--fluidSpace);
  height: var(--fluidSpace);
  min-width: var(--minCol);
  max-width: var(--space);
  box-sizing: border-box;
  border: 1px dashed #f0f;
`

const VerticalLines = styled.div`
  position: fixed;
  display: grid;
  top: 0;
  left: 0;
  width: 100%;
  max-width: var(--maxWidth);
  grid-template-columns: auto auto;
  justify-content: space-between;
  padding: 0 var(--fluidSpace);
  box-sizing: border-box;
  border-left: 1px solid #0ff2;
  border-right: 1px solid #0ff2;

  ${MEDIA.tablet} {
    grid-template-columns: ${templateCols(18)} auto;
    justify-content: baseline;
    left: 50%;
    transform: translateX(-50%);
  }

  > div {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    border-left: inherit;
    :last-child {
      border-right: inherit;
    }
  }

  > :nth-child(n + 3) {
    display: none;
  }
  ${MEDIA.tablet} {
    > :nth-child(n + 3) {
      display: initial;
    }
  }
`

const HorizontalLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-auto-rows: var(--fluidSpace);

  > div {
    border-top: 1px solid #0ff2;
  }
`

export default function GridHelper({ ...restProps }) {
  return (
    <Wrapper {...restProps}>
      <MeasureCol />

      <VerticalLines>
        {range(0, 18).map((i) => (
          <div key={i}>
            <SmallParagraph>{i + 1}</SmallParagraph>
          </div>
        ))}
      </VerticalLines>

      <HorizontalLines>
        {range(0, 100).map((i) => (
          <div key={i}>
            <SmallParagraph>{i + 1}</SmallParagraph>
          </div>
        ))}
      </HorizontalLines>
    </Wrapper>
  )
}
