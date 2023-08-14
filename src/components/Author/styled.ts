'use client'

import styled from 'styled-components'
import { palette } from '@/styles/theme'
import ProfilePicture from '@/components/ProfilePicture'
import { SmallMarkdown } from '@/components/Text'

export const Wrapper = styled.div`
  position: relative;

  > ${ProfilePicture} {
    position: absolute;
    top: 0;
    right: 0;
    width: var(--maxCol);
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

  ::after {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${palette.main.background.bottom};
    opacity: 0.96;
  }
`

export const ProfilePictureTargetArea = styled.div`
  width: var(--maxCol);
  aspect-ratio: 1;
`

export const CollapsedContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: calc(var(--maxCol) / 4);
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
  align-items: start;
  gap: calc(var(--maxCol) / 4);
  width: calc(var(--maxCol) * 4);
  max-width: calc(100vw - var(--minCol) * 2);
  box-sizing: border-box;
  padding: calc(var(--maxCol) / 2);
  border-radius: 8px;

  cursor: pointer;
  user-select: none;
  z-index: 1;

  > ${ProfilePictureTargetArea} {
    width: calc(var(--maxCol) * 2);
  }

  > div > ${SmallMarkdown} {
    margin-right: calc(var(--maxCol) / -16);
  }
`
