import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MiniHeading, MediumMarkdown } from '@/components/Text'

type TTldrProps = PropsWithChildren

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 8);
`

export default function Tldr({ children, ...restProps }: TTldrProps) {
  return (
    <Wrapper {...restProps}>
      <MiniHeading>Tldr</MiniHeading>
      <MediumMarkdown>{children}</MediumMarkdown>
    </Wrapper>
  )
}
