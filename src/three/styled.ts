'use client'

import styled, { keyframes, css } from 'styled-components'

const animationFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale3d(0.8, 0.8, 1);
  }
  100% {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale3d(0.7, 0.7, 1);
  }
`

const animationSpin = keyframes`
  0% {
    transform: rotate3d(0, 0, 1, -45deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 315deg);
  }
`

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
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(p) =>
    p.$playing === false &&
    css`
      animation-name: ${animationFadeOut};
      animation-duration: 320ms;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
      animation-fill-mode: both;
    `};

  ::after {
    content: ' ';
    width: calc(var(--space) / 2);
    height: calc(var(--space) / 2);
    border: 2px solid var(--color-main-text);
    border-radius: 50%;
    border-right-color: transparent;
    border-bottom-color: transparent;
    animation-name: ${animationSpin};
    animation-duration: 1s;
    animation-iteration-count: ${(p) =>
      p.$playing === false ? 2 : 'infinite'};
    animation-timing-function: ease-in-out;
    animation-delay: ${(p) => -(p.$timeOffset % 1000)}ms;
  }
`
