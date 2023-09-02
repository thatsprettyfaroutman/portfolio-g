import {
  type PropsWithChildren,
  type MouseEventHandler,
  type CSSProperties,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react'
import { useSpring, a, config } from 'react-spring'
import styled from 'styled-components'
import useCssVariable from '@/hooks/useCssVariable'

type TMagnetProps = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLSpanElement>
  disabled?: boolean
  moveAmountFactor?: number
  style?: CSSProperties
}>

export const Wrapper = styled.span`
  position: relative;
  display: block;

  > span {
    display: block;
  }
`

const MagnetArea = styled.span`
  position: absolute;
  display: block;
  top: calc(var(--space) * -1);
  right: calc(var(--space) * -1);
  bottom: calc(var(--space) * -1);
  left: calc(var(--space) * -1);
`

export default function Magnet({
  children,
  disabled = false,
  moveAmountFactor = 0.25,
  onClick,
  ...restProps
}: TMagnetProps) {
  const [mouseOver, setMouseOver] = useState(false)
  const moveAmount = useCssVariable('--space') * moveAmountFactor
  const ref = useRef<HTMLSpanElement>(null)
  const bounds = useRef<DOMRect | null>(null)

  const [spring, springApi] = useSpring(() => ({
    x: 0,
    y: 0,
  }))

  const handleEnd = useCallback(() => {
    setMouseOver(false)
    springApi.start({
      x: 0,
      y: 0,
      config: config.molasses,
    })
  }, [springApi])

  const handleMove: MouseEventHandler<HTMLSpanElement> = (e) => {
    if (!bounds.current) {
      return
    }
    const x =
      ((e.nativeEvent.x - bounds.current.x) / bounds.current.width) * 2 - 1
    const y =
      ((e.nativeEvent.y - bounds.current.y) / bounds.current.height) * 2 - 1
    const distance = Math.hypot(x, y)

    if (distance > 1) {
      return handleEnd()
    }

    setMouseOver(true)

    const angle = Math.atan2(x, y)
    springApi.start({
      x: Math.sin(angle) * distance * moveAmount,
      y: Math.cos(angle) * distance * moveAmount,
      config: config.default,
    })
  }
  const handleStart: MouseEventHandler<HTMLSpanElement> = (e) => {
    bounds.current = ref.current?.getBoundingClientRect() ?? null
    handleMove(e)
  }

  useEffect(() => {
    if (disabled) {
      handleEnd()
    }
  }, [disabled, handleEnd])

  return (
    <Wrapper
      {...restProps}
      style={{
        pointerEvents: disabled ? 'none' : undefined,
        ...restProps.style,
      }}
    >
      <a.span style={spring}>{children}</a.span>
      {!disabled && (
        <MagnetArea
          ref={ref}
          onMouseEnter={handleStart}
          onMouseMove={handleMove}
          onMouseLeave={handleEnd}
          onClick={(...params) => {
            mouseOver && onClick?.(...params)
          }}
          style={{
            cursor: onClick && mouseOver ? 'pointer' : undefined,
          }}
        />
      )}
    </Wrapper>
  )
}
