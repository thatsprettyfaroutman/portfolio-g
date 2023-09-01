import { useCallback, useEffect, useRef, useState } from 'react'
import { a, useSpring, to } from '@react-spring/three'
import {
  MeshDiscardMaterial,
  useTexture,
  useVideoTexture,
} from '@react-three/drei'
import { type ThreeEvent, useThree, extend } from '@react-three/fiber'
import lerp from 'lerp'
import clamp from 'ramda/src/clamp'
import last from 'ramda/src/last'
import {
  Group,
  Mesh,
  PlaneGeometry,
  MeshPhysicalMaterial,
  Vector2,
  NearestFilter,
  Texture,
  DoubleSide,
} from 'three'
import { usePalette, palette } from '@/styles/theme'
import MouseOrbiter from '@/three/components/MouseOrbiter'
import { useThreeContext } from '@/three/context'
import { VideoCardCube } from './geometries/VideoCardCube'
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
  iconMapSrc: string
  backMap?: Texture
}

const useContainSize = (width: number, height: number) => {
  const { size } = useThree()
  const aspect = width / height
  const sizeAspect = size.width / size.height
  if (sizeAspect < aspect) {
    if (width > size.width) {
      return { width: size.width, height: size.width / aspect }
    }
  } else {
    if (height > size.height) {
      return { width: size.height * aspect, height: size.height }
    }
  }

  return { width, height }
}

export default function VideoCard({
  src,
  width: widthProp = 300,
  height: heightProp = 200,
  depth = 4,
  iconMapSrc,
  backMap,
  ...restProps
}: TCardProps) {
  const [flipCount, setFlipCount] = useState(0)
  const { width, height } = useContainSize(widthProp, heightProp)
  const { inView, inViewSpring } = useThreeContext()
  const ambientLightColor = usePalette(palette.main.background.bottom)

  // Maps
  const map = useVideoTexture(src, { start: false })
  map.minFilter = NearestFilter
  map.magFilter = NearestFilter
  const iconMap = useTexture(iconMapSrc)

  const mouseRef = useRef({
    hover: 0,
    position: new Vector2(0),
  })

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

  // console.log('VID', last(src.split('/')), 'first')

  return (
    <group {...restProps}>
      <ambientLight color={ambientLightColor} intensity={0.25} />
      <a.directionalLight
        color={ambientLightColor}
        position-z={600}
        // @ts-ignore hmm, should be okay
        // intensity={inViewSpring.to((p) => lerp(10, 0.8, p))}
        intensity={0.8}
      />

      <a.mesh
        // position-z={-400}
        position-z={to([flipSpringWobbly, inViewSpring], (flipP, inViewP) => {
          const flip = Math.sin(Math.abs(flipP % 1) * Math.PI) * -160
          const view = lerp(-200, -490, 1 - inViewP)
          return view + flip
        })}
        position-y={-20}
        // rotation-y={flipSpring.to((p) => lerp(0, Math.PI, p % 2))}
        scale-x={flipSpring.to((p) =>
          clamp(0.05, 1, 1 - Math.abs(Math.sin(p * Math.PI)))
        )}
      >
        <planeGeometry args={[width * 1.25, height * 1.25]} />
        <meshStandardMaterial map={shadowMap} transparent side={DoubleSide} />
      </a.mesh>

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
          <VideoCardCube>
            <VideoCardPhysicalMaterial
              map={map}
              width={width}
              height={height}
              iconMap={iconMap}
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
          </VideoCardCube>
        </a.group>
      </MouseOrbiter>
    </group>
  )
}
