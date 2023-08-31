import styled from 'styled-components'
import { palette } from '@/styles/theme'

export const Wrapper = styled.div``

export const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: calc(var(--space) / 4);

  > a {
    position: relative;
    display: inline-block;

    ::before {
      content: ' ';
      position: absolute;
      top: calc(var(--space) / 16);
      left: calc(var(--space) / 16);
      width: 100%;
      height: 100%;
      border: 1px solid ${palette.main.text};
      border-top: none;
      border-left: none;
    }

    > img {
      position: relative;
      display: block;
      margin: 0;
    }

    /* Spinner */
    > svg {
      position: absolute;
      bottom: calc(var(--space) / 16);
      right: calc(var(--space) / 16);
      width: calc(var(--space) / 4);
      height: calc(var(--space) / 4);
    }
  }
`

export const OpenImage = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;

  > img {
    position: absolute;
    top: calc(var(--space) / 2);
    left: calc(var(--space) / 2);
    width: calc(100% - var(--space));
    height: calc(100% - var(--space));
    object-fit: contain;
  }

  /* Spinner */
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--space);
    height: var(--space);
    transform: translate(-50%, -50%);
  }
`

export const Shade = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* TODO: theme color */
  background-color: #0004;
  z-index: 1;
  user-select: none;
`

export const Controls = styled.div`
  position: fixed;
  top: 50%;
  height: var(--space);
  right: 0;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
  user-select: none;

  > div {
    position: absolute;
    width: var(--space);
    height: 100%;
    top: 50%;
    left: 0;
    cursor: pointer;
    background-color: ${palette.main.background.top};

    :last-child {
      left: auto;
      right: 0;
    }
  }
`
