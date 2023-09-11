import { type PropsWithChildren, type ReactNode } from 'react'
import styled from 'styled-components'
import { Heading2, Heading4, SmallParagraph } from '@/components/Text'
import { MEDIA } from '@/styles/media'

type TTitleProps = PropsWithChildren<{
  startDate?: string
  endDate?: string
  altTitle?: ReactNode
}>

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 8);
  align-items: baseline;
  text-align: center;

  ${MEDIA.tablet} {
    grid-template-columns: auto 1fr;
    text-align: initial;
  }

  > ${Heading2} {
    grid-column: 1 / -1;
    transform: translateX(-3px);
  }
`

function Title({
  children,
  startDate,
  endDate,
  altTitle,
  ...restProps
}: TTitleProps) {
  const startDateYear = startDate && new Date(startDate).getUTCFullYear()
  const endDateYear = endDate && new Date(endDate).getUTCFullYear()

  return (
    <Wrapper {...restProps}>
      <Heading2>{children}</Heading2>
      {altTitle && <Heading4>{altTitle}</Heading4>}
      {(startDate || endDate) && (
        <SmallParagraph>
          {[startDateYear, endDateYear].filter(Boolean).join(' - ')}
        </SmallParagraph>
      )}
    </Wrapper>
  )
}

// Make Title usable inside styled-components
export default styled(Title)``
