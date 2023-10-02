import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'
import { TTech } from '@/contentful/types'
import { MEDIA } from '@/styles/media'
import Tech from './components/Tech'

type TTechsProps = { children: TTech[] }

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 4);
`

const Items = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: calc(var(--space) / 8);

  ${MEDIA.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${MEDIA.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`

function Techs({ children, ...restProps }: TTechsProps) {
  return (
    <Wrapper {...restProps}>
      <MiniHeading>Tech</MiniHeading>
      <Items>
        {children.map((tech) => (
          <Tech key={tech.sys.id} name={tech.name} iconSrc={tech.icon.url} />
        ))}
      </Items>
    </Wrapper>
  )
}

// Make Techs usable inside styled-components
export default styled(Techs)``
