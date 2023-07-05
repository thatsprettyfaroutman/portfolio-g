'use client'

import styled from 'styled-components'

const Intro = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;

  > * > .three {
    height: 800px;
    border-radius: 8px;

    @media (max-width: 1024px) {
      height: 540px;
    }
  }
`

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Intro,
}
