import styled from 'styled-components'
import { MediumParagraph } from '@/components/Text'
import { MEDIA } from '@/styles/media'
import { palette } from '@/styles/theme'

export const Wrapper = styled.div``

export const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: calc(var(--space) / 8);

  > a {
    position: relative;
    display: block;

    > img {
      position: relative;
      display: block;
      margin: 0;
      border-radius: 4px;
      box-shadow: 0 calc(var(--space) / 8) calc(var(--space) / 8)
        ${palette.main.text.alpha(0.15)};
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
export const Shade = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${palette.shade.background};
  z-index: 1;
  user-select: none;
`

// TODO: move Controls to it's own component
export const Controls = styled.div`
  position: fixed;
  top: calc(var(--space) / 1.5);
  right: 0;
  left: 0;
  height: 0;
  z-index: 1;
  user-select: none;

  ${MEDIA.tablet} {
    top: 50%;
    bottom: auto;
  }

  > div {
    position: absolute;
    width: calc(var(--space) / 1.5);
    height: calc(var(--space) / 1.5);
    top: 0;
    left: 0;
    transform: translateY(-50%);
    cursor: pointer;

    :not(:first-child) {
      left: auto;
      right: calc(var(--fluidSpace) / 2);
    }

    // Show last child only on mobile. (It's the close button.)
    :not(:last-child) {
      display: none;
    }

    // On tablet and bigger show arrows and hide the close button.
    ${MEDIA.tablet} {
      width: var(--space);
      height: var(--space);
      :not(:last-child) {
        display: block;
      }
      :not(:first-child) {
        right: 0;
      }
      :last-child {
        display: none;
      }
    }
  }
`

export const ImageTitle = styled(MediumParagraph)`
  position: fixed;
  pointer-events: none;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${palette.shade.text};
  z-index: 1;
  text-align: center;
  padding: var(--fluidSpace);

  ${MEDIA.tablet} {
    padding: calc(var(--space) / 2) var(--space);
  }
`
