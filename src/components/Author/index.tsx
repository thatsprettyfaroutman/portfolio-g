'use client'

import { type PropsWithChildren, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { type SpringValue, a, useSpringValue } from 'react-spring'
import useMeasure from 'react-use-measure'
import { useInView } from 'react-intersection-observer'
import clamp from 'ramda/src/clamp'
import lerp from 'lerp'
import { palette } from '@/styles/theme'
import { TAuthor } from '@/contentful/types'
import ProfilePicture from '@/components/ProfilePicture'
import {
  SmallMarkdown,
  SmallParagraph,
  Paragraph,
  Heading4,
} from '@/components/Text'
import FancyBorder, {
  Wrapper as FancyBorderWrapper,
} from '@/components/FancyBorder'

// TODO: Hover follow effect
// TODO: Clean up
// TODO: 3d card that pops fluidly
// TODO: click to close, or X-button

type TAuthorProps = {
  children: TAuthor
}

const Wrapper = styled.div`
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

const ProfilePictureTarget = styled.div`
  width: var(--maxCol);
  aspect-ratio: 1;
`

const Clicker = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding: 20px 40px; */
  gap: 20px;
  /* width: 160px; */
  /* width: 80px; */
  box-sizing: border-box;

  > ${ProfilePicture} {
    width: 80px;
  }

  /* background: linear-gradient(
    135deg,
    ${palette.accent[2].darken(3)} 10%,
    ${palette.main.background.bottom} 90%
  ); */
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  > ${FancyBorderWrapper} {
    top: 10px;
    left: 10px;
  }
`

const Popper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 300px;
  box-sizing: border-box;
  padding: 40px;
  /* z-index: 1; */
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

  > ${ProfilePictureTarget} {
    width: calc(var(--maxCol) * 2);
  }

  > div > ${Heading4} {
    text-align: center;
  }

  > div > ${SmallMarkdown} {
    margin-right: -10px;
  }
`

const AClicker = a(Clicker)
const APopper = a(Popper)
const AProfilePicture = a(ProfilePicture)

const AnimChilds = ({
  showing,
  ...restProps
}: PropsWithChildren<{ showing: SpringValue<number> }>) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const originalOnChange = showing.defaultProps.onChange

    const children = Array.from(
      ref.current.querySelectorAll('h1, h2, h3, h4, h5, h6, p')
    ) as HTMLElement[]

    const handleChange = (p: number) => {
      const pn = children.length * p
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        const childP = clamp(0, 1, pn - i)
        child.style.opacity = childP.toString()
        child.style.transform = `translate3d(0, ${10 * (1 - childP)}px, 0)`
      }
    }

    showing.defaultProps.onChange = (...args) => {
      originalOnChange?.(...args)
      const p = args[0] as unknown as number
      handleChange(p)
    }

    handleChange(showing.goal)

    return () => {
      showing.defaultProps.onChange = originalOnChange
    }
  }, [showing])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 'inherit' }}
      ref={ref}
      {...restProps}
    />
  )
}

const MEASURE_OPTIONS = { debounce: 120 }

export default function Author({ children, ...restProps }: TAuthorProps) {
  const [profilePictureClosedRef, profilePictureClosedBounds] =
    useMeasure(MEASURE_OPTIONS)
  const [profilePictureOpenRef, profilePictureOpenBounds] =
    useMeasure(MEASURE_OPTIONS)

  const [inViewRef, inView] = useInView({ threshold: 0.75 })
  const popperRef = useRef<HTMLDivElement>(null)

  const openScrollRef = useRef(null as [from: number, to: number] | null)

  const open = useSpringValue(0)
  const openWobbly = useSpringValue(0, {
    config: { friction: 15 },
    onChange: (p) => {
      if (!openScrollRef.current) {
        return
      }
      const [a, b] = openScrollRef.current
      window.scrollTo(window.scrollX, lerp(a, b, p as unknown as number))
    },
  })
  const openDelay = useSpringValue(0, {
    config: {
      tension: 100,
    },
  })

  const clickerStyle = {
    // x: open.to((p) => p * -10),
    // y: open.to((p) => p * -10),
    opacity: open.to((p) => 1 - p),
    pointerEvents: open.to((p) => (p > 0.5 ? 'none' : undefined)),
  }

  const popperStyle = {
    // x: open.to((p) => (1 - p) * 10),
    // y: open.to((p) => (1 - p) * 10),
    opacity: open,
    pointerEvents: open.to((p) => (p < 0.5 ? 'none' : undefined)),
  }

  const profilePictureStyle = {
    x: open.to(
      (p) => (profilePictureOpenBounds.x - profilePictureClosedBounds.x) * p
    ),
    y: openWobbly.to(
      (p) => (profilePictureOpenBounds.y - profilePictureClosedBounds.y) * p
    ),
    scale: open.to(
      (p) =>
        (profilePictureOpenBounds.width / profilePictureClosedBounds.width -
          1) *
          p +
        1
    ),
  }

  const handleToggle = () => {
    if (open.goal === 0) {
      // console.log(popperRef.current.getBoundingClientRect().y, window.scrollY)

      const profilePictureYMin =
        popperRef.current!.getBoundingClientRect().y - 20

      if (profilePictureYMin < 0) {
        openScrollRef.current = [
          window.scrollY,
          window.scrollY + profilePictureYMin,
        ]
      }
      open.start(1)
      openWobbly.start(1)
      setTimeout(() => openDelay.start(1), 500)
    } else {
      openScrollRef.current = null
      open.start(0)
      openWobbly.start(0)
      openDelay.start(0)
    }
  }

  useEffect(() => {
    if (!inView) {
      openScrollRef.current = null
      open.start(0)
      openWobbly.start(0)
      openDelay.start(0)
    }
  }, [inView, open, openWobbly, openDelay])

  return (
    <Wrapper ref={inViewRef} {...restProps}>
      <AClicker onClick={handleToggle} style={clickerStyle}>
        <Paragraph>{children.name.split(' ')[0]}</Paragraph>
        <ProfilePictureTarget ref={profilePictureClosedRef} />
        {/* <FancyBorder /> */}
      </AClicker>
      <APopper ref={popperRef} onClick={handleToggle} style={popperStyle}>
        {/* <ProfilePicture src={children.photo.url} /> */}
        <ProfilePictureTarget ref={profilePictureOpenRef} />
        <AnimChilds showing={openDelay}>
          <Heading4>{children.name}</Heading4>
          <SmallMarkdown>{children.bio}</SmallMarkdown>
        </AnimChilds>
        {/* <FancyBorder /> */}
      </APopper>
      <AProfilePicture src={children.photo.url} style={profilePictureStyle} />
    </Wrapper>
  )
}
