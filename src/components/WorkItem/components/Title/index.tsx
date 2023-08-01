import { type PropsWithChildren, type ReactNode } from 'react'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import { Heading2, BigParagraph, Paragraph } from '@/components/Text'

type TTitleProps = PropsWithChildren<{
  startDate?: string
  endDate?: string
  altTitle?: ReactNode
}>

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 8);
  align-items: baseline;

  ${MEDIA.tablet} {
    grid-column: 1 / 10;
  }
`

export default function Title({
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
      {altTitle && <BigParagraph>{`"${altTitle}"`}</BigParagraph>}
      {(startDate || endDate) && (
        <Paragraph>
          {[startDateYear, endDateYear].filter(Boolean).join(' - ')}
        </Paragraph>
      )}
    </Wrapper>
  )
}
