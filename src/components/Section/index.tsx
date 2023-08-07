import styled from 'styled-components'

const Section = styled.section`
  display: grid;
  grid-row-gap: calc(var(--maxCol) / 2);
  max-width: var(--maxWidth);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--col);
  padding-right: var(--col);
`

export default Section
