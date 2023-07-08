import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import Text from '@/components/Text'

type TImpactsProps = PropsWithChildren

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(var(--col));
  grid-row-gap: calc(var(--col));

  ${MEDIA.tablet} {
    grid-column: 1 / -1;
    grid-template-columns: repeat(4, 1fr);
  }
  ${MEDIA.desktop} {
    grid-column: 1 / 10;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: calc(var(--col) / 2);
  }
`

const Impact = styled(Text.SmallParagraphBlock)`
  align-content: start;
  border: 1px solid #f0f;
  padding: calc(var(--col) / 8);
  > div {
    width: calc(var(--maxCol) / 4);
    aspect-ratio: 1;
    background-color: #f0f;
  }
`

export default function Impacts({ children, ...restProps }: TImpactsProps) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <Wrapper {...restProps}>
      {items.map((child, i) => (
        <Impact key={i}>
          <div />
          <Text.SmallParagraph key={i}>{child}</Text.SmallParagraph>
        </Impact>
      ))}
    </Wrapper>
  )
}
