'use client'

import { a } from 'react-spring'
import AnimateChildren from '@/components/AnimateChildren'
import Magnet from '@/components/Magnet'
import { Paragraph, Heading4 } from '@/components/Text'
import { TAuthor } from '@/contentful/types'
import useAuthor from './hooks/useAuthor'
import {
  Wrapper,
  Shade,
  ProfilePictureTargetArea,
  CustomProfilePicture,
  CollapsedContent,
  ExpandedContent,
  ExpandedContentBackground,
  Body,
} from './styled'

// TODO: Hover follow effect
// TODO: 3d card that pops fluidly
// TODO: click to close, or X-button

type TAuthorProps = {
  children: TAuthor
}

// Animated versions of components
const AShade = a(Shade)
const ACollapsedContent = a(CollapsedContent)
const AExpandedContent = a(ExpandedContent)
const AProfilePictureMagnet = a(Magnet)

export default function Author({ children, ...restProps }: TAuthorProps) {
  const { isOpen, toggle, style, expandedContentRef, profilePictureDelta } =
    useAuthor()

  return (
    <Wrapper {...restProps}>
      <AShade style={style.shade} onClick={toggle} />

      <ACollapsedContent onClick={toggle} style={style.collapsedContent}>
        <Paragraph>{children.name.split(' ')[0]}</Paragraph>
        <ProfilePictureTargetArea ref={profilePictureDelta.fromRef} />
      </ACollapsedContent>

      <AExpandedContent
        ref={expandedContentRef}
        onClick={toggle}
        style={style.expandedContent}
      >
        <ProfilePictureTargetArea ref={profilePictureDelta.toRef} />
        <AnimateChildren showing={isOpen}>
          <ExpandedContentBackground className="animate" />
          <Heading4>{children.name}</Heading4>
          <Body>{children.bio}</Body>
        </AnimateChildren>
      </AExpandedContent>

      {/*
         The flying profile picture. It flies between `ProfilePictureTargetAreas` based on `open`. Its positioned to the same position as `CollapsedContent.ProfilePictureTargetArea`, but it's not a child of it because it needs to be positioned relative to the entire Author component, not just the `CollapsedContent`.
      */}
      <AProfilePictureMagnet disabled={isOpen} onClick={toggle}>
        <CustomProfilePicture
          photo={children.photo}
          // @ts-ignore
          style={style.profilePicture}
        />
      </AProfilePictureMagnet>
    </Wrapper>
  )
}
