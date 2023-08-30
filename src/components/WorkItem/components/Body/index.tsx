import styled from 'styled-components'
import ImageList from '@/components/ImageList'
import { MiniHeading } from '@/components/Text'
import RichText, { TRichTextProps } from './components/RichText'

type TTldrProps = { children: TRichTextProps['children'] }

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 4);

  > ${ImageList} {
    :not(:first-child, :nth-child(2)) {
      margin-top: calc(var(--space) / 4);
    }
    :not(:last-child) {
      margin-bottom: calc(var(--space) / 4);
    }
  }
`

function Body({ children, ...restProps }: TTldrProps) {
  return (
    <Wrapper {...restProps}>
      <MiniHeading>Info</MiniHeading>
      <RichText>{children}</RichText>
    </Wrapper>
  )
}

// Make Body usable inside styled-components
export default styled(Body)``
