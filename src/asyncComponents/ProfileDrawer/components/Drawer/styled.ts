'use client'

import { FC } from 'react'
import Image from 'next/image'
import styled, { createGlobalStyle } from 'styled-components'
import { Heading4, Markdown, SmallListItem, Paragraph } from '@/components/Text'
import { MEDIA } from '@/styles/media'

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f0f;
`

export const BodyScrollLock = createGlobalStyle`
  body {
    overflow: hidden;

    ${MEDIA.tablet} {
      overflow: initial;
    }
  }
`

export const Shade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  background-color: var(--color-shade-bg-alpha-50);
`
export const SliderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;

  ${MEDIA.tablet} {
    left: calc(100vw - 400px);
    width: 400px;
  }
`

export const Slider = styled.div`
  display: grid;
  align-items: center;
  height: 100%;
  padding: calc(var(--space) / 2);
  box-sizing: border-box;
  background-color: var(--color-hero-bg);
  color: var(--color-panel-text);
  overflow: auto;
`

export const Content = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 2);
  justify-items: center;
  padding-bottom: calc(var(--space) * 2);

  ${MEDIA.tablet} {
    padding-bottom: 0;
  }
`

export const ProfilePicture = styled(Image)`
  display: block;
  object-fit: cover;
  width: var(--space);
  height: var(--space);
  border-radius: 50%;
  user-select: none;
  pointer-events: none;
  box-shadow: 0 10px 20px var(--color-main-bg);
`

export const LargeProfilePicture = styled(ProfilePicture)`
  width: calc(var(--space) * 2);
  height: calc(var(--space) * 2);
`

export const Flier = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 50% 50%;
  pointer-events: none;
`

export const Close = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--space);
  height: var(--space);
  border-radius: 50%;
  /* border: 2px solid var(--color-main-border); */
  box-sizing: border-box;
  background-color: var(--color-main-text);

  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(var(--space) / 2);
    height: 2px;
    background-color: var(--color-hero-bg);
    transform-origin: 50% 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  ::after {
    transform: translate(-50%, -50%) rotate(-45deg);
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
    color: var(--color-panel-text);
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
      color: var(--color-panel-text-alpha-70);
    }
  }
`
