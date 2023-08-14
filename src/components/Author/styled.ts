'use client'

import styled from 'styled-components'
import { palette } from '@/styles/theme'
import ProfilePicture from '@/components/ProfilePicture'
import { SmallMarkdown, Heading4 } from '@/components/Text'

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
  background-color: ${palette.main.background.bottom.alpha(0.7)};
  z-index: 1;
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
  align-items: center;
  gap: calc(var(--maxCol) / 4);
  width: calc(var(--maxCol) * 4);
  max-width: calc(100vw - var(--maxCol));
  box-sizing: border-box;
  padding: calc(var(--maxCol) / 2);
  border-radius: 8px;
  /* box-shadow: 0px 0px 200px 60px #000000; */
  background: linear-gradient(
    -135deg,
    ${palette.accent[2].darken(4)} 10%,
    ${palette.main.background.bottom} 90%
  );
  cursor: pointer;
  user-select: none;
  z-index: 1;

  > ${ProfilePictureTargetArea} {
    width: calc(var(--maxCol) * 2);
  }

  > div > ${Heading4} {
    text-align: center;
  }

  > div > ${SmallMarkdown} {
    margin-right: calc(var(--maxCol) / -8);
  }
`

export const CloseButton = styled.div`
  position: absolute;
  top: calc(var(--maxCol) / 4);
  right: calc(var(--maxCol) / 4);
  width: calc(var(--maxCol) / 8);
  height: calc(var(--maxCol) / 8);
  cursor: pointer;

  ::before,
  ::after {
    top: 50%;
    content: ' ';
    position: absolute;
    width: inherit;
    height: 1px;
    transform: rotate(45deg);
    background-color: ${palette.main.text};
  }

  ::after {
    transform: rotate(-45deg);
  }
`
