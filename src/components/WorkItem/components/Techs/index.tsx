import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import BorderedGrid from '@/components/BorderedGrid'
import Tech from './components/Tech'
import { TTech } from '@/contentful/types'
import { MiniHeading } from '@/components/Text'

type TTechsProps = { children: TTech[] }

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 4);
`

const Items = styled(BorderedGrid)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;

  ${MEDIA.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${MEDIA.desktop} {
    grid-template-columns: repeat(6, 1fr);
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
