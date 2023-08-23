import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MiniHeading, MediumMarkdown } from '@/components/Text'

type TTldrProps = PropsWithChildren

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 8);
`

function Tldr({ children, ...restProps }: TTldrProps) {
  return (
    <Wrapper {...restProps}>
      <MiniHeading>Info</MiniHeading>
      <MediumMarkdown>{children}</MediumMarkdown>
    </Wrapper>
  )
}

// Make Tldr usable inside styled-components
export default styled(Tldr)``
