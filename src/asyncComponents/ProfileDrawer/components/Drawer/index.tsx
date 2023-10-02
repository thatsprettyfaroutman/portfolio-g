import { type ReactNode } from 'react'
import { a } from 'react-spring'
import AnimateChildren from '@/components/AnimateChildren'
import { Heading4 } from '@/components/Text'
import { TAuthor } from '@/contentful/types'
import Toggle from '../Toggle'
import useDrawer from './hooks/useDrawer'
import {
  Wrapper,
  BodyScrollLock,
  Shade,
  SliderWrapper,
  Slider,
  Content,
  CustomMarkdown,
  ProfilePicture,
  LargeProfilePicture,
  Flier,
  Close,
} from './styled'

type TDrawerProps = { profile: TAuthor; children?: ReactNode }

const AShade = a(Shade)
const ASlider = a(Slider)
const AFlier = a(Flier)
const AClose = a(Close)

/**
 * This component renders a drawer that slides in from the right and displays profile information.
 */

export default function Drawer({
  profile,
  children,
  ...restProps
}: TDrawerProps) {
  const {
    toggle,
    openSpring,
    open,
    contentRef,
    flierFromRef,
    flierToRef,
    flierStyle,
  } = useDrawer()

  return (
    <Wrapper {...restProps}>
      {open && <BodyScrollLock />}
      <AShade
        onClick={() => toggle(false)}
        style={{
          opacity: openSpring,
          pointerEvents: open ? undefined : 'none',
        }}
      />
      <SliderWrapper
        ref={contentRef}
        style={{
          pointerEvents: open ? undefined : 'none',
        }}
      >
        <ASlider
          style={{
            x: openSpring.to([0, 1], ['100%', '0%']),
          }}
        >
          <AnimateChildren showing={open} reverseAnimationOrder>
            <Content>
              <LargeProfilePicture
                ref={flierToRef}
                src={profile.photo.url}
                width={160}
                height={160}
                alt={profile.photo.title}
              />
              <Heading4>{profile.name}</Heading4>
              <CustomMarkdown>{profile.bio}</CustomMarkdown>
            </Content>
          </AnimateChildren>
          {children}
        </ASlider>
      </SliderWrapper>

      <Toggle onClick={toggle}>
        <ProfilePicture
          ref={flierFromRef}
          src={profile.photo.url}
          width={80}
          height={80}
          alt={profile.photo.title}
        />
        <AClose
          style={{
            opacity: openSpring,
            scale: openSpring,
          }}
        />
      </Toggle>

      <AFlier style={flierStyle}>
        <LargeProfilePicture
          src={profile.photo.url}
          width={160}
          height={160}
          alt={profile.photo.title}
        />
      </AFlier>
    </Wrapper>
  )
}
