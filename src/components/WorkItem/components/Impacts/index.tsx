import Image from 'next/image'
import styled from 'styled-components'
import { MiniHeading, SmallParagraph } from '@/components/Text'
import { type TImpact } from '@/contentful/types'
import { MEDIA } from '@/styles/media'
import useGetIcon from './hooks/useGetIcon'

type TImpactsProps = {
  children: TImpact[]
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 4);
`

const Items = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(var(--space) / 4);

  ${MEDIA.tablet} {
    grid-gap: calc(var(--space) / 2);
  }
`

const Impact = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 8);
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
    /* mix-blend-mode: difference; */
  }
`

function Impacts({ children, ...restProps }: TImpactsProps) {
  const getIcon = useGetIcon(children[0].body)

  return (
    <Wrapper {...restProps}>
      <MiniHeading>Wins</MiniHeading>
      <Items>
        {children.map((impact, i) => {
          const icon = getIcon(i)
          const aspectRatio = icon.width / icon.height
          return (
            <Impact key={impact.sys.id}>
              <Image
                src={icon.src}
                width={20 * aspectRatio}
                height={20}
                alt=""
              />
              <SmallParagraph key={i}>{impact.body}</SmallParagraph>
            </Impact>
          )
        })}
      </Items>
    </Wrapper>
  )
}

// Make Impacts usable inside styled-components
export default styled(Impacts)``
