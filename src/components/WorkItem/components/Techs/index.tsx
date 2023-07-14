import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import BorderedGrid from '@/components/BorderedGrid'
import Tech, { type TTechProps } from './components/Tech'

type TTechsProps = { children: Omit<TTechProps, 'updateBordersKey'>[] }

const Wrapper = styled(BorderedGrid)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--col) * 4, var(--maxCol) * 2.5), 1fr)
  );

  ${MEDIA.tablet} {
    grid-column: 1 / -1;
  }

  ${MEDIA.desktop} {
    grid-column: 1 / 10;
  }
`

export default function Techs({ children, ...restProps }: TTechsProps) {
  return (
    <Wrapper {...restProps}>
      {children.map((tech) => (
        <Tech key={tech.name} {...tech} />
      ))}
    </Wrapper>
  )
}
