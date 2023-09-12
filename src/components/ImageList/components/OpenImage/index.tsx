import { type CSSProperties, useState, useRef, useEffect } from 'react'
import { useDrag } from '@use-gesture/react'
import lerp from 'lerp'
import Image from 'next/image'
import {
  type SpringValue,
  type Interpolation,
  type TransitionState,
  a,
  useSpringValue,
  to,
} from 'react-spring'
import styled, { createGlobalStyle } from 'styled-components'
import { TRichAsset } from '@/contentful/types'
import useCssVariable from '@/hooks/useCssVariable'
import { MEDIA } from '@/styles/media'
import Spinner from '../Spinner'

const LOADING_SCALE = 0.9

type TOpenImageProps = {
  children: TRichAsset
  style?: CSSProperties
  xProgress: SpringValue<number> | Interpolation<number, number>
  showProgress: SpringValue<number> | Interpolation<number, number>
  opacity: SpringValue<number> | Interpolation<number, number>
  onChangeImage: (direction: number) => () => void
  onCloseImage: () => void
  phase: TransitionState['phase']
}

type TVector2 = [number, number]

const BodyTouchActionLock = createGlobalStyle`
  body {
    touch-action: none;
    user-select: none;
    overflow: hidden;

    ${MEDIA.tablet} {
      overflow: initial;
    }
  }
`

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  user-select: none;
  touch-action: none;
`

const DragWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  will-change: transform, opacity;
  touch-action: none;
  user-select: none;

  > img,
  > video {
    position: absolute;
    top: var(--fluidSpace);
    left: var(--fluidSpace);
    width: calc(100% - var(--fluidSpace) * 2);
    height: calc(100% - var(--fluidSpace) * 2);
    object-fit: contain;
    touch-action: none;
    user-select: none;
    pointer-events: none;
  }

  ${MEDIA.tablet} {
    > img,
    > video {
      top: var(--space);
      left: var(--space);
      width: calc(100% - var(--space) * 2);
      height: calc(100% - var(--space) * 2);
    }
  }
`

const Placeholder = styled.img`
  transform: scale(${LOADING_SCALE});
`

const CustomSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--space);
  height: var(--space);
  transform: translate(-50%, -50%);
  touch-action: none;
  user-select: none;

  > svg > path {
    // Adjust stroke width to match navigation icons
    // (spinnerWidth / --space) x 2
    // Using js since calc doesn't seem to work with stroke-width
    stroke-width: ${(20 / 70) * 2}px;
  }
`

const ADragWrapper = a(DragWrapper)
const AImage = a(Image)

// Helper function to multiply two vectors
const multiplyVector2 = (v0: TVector2, v1: TVector2): TVector2 => [
  v0[0] * v1[0],
  v0[1] * v1[1],
]

export default function OpenImage({
  children,
  opacity,
  xProgress,
  showProgress,
  onChangeImage,
  onCloseImage,
  phase,
  ...restProps
}: TOpenImageProps) {
  const space = useCssVariable('--space')
  const [loading, setLoading] = useState(true)
  const x = useSpringValue(0)
  const y = useSpringValue(0)
  const loadingSpring = useSpringValue(loading ? 1 : 0)

  useEffect(() => {
    loadingSpring.start(loading ? 1 : 0)
  }, [loading, loadingSpring])

  const flick = ([mx, my]: TVector2, [vx, vy]: TVector2) => {
    x.start(mx, {
      config: {
        velocity: vx,
        decay: true,
      },
    })
    y.start(my, {
      config: {
        velocity: vy,
        decay: true,
      },
    })
  }

  const bindDrag = useDrag(({ event, down, movement: [mx, my], velocity }) => {
    event.preventDefault()
    x.set(mx)
    y.set(my)

    if (!down) {
      const dx = Math.sign(mx)
      const dy = Math.sign(my)
      const flickVelocity = multiplyVector2([dx, dy], velocity)

      // Handle horizontal movement
      // Change image when enough horizontal movement
      if (Math.abs(mx) > window.innerWidth * 0.5) {
        flick([mx, my], flickVelocity)
        onChangeImage(-dx)()
        return
      }

      // Handle vertical movement
      // Close image when enough vertical movement
      if (Math.abs(my) > window.innerHeight * 0.25) {
        flick([mx, my], flickVelocity)
        onCloseImage()
        return
      }

      // Handle horizontal flick
      // Change image
      if (velocity[0] > 1 && dx !== 0) {
        flick([mx, my], flickVelocity)
        onChangeImage(-dx)()
        return
      }

      // Handle vertical flick
      // Close image
      if (velocity[1] > 1 && dy !== 0) {
        flick([mx, my], flickVelocity)
        onCloseImage()
        return
      }

      // Movement stopped, cancel action
      x.start(0)
      y.start(0)
    }
  })

  const dragWrapperStyle = {
    opacity,
    x: to([xProgress, x], (p, x) => p * space + x),
    y,
  }

  const assetStyle = {
    scale: to(
      [showProgress, loadingSpring],
      (p, loadingP) => lerp(0.95, 1, p) * lerp(1, LOADING_SCALE, loadingP)
    ),
  }

  // Handle the case where user swipes to next image and quickly swipes back
  const lastPhase = useRef<TransitionState['phase'] | undefined>()
  useEffect(() => {
    if (lastPhase.current === 'leave') {
      x.start(0, { config: { velocity: 0, decay: false } })
      y.start(0, { config: { velocity: 0, decay: false } })
    }
    lastPhase.current = phase
  }, [phase, x, y])

  useEffect(() => {
    if (children.contentType.includes('video')) {
      setLoading(false)
    }
  }, [children.contentType])

  return (
    <Wrapper {...restProps} {...bindDrag()}>
      <BodyTouchActionLock />
      <ADragWrapper style={dragWrapperStyle}>
        {children.placeholder && (
          <Placeholder
            width={children.width}
            height={children.height}
            src={children.placeholder}
            alt=""
          />
        )}
        {children.contentType.includes('image') ? (
          <AImage
            src={children.url}
            width={children.width}
            height={children.height}
            alt={children.title}
            loading="eager"
            onLoad={() => {
              setLoading(false)
            }}
            style={assetStyle}
          />
        ) : (
          <a.video
            src={children.url}
            muted
            autoPlay
            loop
            playsInline
            controls={false}
            style={assetStyle}
          />
        )}
        {loading && <CustomSpinner />}
      </ADragWrapper>
    </Wrapper>
  )
}
