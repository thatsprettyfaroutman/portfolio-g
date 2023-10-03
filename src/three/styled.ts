'use client'

import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  touch-action: pan-y;
`

export const Loading = styled.div<{ $timeOffset: number; $playing?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  max-width: 100%;
  aspect-ratio: 2/3;
  background-color: var(--color-hero-bg);
  transform-origin: 50% 50%;
  transform: translate(-50%, -50%) scale(0.95);
  color: var(--color-hero-bg-up-200);

  display: flex;
  justify-content: center;
  align-items: center;

  ::after {
    content: ' ';
    width: calc(var(--space) / 2);
    height: calc(var(--space) / 2);
    border: 2px solid var(--color-main-text);
    border-radius: 50%;
    border-right-color: transparent;
    border-bottom-color: transparent;

    animation-name: ${keyframes`
      0% {
        transform: rotate3d(0, 0, 1, -45deg);
      }
      100% {
        transform: rotate3d(0, 0, 1, 315deg);
      }
    `};
    animation-duration: 1s;
    animation-iteration-count: ${(p) =>
      p.$playing === false ? 5 : 'infinite'};
    animation-timing-function: ease-in-out;
    animation-delay: ${(p) => -(p.$timeOffset % 1000)}ms;
  }
`
