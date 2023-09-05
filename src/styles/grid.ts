import { css } from 'styled-components'

export const gridVars = css`
  --maxWidth: 1400px;
  --cols: 18;
  --colP: calc(100 / var(--cols));
  --space: calc(var(--maxWidth) / var(--cols));
  --minCol: 30px;
  --fluidSpace: clamp(var(--minCol), var(--space), calc(var(--colP) * 1vw));
`
