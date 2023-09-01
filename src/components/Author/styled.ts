'use client'

import styled from 'styled-components'
import ProfilePicture from '@/components/ProfilePicture'
import { Heading4, SmallMarkdown } from '@/components/Text'
import { palette } from '@/styles/theme'

export const Wrapper = styled.div`
  position: relative;

  > ${ProfilePicture} {
    position: absolute;
    top: 0;
    right: 0;
    width: var(--space);
    pointer-events: none;
    transform-origin: 0 0;
    z-index: 1;
  }
`

export const Shade = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  /* ::after {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${palette.shade.background.alpha(0.5)};
  } */
`

export const ProfilePictureTargetArea = styled.div`
  width: var(--space);
  aspect-ratio: 1;
`

export const CollapsedContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: calc(var(--space) / 4);
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  z-index: 1;
`

export const ExpandedContent = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--space) / 4);
  width: calc(100vw - var(--fluidSpace) * 2);
  max-width: calc(var(--space) * 5);
  box-sizing: border-box;
  padding: calc(var(--space) / 2);
  color: ${palette.shade.text};

  cursor: pointer;
  user-select: none;
  z-index: 1;

  * {
    color: inherit;
  }

  > ${ProfilePictureTargetArea} {
    width: calc(var(--space) * 2);
  }

  > div > ${Heading4} {
    text-align: center;
  }

  > div > ${SmallMarkdown} {
    margin-right: calc(var(--space) / -16);
  }
`

export const ExpandedContentBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 12px;
  background-color: ${palette.shade.background};
`
