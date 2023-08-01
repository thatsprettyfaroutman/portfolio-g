import Image from 'next/image'
import styled from 'styled-components'
import { TClient } from '@/contentful/types'
import { MEDIA } from '@/styles/media'
import { SmallParagraph } from '@/components/Text'

type TClientProps = {
  children: TClient
}

const Wrapper = styled.div`
  ${MEDIA.tablet} {
    grid-column: 1 / 8;
  }
  display: grid;
  grid-gap: calc(var(--maxCol) / 4);
`

const Logo = styled(Image)`
  display: block;
  margin: 0;
`

export default function Client({ children, ...restProps }: TClientProps) {
  return (
    <Wrapper {...restProps}>
      <Logo src={children.logoMap.url} alt="" width={40} height={40} />
      <SmallParagraph>{children.name}</SmallParagraph>
    </Wrapper>
  )
}
