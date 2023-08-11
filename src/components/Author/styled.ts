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
  }
`

export const ProfilePictureTargetArea = styled.div`
  width: var(--maxCol);
  aspect-ratio: 1;
  background-color: #f0f;
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
  box-shadow: 0px 0px 200px 60px #000000;
  opacity: 0.5;
  background: linear-gradient(
    -135deg,
    ${palette.accent[2].darken(4)} 10%,
    ${palette.main.background.bottom} 90%
  );
  cursor: pointer;
  user-select: none;

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
