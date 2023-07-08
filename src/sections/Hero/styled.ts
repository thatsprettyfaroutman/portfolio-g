'use client'

import styled from 'styled-components'
import { palette } from '@/styles/theme'

// TODO: remove styled.ts file
// TODO: rename to Wrapper

const Hero = styled.section`
  position: relative;
  pointer-events: none;
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(
    ${palette.main.background.top},
    ${palette.main.background.bottom}
  );

  > .three {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default { Hero }
