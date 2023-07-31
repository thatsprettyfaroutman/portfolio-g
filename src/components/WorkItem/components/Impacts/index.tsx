import { type PropsWithChildren, useMemo } from 'react'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import Text from '@/components/Text'
import { palette } from '@/styles/theme'

type TImpactsProps = PropsWithChildren

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(var(--col) / 2);

  ${MEDIA.tablet} {
    grid-column: 1 / -1;
    grid-template-columns: repeat(4, 1fr);
  }
  ${MEDIA.desktop} {
    grid-column: 1 / 10;
    grid-template-columns: repeat(3, 1fr);
    /* grid-gap: calc(var(--col) / 2); */
  }
`

const Impact = styled(Text.SmallParagraphBlock)`
  position: relative;
  align-content: start;
  width: 100%;
  box-sizing: border-box;

  > * {
    position: relative;
  }

  > img {
    display: block;
    margin: 0;
    height: calc(var(--maxCol) / 4);
    /* mix-blend-mode: difference; */
  }
`

export default function Impacts({ children, ...restProps }: TImpactsProps) {
  const items = Array.isArray(children) ? children : [children]

  // TODO: Seeded shuffle
  const shuffledIcons = useMemo(
    () =>
      [
        '/praise/clap.png',
        '/praise/duck.png',
        '/praise/hands.png',
        '/praise/icecream.png',
        '/praise/party.png',
      ].sort(() => (Math.random() > 0.5 ? 1 : -1)),
    []
  )

  return (
    <Wrapper {...restProps}>
      {items.map((child, i) => (
        <Impact key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shuffledIcons[i % shuffledIcons.length]} alt="" />
          <Text.SmallParagraph key={i}>{child}</Text.SmallParagraph>
        </Impact>
      ))}
    </Wrapper>
  )
}
