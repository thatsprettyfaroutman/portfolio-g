'use client'

import { FC } from 'react'
import styled, { keyframes } from 'styled-components'
import { Wrapper as MagnetWrapper } from '@/components/Magnet'
import ProfilePicture from '@/components/ProfilePicture'
import { Heading4, Markdown, SmallListItem, Paragraph } from '@/components/Text'
import { MEDIA } from '@/styles/media'
import { palette } from '@/styles/theme'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: var(--space);
  animation-name: ${keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `};
  animation-duration: 0.5s;
  animation-fill-mode: backwards;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;

  ${MagnetWrapper} {
    position: absolute;
    top: 0;
    left: 0;
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
    background-color: ${palette.shade.background};
  }

  ${MEDIA.tablet} {
    ::after {
      content: none;
    }
  }
`

export const ProfilePictureTargetArea = styled.div`
  width: var(--space);
  aspect-ratio: 1;
`

export const CustomProfilePicture = styled(ProfilePicture)`
  width: var(--space);
  pointer-events: none;
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
  user-select: none;
  z-index: 1;

  > ${Paragraph} {
    cursor: pointer;
  }

  ${MEDIA.tablet} {
    justify-content: end;
  }
`

export const ExpandedContent = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--space) / 2);
  width: calc(100vw - var(--fluidSpace) * 2);
  box-sizing: border-box;
  padding: calc(var(--space) / 2);
  padding-bottom: var(--space);
  color: ${palette.panel.text};

  cursor: pointer;
  user-select: none;
  z-index: 1;

  * {
    color: inherit;
  }

  > ${ProfilePictureTargetArea} {
    width: calc(var(--space) * 3);
  }

  > div > ${Heading4} {
    text-align: center;
  }

  ${MEDIA.tablet} {
    max-width: calc(var(--space) * 5);
  }
`

export const ExpandedContentBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 8px;

  ${MEDIA.tablet} {
    background: linear-gradient(
      135deg,
      ${palette.panel.background},
      ${palette.panel.backgroundAlt}
    );
    box-shadow: 0 calc(var(--space) / 8) calc(var(--space) / 8)
      ${palette.main.text.alpha(0.15)};
  }
`

export const CustomMarkdown = styled(Markdown).attrs((props) => ({
  components: {
    ...props.components,
    p: Paragraph as FC,
    h1: Heading4 as FC,
    h2: Heading4 as FC,
    h3: Heading4 as FC,
    li: SmallListItem as FC,
  },
}))`
  margin-right: calc(var(--space) / -8);
  gap: calc(var(--space) / 2);

  strong {
    color: ${palette.panel.text};
  }

  ul {
    display: grid;
    grid-gap: calc(var(--space) / 8);
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      list-style: none;
    }

    li > em {
      font-style: normal;
      font-size: 12px;
      color: ${palette.panel.text.alpha(0.7)};
    }
  }
`
