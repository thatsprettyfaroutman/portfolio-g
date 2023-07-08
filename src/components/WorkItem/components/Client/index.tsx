import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import Text from '@/components/Text'

type TClientProps = PropsWithChildren

const Wrapper = styled.div`
  ${MEDIA.tablet} {
    grid-column: 1 / span 8;
  }
  display: grid;
  grid-gap: calc(var(--maxCol) / 4);
`

const Logo = styled.div`
  width: max(calc(var(--maxCol) / 2), calc(var(--col) * 0.75));
  aspect-ratio: 1;
  background-color: #f0f;
`

export default function Client({ children, ...restProps }: TClientProps) {
  // TODO: get logo by children? or by logoimg, maybe logoImg

  return (
    <Wrapper {...restProps}>
      <Logo />
      <Text.SmallParagraph>{children}</Text.SmallParagraph>
    </Wrapper>
  )
}
