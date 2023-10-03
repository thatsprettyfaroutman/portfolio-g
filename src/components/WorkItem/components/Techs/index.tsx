import { a, useSpring, useSpringValue } from 'react-spring'
import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'
import { TTech } from '@/contentful/types'
import useElementOffset from '@/hooks/useElementOffset'
import { MEDIA } from '@/styles/media'
import Tech from './components/Tech'

type TTechsProps = { children: TTech[] }

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--space) / 4);
`

const Items = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: calc(var(--space) / 8);

  ${MEDIA.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${MEDIA.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const AItems = a(Items)

function Techs({ children, ...restProps }: TTechsProps) {
  const { ref: itemsRef, offset } = useElementOffset()

  const [spring, springApi] = useSpring(() => ({
    x: 0,
    y: 0,
  }))

  const hovering = useSpringValue(0)

  const handleMouse = (e: MouseEvent) => {
    const x = e.clientX - offset.x + window.scrollX
    const y = e.clientY - offset.y + window.scrollY

    const entered = e.type === 'mouseenter'
    const left = e.type === 'mouseleave'

    springApi.start({
      x,
      y,
      immediate: entered,
    })

    if (entered) {
      hovering.start(1)
    } else if (left) {
      hovering.start(0)
    }
  }

  return (
    <Wrapper {...restProps}>
      <MiniHeading>Tech</MiniHeading>
      <AItems
        ref={itemsRef}
        onMouseEnter={handleMouse}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouse}
        style={{
          '--bg-hover': hovering,
          '--bg-mouse-x': spring.x.to((x) => `${x}px`),
          '--bg-mouse-y': spring.y.to((y) => `${y}px`),
        }}
      >
        {children.map((tech) => (
          <Tech key={tech.sys.id} name={tech.name} iconSrc={tech.icon.url} />
        ))}
      </AItems>
    </Wrapper>
  )
}

// Make Techs usable inside styled-components
export default styled(Techs)``
