import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import Text from '@/components/Text'
import FONT from '@/styles/fonts'

type TTechsProps = PropsWithChildren

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: calc(var(--col));
  align-content: start;

  ${MEDIA.tablet} {
    grid-column: 1 / -1;
  }

  ${MEDIA.desktop} {
    gap: calc(var(--col) / 2);
    grid-column: 1 / 10;
  }
`

const Tech = styled(Text.SmallParagraphBlock)`
  display: flex;
  gap: calc(var(--col) / 2);
  place-items: center;
  font-family: ${FONT.Inconsolata};

  > div {
    width: calc(var(--maxCol) / 4);
    aspect-ratio: 1;
    background-color: #f0f;
  }
`

export default function Techs({ children, ...restProps }: TTechsProps) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <Wrapper {...restProps}>
      {items.map((child, i) => (
        <Tech key={i}>
          <div />
          <Text.SmallParagraph key={i}>{child}</Text.SmallParagraph>
        </Tech>
      ))}
    </Wrapper>
  )
}
