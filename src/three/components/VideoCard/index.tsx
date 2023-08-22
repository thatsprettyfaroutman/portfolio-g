import {
  Group,
  Mesh,
  BoxGeometry,
  PlaneGeometry,
  MeshPhysicalMaterial,
  Vector2,
  NearestFilter,
  Texture,
} from 'three'
import { useEffect, useRef, useState } from 'react'
import { type ThreeEvent, useThree, extend } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three'
import {
  MeshDiscardMaterial,
  useTexture,
  useVideoTexture,
} from '@react-three/drei'
import lerp from 'lerp'
import { usePalette, palette } from '@/styles/theme'
import MouseOrbiter from '@/three/components/MouseOrbiter'
import { useThreeContext } from '@/three/context'
import VideoCardPhysicalMaterial from './materials/VideoCardPhysicalMaterial'

extend({
  Group,
  Mesh,
  MeshPhysicalMaterial,
})

// Recycled Geometries
const BOX_GEOMETRY = new BoxGeometry()
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
  depth = 8,
  iconMapSrc,
  backMap,
  ...restProps
}: TCardProps) {
  const [cardFlipCount, setFlipCount] = useState(0)
  const { width, height } = useContainSize(widthProp, heightProp)
  const { inView } = useThreeContext()

  // Colors
  const edgeColor = usePalette(palette.main.background.top.brighten(3))

  // Maps
  const map = useVideoTexture(src, { start: false })
  map.minFilter = NearestFilter
  map.magFilter = NearestFilter
  const iconMap = useTexture(iconMapSrc)

  const mouseRef = useRef({
    hover: 0,
    position: new Vector2(0),
  })

  // Play video textures when in view
  useEffect(() => {
    if (inView && cardFlipCount % 2 === 0) {
      map.source.data.play?.()
    } else {
      map.source.data.pause?.()
    }
  }, [inView, cardFlipCount, map])

  // Card flipping animation
  const { p: flipSpring } = useSpring({ p: cardFlipCount })
  const { p: flipSpringWobbly } = useSpring({
    config: { friction: 30 },
    p: cardFlipCount,
  })
  const handleCardFlip = (e: ThreeEvent<MouseEvent>) => {
    const dir = Math.sign(e.uv!.x - 0.5) || 1
    setFlipCount((s) => s + dir)
  }

  return (
    <group {...restProps}>
      <MouseOrbiter
        speed={0.1}
        hoverWidth={width + 16}
        hoverHeight={height + 16}
        moveAmount={16}
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
          // This group rotates (flips) on click
          rotation-y={flipSpring.to((p) => lerp(0, Math.PI, p % 2))}
          position-z={flipSpringWobbly.to(
            (p) => Math.sin(Math.abs(p % 1) * Math.PI) * -160
          )}
          scale={[width, height, depth]}
        >
          <mesh rotation-y={Math.PI * -0.5} geometry={BOX_GEOMETRY}>
            <VideoCardPhysicalMaterial
              attach="material-0"
              map={map}
              width={width}
              height={height}
              iconMap={iconMap}
              mouseRef={mouseRef}
            />

            <VideoCardPhysicalMaterial
              attach="material-1"
              backside
              map={map}
              width={width}
              height={height}
              mouseRef={mouseRef}
              overlayMap={backMap}
            />

            {/* TODO: color edges */}
            <meshBasicMaterial attach="material-2" color={edgeColor} />
            <meshBasicMaterial attach="material-3" color={edgeColor} />
            <meshBasicMaterial attach="material-4" color={edgeColor} />
            <meshBasicMaterial attach="material-5" color={edgeColor} />
          </mesh>
        </a.group>
      </MouseOrbiter>
    </group>
  )
}
