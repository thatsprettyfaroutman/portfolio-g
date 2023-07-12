import { type PropsWithChildren, type ReactNode } from 'react'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import Text from '@/components/Text'

type TTitleProps = PropsWithChildren<{
  startDate?: string
  endDate?: string
  altTitle?: ReactNode
}>

const Wrapper = styled.div`
  display: grid;

  ${MEDIA.tablet} {
    grid-column: 1 / -1;
    grid-template-columns: 1fr auto;
    align-items: baseline;
  }

  ${MEDIA.desktop} {
    grid-column: 1 / 10;
  }
`

const Date = styled(Text.Paragraph)`
  grid-row: 2;
`

export default function Title({
  children,
  startDate,
  endDate,
  altTitle,
  ...restProps
}: TTitleProps) {
  const startDateYear = startDate?.split('-')[0]
  const endDateYear = endDate?.split('-')[0]

  return (
    <Wrapper {...restProps}>
      <Text.Heading2>{children}</Text.Heading2>
      {altTitle && <Text.BigParagraph>{`"${altTitle}"`}</Text.BigParagraph>}
      {(startDate || endDate) && (
        <Date>{[startDateYear, endDateYear].filter(Boolean).join(' - ')}</Date>
      )}
    </Wrapper>
  )
}
