'use client'

import { a } from 'react-spring'
import { TAuthor } from '@/contentful/types'
import ProfilePicture from '@/components/ProfilePicture'
import { SmallMarkdown, Paragraph, Heading4 } from '@/components/Text'
import AnimateChildren from '@/components/AnimateChildren'
import useAuthor from './hooks/useAuthor'
import {
  Wrapper,
  ProfilePictureTargetArea,
  CollapsedContent,
  ExpandedContent,
} from './styled'

// TODO: Hover follow effect
// TODO: 3d card that pops fluidly
// TODO: click to close, or X-button

type TAuthorProps = {
  children: TAuthor
}

// Animated versions of components
const ACollapsedContent = a(CollapsedContent)
const AExpandedContent = a(ExpandedContent)
const AProfilePicture = a(ProfilePicture)

export default function Author({ children, ...restProps }: TAuthorProps) {
  const { open, handleToggle, style, expandedContentRef, profilePictureDelta } =
    useAuthor()

  return (
    <Wrapper {...restProps}>
      <ACollapsedContent onClick={handleToggle} style={style.collapsedContent}>
        <Paragraph>{children.name.split(' ')[0]}</Paragraph>
        <ProfilePictureTargetArea ref={profilePictureDelta.fromRef} />
      </ACollapsedContent>

      <AExpandedContent
        ref={expandedContentRef}
        onClick={handleToggle}
        style={style.expandedContent}
      >
        <ProfilePictureTargetArea ref={profilePictureDelta.toRef} />
        <AnimateChildren showing={open} reverseAnimationOrder>
          <Heading4>{children.name}</Heading4>
          <SmallMarkdown>{children.bio}</SmallMarkdown>
        </AnimateChildren>
      </AExpandedContent>

      {/*
         The flying profile picture. It flies between `ProfilePictureTargetAreas` based on `open`. Its positioned to the same position as `CollapsedContent.ProfilePictureTargetArea`, but it's not a child of it because it needs to be positioned relative to the entire Author component, not just the `CollapsedContent`.
      */}
      <AProfilePicture src={children.photo.url} style={style.profilePicture} />
    </Wrapper>
  )
}
