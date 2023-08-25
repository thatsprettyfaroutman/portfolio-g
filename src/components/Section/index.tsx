import styled from 'styled-components'

const Section = styled.section`
  display: grid;
  grid-row-gap: calc(var(--space) / 2);
  width: 100%;
  max-width: var(--maxWidth);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--fluidCol);
  padding-right: var(--fluidCol);
  box-sizing: border-box;
`

export default Section
