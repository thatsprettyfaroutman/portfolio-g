import { css } from 'styled-components'

export const gridVars = css`
  --maxWidth: 1400px;
  --cols: 20;
  --colP: calc(100 / var(--cols));
  --maxCol: calc(var(--maxWidth) / var(--cols));
  --minCol: 30px;
  --col: clamp(var(--minCol), var(--maxCol), calc(var(--colP) * 1vw));
`

/**
 * @deprecated
 */
export const templateCols = (amount?: number) => {
  let cols = `var(--cols)`
  if (amount && amount > 0) {
    cols = `${amount}`
  }
  if (amount && amount < 0) {
    cols = `calc(var(--cols) - ${Math.abs(amount)})`
  }
  return css`
    repeat(${cols}, 1fr);
  `
}
