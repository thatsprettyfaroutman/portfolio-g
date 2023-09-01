import styled from 'styled-components'

const Section = styled.section`
  display: grid;
  grid-row-gap: calc(var(--space) / 2);
  width: 100%;
  max-width: var(--maxWidth);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--fluidSpace);
  padding-right: var(--fluidSpace);
  box-sizing: border-box;
`

export default Section
