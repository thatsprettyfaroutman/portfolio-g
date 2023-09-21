import { useCallback, useEffect, useRef, useState } from 'react'
import { a, useSpring, to } from '@react-spring/three'
import {
  MeshDiscardMaterial,
  useTexture,
  useVideoTexture,
} from '@react-three/drei'
import { type ThreeEvent, extend } from '@react-three/fiber'
import lerp from 'lerp'
import clamp from 'ramda/src/clamp'
import {
  Group,
  Mesh,
  PlaneGeometry,
  MeshPhysicalMaterial,
  Vector2,
  NearestFilter,
  DoubleSide,
} from 'three'
import { useColor } from '@/styles/theme'
import MouseOrbiter from '@/three/components/MouseOrbiter'
import { useThreeContext } from '@/three/context'
import { VideoCardBox } from './geometries/VideoCardBox'
import useBackMap from './hooks/useBackMap'
import useContainSize from './hooks/useContainSize'
import VideoCardPhysicalMaterial from './materials/VideoCardPhysicalMaterial'
import shadowNormal from './textures/shadow-normal.png'

extend({
  Group,
  Mesh,
  MeshPhysicalMaterial,
})

// Recycled Geometries
const PLANE_GEOMETRY = new PlaneGeometry()

export type TCardProps = {
  width?: number
  height?: number
  depth?: number
  src: string
  backText?: string
}

/**
 * This component renders a 3d video card using @react-three/fiber.
 */
export default function VideoCard({
  src,
  width: widthProp = 300,
  height: heightProp = 200,
  depth = 4,
  backText,
  ...restProps
}: TCardProps) {
  const [flipCount, setFlipCount] = useState(0)
  const { width, height } = useContainSize(widthProp, heightProp)
  const { inView, inViewSpring, mousePresent } = useThreeContext()
  const ambientLightColor = useColor('main-bg')
  const mouseRef = useRef({
    hover: 0,
    position: new Vector2(0),
  })

  // Maps
  const map = useVideoTexture(src, { start: false })
  map.minFilter = NearestFilter
  map.magFilter = NearestFilter

  const backMap = useBackMap(
    {
      text: backText,
      width,
      height,
      padding: 40,
    },
    [inView, mousePresent]
  )

  // Card flipping animation
  const { p: flipSpring } = useSpring({ p: flipCount })
  const { p: flipSpringWobbly } = useSpring({
    config: { friction: 30 },
    p: flipCount,
  })
  const handleCardFlip = useCallback((e?: ThreeEvent<MouseEvent>) => {
    const dir = (e && Math.sign(e.uv!.x - 0.5)) || 1
    setFlipCount((s) => s + dir)
  }, [])

  useEffect(() => {
    if (!inView && flipCount % 2 !== 0) {
      handleCardFlip()
    }
  }, [inView, flipCount, handleCardFlip])

  // Play video textures when in view
  useEffect(() => {
    if (inView && flipCount % 2 === 0) {
      map.source.data.play?.()
    } else {
      map.source.data.pause?.()
    }
  }, [inView, flipCount, map])

  const shadowMap = useTexture(shadowNormal.src)

  return (
    <group {...restProps}>
      <ambientLight color={ambientLightColor} intensity={0.25} />
      <directionalLight
        color={ambientLightColor}
        position-z={600}
        intensity={0.82}
      />

      {/* Shadow mesh */}
      <a.mesh
        position-z={to([flipSpringWobbly, inViewSpring], (flipP, inViewP) => {
          const flip = Math.sin(Math.abs(flipP % 1) * Math.PI) * -160
          const view = lerp(-200, -490, 1 - inViewP)
          return view + flip
        })}
        position-y={-20}
        scale-x={flipSpring.to((p) =>
          clamp(0.05, 1, 1 - Math.abs(Math.sin(p * Math.PI)))
        )}
      >
        <planeGeometry args={[width * 1.25, height * 1.25]} />
        <meshStandardMaterial map={shadowMap} transparent side={DoubleSide} />
      </a.mesh>

      {/* Card */}
      <MouseOrbiter
        hoverWidth={width + 20}
        hoverHeight={height + 20}
        moveAmount={20}
        hideCursor
      >
        <mesh
          // Hover mesh
          geometry={PLANE_GEOMETRY}
          scale-x={width}
          scale-y={height}
          onClick={handleCardFlip}
          onPointerEnter={() => {
            mouseRef.current.hover = 1
          }}
          onPointerMove={(e) => {
            mouseRef.current.position.x = e.uv!.x
            mouseRef.current.position.y = e.uv!.y
          }}
          onPointerLeave={() => {
            mouseRef.current.hover = 0
          }}
        >
          <MeshDiscardMaterial />
        </mesh>

        <a.group
          // This group flips the card on click
          rotation-y={flipSpring.to((p) => lerp(0, Math.PI, p % 2))}
          position-z={to([flipSpringWobbly, inViewSpring], (flipP, inViewP) => {
            const flip = Math.sin(Math.abs(flipP % 1) * Math.PI) * 160
            const view = (1 - inViewP) * -300
            return flip + view
          })}
          scale={[width, height, depth]}
        >
          <VideoCardBox>
            <VideoCardPhysicalMaterial
              map={map}
              width={width}
              height={height}
              mouseRef={mouseRef}
            />
            <VideoCardPhysicalMaterial
              backside
              map={map}
              width={width}
              height={height}
              mouseRef={mouseRef}
              overlayMap={backMap}
            />
          </VideoCardBox>
        </a.group>
      </MouseOrbiter>
    </group>
  )
}
