'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import Spline, { type SplineProps } from '@splinetool/react-spline'
import { type SPEObject } from '@splinetool/runtime'
import lerp from 'lerp'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from 'react-merge-refs'
import { useSpringValue } from 'react-spring'
import useMeasure from 'react-use-measure'
import Spinner from './components/Spinner'
import { Wrapper } from './styled'

const DEG = Math.PI / 180

const HELLO_SIZE = { width: 320, height: 230 }

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
type TSplineApplication = Parameters<
  WithRequired<SplineProps, 'onLoad'>['onLoad']
>[0]

export default function Hero() {
  const [inViewRef, inView] = useInView()
  const [measureRef, bounds] = useMeasure({ debounce: 1000 })
  const [loading, setLoading] = useState(true)
  const spline = useRef<TSplineApplication>()

  const light = useRef<SPEObject>()
  const hello = useRef<SPEObject>()
  const lightInitialPosition = useRef({ x: 0, y: 0, z: 0 })
  const mouse = useRef({
    position: { x: 0, y: 0 },
    percentual: { x: 0, y: 0 },
    normal: { x: 0, y: 0 },
  })
  const helloHover = useSpringValue(0)

  const handleLoad = useCallback((splineApp: TSplineApplication) => {
    const children = splineApp.getAllObjects()
    if (!children.length) {
      return
    }

    spline.current = splineApp
    light.current = splineApp.findObjectByName('Directional Light 2')
    hello.current = splineApp.findObjectByName('HelloWrapper')

    if (light.current) {
      lightInitialPosition.current.x = light.current.position.x
      lightInitialPosition.current.y = light.current.position.y
      lightInitialPosition.current.z = light.current.position.z
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    if (!inView || !bounds.width || !bounds.height) {
      return
    }

    const helloSize = {
      percentual: {
        width: HELLO_SIZE.width / bounds.width,
        height: HELLO_SIZE.height / bounds.height,
      },
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.x + window.scrollX - bounds.x
      const y = e.y + window.scrollY

      const { position, normal, percentual } = mouse.current

      position.x = x
      position.y = y

      // Percentual position
      percentual.x = (x / bounds.width) * 2 - 1
      percentual.y = (y / bounds.height) * 2 - 1

      // Normalized position
      const length = Math.sqrt(
        percentual.x * percentual.x + percentual.y * percentual.y
      )
      normal.x = percentual.x / length
      normal.y = percentual.y / length

      // Hello text hover
      const closeToHello =
        Math.abs(percentual.x) < helloSize.percentual.width &&
        Math.abs(percentual.y) < helloSize.percentual.height

      if (closeToHello && helloHover.goal !== 1) {
        helloHover.start(1)
      } else if (!closeToHello && helloHover.goal !== 0) {
        helloHover.start(0)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [inView, bounds.width, bounds.height, bounds.x, helloHover])

  useEffect(() => {
    let running = inView && !loading

    const moveLight = () => {
      const l = light.current
      if (l) {
        const hoverAlpha = helloHover.get()
        const distance = 10000
        const x = lerp(l.position.x, mouse.current.normal.x * distance, 0.9)
        const hoverX = 0
        const y = lerp(l.position.y, mouse.current.normal.y * -distance, 0.3)
        const hoverY = distance
        const z = lightInitialPosition.current.z
        const hoverZ = 2000
        l.position.x = lerp(x, hoverX, hoverAlpha)
        l.position.y = lerp(y, hoverY, hoverAlpha)
        l.position.z = lerp(z, hoverZ, hoverAlpha)
      }
    }

    const rotateText = () => {
      const h = hello.current
      if (h) {
        const xAngle = lerp(0, 5 * DEG, mouse.current.percentual.y)
        const yAngle = lerp(0, 8 * DEG, mouse.current.percentual.x)
        h.rotation.x = lerp(h.rotation.x, xAngle, 0.1)
        h.rotation.y = lerp(h.rotation.y, yAngle, 0.1)
      }
    }

    const tick = () => {
      if (!running) {
        return
      }
      moveLight()
      rotateText()

      requestAnimationFrame(tick)
    }

    tick()

    return () => {
      running = false
    }
  }, [loading, inView, bounds.width, bounds.height, helloHover])

  useEffect(() => {
    const logo = document.querySelector('body > .logo')
    if (logo) {
      logo.remove()
    }
  }, [])

  return (
    <Wrapper ref={mergeRefs([inViewRef, measureRef])}>
      <Spline
        className="spline"
        scene="https://prod.spline.design/pckIsy7c140jE3pV/scene.splinecode"
        onLoad={handleLoad}
      />
      {loading && <Spinner />}
    </Wrapper>
  )
}
