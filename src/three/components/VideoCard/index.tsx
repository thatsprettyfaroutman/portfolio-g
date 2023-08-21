import {
  Group,
  Mesh,
  BoxGeometry,
  PlaneGeometry,
  MeshPhysicalMaterial,
  Color,
  Texture,
  Vector2,
  RepeatWrapping,
  NearestFilter,
} from 'three'
import { useEffect, useRef } from 'react'
import { type ThreeEvent, useThree, extend } from '@react-three/fiber'
import { a, useSpringValue } from '@react-spring/three'
import getShaderInjectors from '@/three/utils/injectShader'
import {
  MeshDiscardMaterial,
  useTexture,
  useVideoTexture,
} from '@react-three/drei'
import { usePalette, palette } from '@/styles/theme'
import MouseOrbiter from '@/three/components/MouseOrbiter'
import { useThreeContext } from '@/three/context'
import paperNormal from './textures/paper-normal.jpg'

// @ts-ignore
import fragmentPars from './shaders/pars.frag'
// @ts-ignore
import fragmentMain from './shaders/main.frag'
import lerp from 'lerp'

extend({
  Group,
  Mesh,
  MeshPhysicalMaterial,
})

// Recycled Geometries
const BOX_GEOMETRY = new BoxGeometry()
const PLANE_GEOMETRY = new PlaneGeometry()

export type TCardProps = {
  src: string
  width?: number
  height?: number
  depth?: number
  mapWidth?: number
  mapHeight?: number
  mapX?: number
  mapY?: number
  mapBorderRadius?: number
  overlayMap?: Texture
  iconMapSrc: string
  iconMapWidth?: number
  iconMapHeight?: number
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
  mapWidth,
  mapHeight,
  mapX,
  mapY,
  mapBorderRadius = 0,
  overlayMap,
  iconMapSrc,
  iconMapWidth = 40,
  iconMapHeight = 40,
  ...restProps
}: TCardProps) {
  const aspect = widthProp / heightProp
  const { width, height } = useContainSize(widthProp, heightProp)
  const { inView } = useThreeContext()

  //
  // Colors
  const backgroundColor = usePalette(palette.main.background.bottom)
  const foregroundColor = usePalette(palette.main.text)

  //
  // Maps
  const map = useVideoTexture(src, { start: false })
  map.minFilter = NearestFilter
  map.magFilter = NearestFilter
  const iconMap = useTexture(iconMapSrc)
  const roughnessMap = useTexture(paperNormal.src)
  roughnessMap.wrapS = RepeatWrapping
  roughnessMap.wrapT = RepeatWrapping
  roughnessMap.repeat.x = 4.0
  roughnessMap.repeat.y = 4.0 / aspect

  //
  // Uniforms
  const uniforms = useRef({
    uResolution: { value: new Vector2(width, height) },
    uAspect: { value: aspect },
    uMap: { value: map },
    uMapSize: {
      value: new Vector2(mapWidth ?? width, mapHeight ?? height),
    },
    uMapPosition: {
      value: new Vector2(mapX || 0, mapY || 0),
    },
    uMapBorderRadius: { value: mapBorderRadius },
    uIconMap: { value: new Texture() },
    uIconMapResolution: { value: new Vector2(iconMapWidth, iconMapHeight) },
    uIconMapColorBackground: { value: new Color(backgroundColor) },
    uIconMapColorForeground: { value: new Color(foregroundColor) },
    uMouse: { value: new Vector2(0) },
    uMouseHover: { value: 0 },
  })

  useEffect(() => {
    uniforms.current.uResolution.value.x = width
    uniforms.current.uResolution.value.y = height
    uniforms.current.uAspect.value = aspect
    uniforms.current.uMapSize.value.x = mapWidth ?? width
    uniforms.current.uMapSize.value.y = mapHeight ?? height
    uniforms.current.uMapPosition.value.x = mapX || 0
    uniforms.current.uMapPosition.value.y = mapY || 0
    if (iconMap) {
      uniforms.current.uIconMap.value = iconMap
      uniforms.current.uIconMapResolution.value.x = iconMapWidth
      uniforms.current.uIconMapResolution.value.y = iconMapHeight
    }
    uniforms.current.uIconMapColorBackground.value.set(backgroundColor)
    uniforms.current.uIconMapColorForeground.value.set(foregroundColor)
    uniforms.current.uMapBorderRadius.value = mapBorderRadius
  }, [
    aspect,
    backgroundColor,
    width,
    height,
    mapBorderRadius,
    mapHeight,
    mapWidth,
    mapX,
    mapY,
    iconMap,
    foregroundColor,
    iconMapWidth,
    iconMapHeight,
  ])

  //
  // Play video textures when in view
  useEffect(() => {
    if (inView) {
      map.source.data.play?.()
    } else {
      map.source.data.pause?.()
    }
  }, [inView, map])

  //
  // Card flipping animation
  const cardFlip = useSpringValue(0)
  const cardFlipWobbly = useSpringValue(0, {
    config: { friction: 30 },
  })
  const handleCardFlip = (e: ThreeEvent<MouseEvent>) => {
    const dir = Math.sign(e.uv!.x - 0.5) || 1
    const next = cardFlip.goal + dir
    cardFlip.start(next)
    cardFlipWobbly.start(next)
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
            uniforms.current.uMouseHover.value = 1
          }}
          onPointerMove={(e) => {
            uniforms.current.uMouse.value.x = e.uv!.x
            uniforms.current.uMouse.value.y = e.uv!.y
          }}
          onPointerLeave={() => {
            uniforms.current.uMouseHover.value = 0
          }}
        >
          <MeshDiscardMaterial />
        </mesh>

        <a.group
          // This group rotates (flips) on click
          rotation-y={cardFlip.to((p) => lerp(0, Math.PI, p % 2))}
          position-z={cardFlipWobbly.to(
            (p) => Math.sin(Math.abs(p % 1) * Math.PI) * -160
          )}
          scale={[width, height, depth]}
        >
          <mesh rotation-y={Math.PI * -0.5} geometry={BOX_GEOMETRY}>
            <meshPhysicalMaterial
              attach="material"
              map={map}
              roughnessMap={roughnessMap}
              onBeforeCompile={(shaderObject) => {
                shaderObject.uniforms = {
                  ...shaderObject.uniforms,
                  ...uniforms.current,
                }

                // Inject fragment shader code to specific positions
                const { fragment } = getShaderInjectors(shaderObject)
                fragment(
                  '#include <clipping_planes_pars_fragment>',
                  fragmentPars
                )
                fragment('#include <map_fragment>', fragmentMain)
              }}
            />
          </mesh>
        </a.group>
      </MouseOrbiter>
    </group>
  )
}
