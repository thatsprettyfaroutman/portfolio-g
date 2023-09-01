import Image from 'next/image'
import styled from 'styled-components'
import { SmallParagraph, MiniHeading } from '@/components/Text'
import { TClient } from '@/contentful/types'

type TClientProps = {
  children: TClient
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: calc(var(--space) / 4);
  /* align-items: end; */
  align-items: center;

  > ${MiniHeading} {
    grid-column: 1 / -1;
  }
`

const Logo = styled(Image)`
  display: block;
  margin: 0;
`

function Client({ children, ...restProps }: TClientProps) {
  return (
    <Wrapper {...restProps}>
      <MiniHeading>Client</MiniHeading>
      <Logo src={children.logoMap.url} alt="" width={40} height={40} />
      <SmallParagraph>{children.name}</SmallParagraph>
    </Wrapper>
  )
}

// Make Client usable inside styled-components
export default styled(Client)``
