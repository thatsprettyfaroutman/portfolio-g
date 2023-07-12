import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { MEDIA } from '@/styles/media'
import Tech, { type TTechProps } from './components/Tech'

type TTechsProps = { children: Omit<TTechProps, 'updateBordersKey'>[] }

const Wrapper = styled.div`
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
  const [ref, bounds] = useMeasure({ debounce: 320 })
  return (
    <Wrapper ref={ref} {...restProps}>
      {children.map((tech) => (
        <Tech key={tech.name} updateBordersKey={bounds.width} {...tech} />
      ))}
    </Wrapper>
  )
}
