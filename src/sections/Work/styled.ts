'use client'

import styled from 'styled-components'

// TODO: remove styled.ts file
// TODO: rename to Wrapper

const Work = styled.section`
  display: grid;
  grid-gap: 256px;
`

const WorkItems = styled.div`
  display: grid;
  justify-items: center;
  grid-gap: 256px;
`

const WorkItem = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 32px;
  max-width: 1600px;
  padding: 0 64px;
  padding-right: 16px;
  align-items: center;
  user-select: none;

  /* > .three { */
  /* width: 464px; */
  /* width: 100%; */
  /* max-width: 464px; */
  /* height: ${
    // card height + card extra bottom padding + some safe space
    600 + 64 + 64
  }px; */
  /* } */

  > .content {
    padding: 0;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
    padding: 0;

    > .three {
      /* justify-self: center; */
    }

    > .content {
      padding: 0 32px;

      > h1,
      > h2 {
        text-align: left;
        margin-top: 0;
        /* text-align: center; */
      }
    }
  }
`

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Work,
  WorkItems,
  WorkItem,
}
