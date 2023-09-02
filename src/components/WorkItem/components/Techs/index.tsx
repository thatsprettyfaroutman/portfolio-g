import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import BorderedGrid from '@/components/BorderedGrid'
import Tech from './components/Tech'
import { TTech } from '@/contentful/types'
import { MiniHeading } from '@/components/Text'

type TTechsProps = { children: TTech[] }

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 4);
`

const Items = styled(BorderedGrid)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--col) * 4, var(--maxCol) * 2.5), 1fr)
  );
`

export default function Techs({ children, ...restProps }: TTechsProps) {
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
