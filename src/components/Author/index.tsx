'use client'

import { a } from 'react-spring'
import AnimateChildren from '@/components/AnimateChildren'
import Magnet from '@/components/Magnet'
import ProfilePicture from '@/components/ProfilePicture'
import { SmallMarkdown, Paragraph, Heading4 } from '@/components/Text'
import { TAuthor } from '@/contentful/types'
import useAuthor from './hooks/useAuthor'
import {
  Wrapper,
  Shade,
  ProfilePictureTargetArea,
  CollapsedContent,
  ExpandedContent,
  ExpandedContentBackground,
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
const AProfilePicture = a(ProfilePicture)
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
        <AnimateChildren showing={isOpen} reverseAnimationOrder>
          <ExpandedContentBackground className="animate" />
          <Heading4>{children.name}</Heading4>
          <SmallMarkdown>{children.bio}</SmallMarkdown>
        </AnimateChildren>
      </AExpandedContent>

      {/*
         The flying profile picture. It flies between `ProfilePictureTargetAreas` based on `open`. Its positioned to the same position as `CollapsedContent.ProfilePictureTargetArea`, but it's not a child of it because it needs to be positioned relative to the entire Author component, not just the `CollapsedContent`.
      */}
      <AProfilePictureMagnet
        disabled={isOpen}
        onClick={toggle}
        // style={{ x: style.profilePicture.x, y: style.profilePicture.y }}
      >
        <AProfilePicture
          src={children.photo.url}
          // style={{
          //   scale: style.profilePicture.scale,
          // }}
          style={style.profilePicture}
        />
      </AProfilePictureMagnet>
    </Wrapper>
  )
}
