import { useMemo } from 'react'
import styled from 'styled-components'
import randomSeed from 'math-random-seed'
import { MEDIA } from '@/styles/media'
import {
  MiniHeading,
  SmallParagraphBlock,
  SmallParagraph,
} from '@/components/Text'
import { type TImpact } from '@/contentful/types'

type TImpactsProps = {
  children: TImpact[]
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 4);
`

const Items = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(var(--maxCol) / 4);
`

const Impact = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 8);
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
    width: auto;
    height: calc(var(--maxCol) / 4);
    /* mix-blend-mode: difference; */
  }
`

export default function Impacts({ children, ...restProps }: TImpactsProps) {
  const shuffledIcons = useMemo(() => {
    const random = randomSeed(children[0].body)
    return [
      '/praise/clap.png',
      '/praise/duck.png',
      '/praise/hands.png',
      '/praise/icecream.png',
      '/praise/party.png',
    ].sort(() => (random() > 0.5 ? 1 : -1))
    // We only want to shuffle this list once, so no need for deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper {...restProps}>
      <MiniHeading>Impacts</MiniHeading>
      <Items>
        {children.map((impact, i) => (
          <Impact key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shuffledIcons[i % shuffledIcons.length]} alt="" />
            <SmallParagraph key={i}>{impact.body}</SmallParagraph>
          </Impact>
        ))}
      </Items>
    </Wrapper>
  )
}
