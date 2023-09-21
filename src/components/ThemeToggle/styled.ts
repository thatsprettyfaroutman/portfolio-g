'use client'

import styled, { css, keyframes } from 'styled-components'

export const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 20px;
  border: 2px solid var(--color-main-text);
  border-radius: 10px;
`

export const SwitchButton = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background-color: var(--color-main-text);
  will-change: transform;
`

export const Wrapper = styled.div<{ $loading?: boolean }>`
  display: flex;
  text-align: center;
  justify-content: start;
  align-items: center;
  gap: calc(var(--space) / 6);
  text-transform: capitalize;
  cursor: pointer;
  min-width: 130px;
  min-height: calc(var(--space) / 1.5);
  animation-name: ${keyframes`
    0% { opacity: 0.1; }
    100% { opacity: 1; }
  `};
  animation-duration: 200ms;
  animation-fill-mode: backwards;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;

  ${(p) =>
    p.$loading &&
    css`
      animation-name: ${keyframes`
        0% { opacity: 0; }
        100% { opacity: 0.1; }
      `};
      animation-fill-mode: forwards;
    `};
`
