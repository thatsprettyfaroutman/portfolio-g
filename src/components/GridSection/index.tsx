import styled from 'styled-components'
import { templateCols } from '@/styles/grid'
import { MEDIA } from '@/styles/media'

const GridSection = styled.section`
  display: grid;
  grid-row-gap: var(--col);
  max-width: var(--maxWidth);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--col);
  padding-right: var(--col);
  border: 1px solid #f0f8;

  ${MEDIA.tablet} {
    grid-template-columns: ${templateCols(-2)};
  }
`

export default GridSection
