import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import Text from '@/components/Text'

type TTldrProps = PropsWithChildren

const Wrapper = styled(Text.MediumParagraphBlock)`
  ${MEDIA.tablet} {
    grid-column: 1 / 9;
  }

  /* ${MEDIA.desktop} {
    grid-column: 1 / 9;
  } */

  /* ${MEDIA.desktopWide} {
    grid-column: 1 / 7;
  } */
`

export default function Tldr({ children, ...restProps }: TTldrProps) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <Wrapper {...restProps}>
      {items.map((child, i) => (
        <Text.MediumParagraph key={i}>{child}</Text.MediumParagraph>
      ))}
    </Wrapper>
  )
}
