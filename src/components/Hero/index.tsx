'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import Spline, { type SplineProps } from '@splinetool/react-spline'
import { type SPEObject } from '@splinetool/runtime'
import lerp from 'lerp'
import { useInView } from 'react-intersection-observer'
import Arrow from '@/components/Arrow'
import Spinner from './components/Spinner'
import { Wrapper } from './styled'

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
type TSplineApplication = Parameters<
  WithRequired<SplineProps, 'onLoad'>['onLoad']
>[0]

export default function Hero() {
  const [inViewRef, inView] = useInView()
  const [loading, setLoading] = useState(true)
  const spline = useRef<TSplineApplication>()
  const camera = useRef<SPEObject>()
  const light = useRef<SPEObject>()
  const hello = useRef<SPEObject>()
  const world = useRef<SPEObject>()
  const mouse = useRef({
    position: { x: 0, y: 0 },
    percentual: { x: 0, y: 0 },
    normal: { x: 0, y: 0 },
  })

  const handleLoad = useCallback((splineApp: TSplineApplication) => {
    const children = splineApp.getAllObjects()
    if (!children.length) {
      return
    }
    spline.current = splineApp
    camera.current = splineApp.findObjectByName('Camera')
    light.current = splineApp.findObjectByName('Directional Light 2')
    hello.current = splineApp.findObjectByName('HelloWrapper')
    world.current = splineApp.findObjectByName('Text')
    setLoading(false)
  }, [])

  useEffect(() => {
    const logo = document.querySelector('body > .logo')
    if (logo) {
      logo.remove()
    }
  }, [])

  useEffect(() => {
    let running = inView && !loading
    const tick = () => {
      if (!running) {
        return
      }

      const l = light.current
      if (l) {
        l.position.x = lerp(l.position.x, mouse.current.normal.x * 10000, 0.9)
        l.position.y = lerp(l.position.y, mouse.current.normal.y * -10000, 0.3)
      }

      const h = hello.current
      if (h) {
        h.rotation.x = lerp(
          h.rotation.x,
          mouse.current.percentual.y * 0.125,
          0.1
        )
        h.rotation.y = lerp(
          h.rotation.y,
          mouse.current.percentual.x * 0.125,
          0.1
        )
      }

      requestAnimationFrame(tick)
    }

    tick()

    return () => {
      running = false
    }
  }, [loading, inView])

  useEffect(() => {
    if (!inView) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = e

      mouse.current.position.x = x + window.scrollX
      mouse.current.position.y = y + window.scrollY
      mouse.current.percentual.x = (x / window.innerWidth) * 2 - 1
      mouse.current.percentual.y = (y / window.innerHeight) * 2 - 1

      const length = Math.sqrt(
        mouse.current.percentual.x * mouse.current.percentual.x +
          mouse.current.percentual.y * mouse.current.percentual.y
      )
      mouse.current.normal.x = mouse.current.percentual.x / length
      mouse.current.normal.y = mouse.current.percentual.y / length
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [inView])

  return (
    <Wrapper ref={inViewRef}>
      <Spline
        className="spline"
        scene="https://prod.spline.design/pckIsy7c140jE3pV/scene.splinecode"
        onLoad={handleLoad}
      />
      <Arrow />

      {loading && <Spinner />}
    </Wrapper>
  )
}
