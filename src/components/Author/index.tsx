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
  CustomMarkdown,
} from './styled'

// TODO: 3d card that pops fluidly

type TAuthorProps = {
  children: TAuthor
}

// Animated versions of components
const AShade = a(Shade)
const ACollapsedContent = a(CollapsedContent)
const AExpandedContent = a(ExpandedContent)

export default function Author({ children, ...restProps }: TAuthorProps) {
  const { isOpen, toggle, style, expandedContentRef, profilePictureDelta } =
    useAuthor()

  return (
    <Wrapper {...restProps}>
      <AShade style={style.shade} onClick={toggle} />

      <ACollapsedContent style={style.collapsedContent}>
        <Paragraph onClick={toggle}>{children.name.split(' ')[0]}</Paragraph>
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
          <CustomMarkdown>{children.bio}</CustomMarkdown>
        </AnimateChildren>
      </AExpandedContent>

      {/*
         A flying profile picture! It flies between `ProfilePictureTargetAreas` based on `isOpen`-state.
      */}
      <Magnet
        disabled={isOpen}
        onClick={toggle}
        style={{
          left: style.profilePicture.offset.x,
          top: style.profilePicture.offset.y,
        }}
      >
        <CustomProfilePicture
          photo={children.photo}
          // @ts-ignore
          style={style.profilePicture}
        />
      </Magnet>
    </Wrapper>
  )
}
