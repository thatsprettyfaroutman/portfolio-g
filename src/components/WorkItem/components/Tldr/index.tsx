import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import { MediumMarkdown } from '@/components/Text'

const Tldr = styled(MediumMarkdown)`
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

export default Tldr
