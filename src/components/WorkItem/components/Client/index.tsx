import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import Text from '@/components/Text'

type TClientProps = PropsWithChildren<{
  name: string
  logo: string
}>

const Wrapper = styled.div`
  ${MEDIA.tablet} {
    grid-column: 1 / span 8;
  }
  display: grid;
  grid-gap: calc(var(--maxCol) / 4);
`

const Logo = styled.img`
  display: block;
  margin: 0;
  height: max(calc(var(--maxCol) / 2), calc(var(--col) * 0.75));
`

export default function Client({ name, logo, ...restProps }: TClientProps) {
  return (
    <Wrapper {...restProps}>
      <Logo src={logo} alt="" />
      <Text.SmallParagraph>{name}</Text.SmallParagraph>
    </Wrapper>
  )
}
