import {
  Group,
  Mesh,
  BoxGeometry,
  PlaneGeometry,
  MeshPhysicalMaterial,
  AmbientLight,
  DirectionalLight,
  // DirectionalLightHelper,
  Color,
  Texture,
  Vector2,
  RepeatWrapping,
  NearestFilter,
  UniformsLib,
  MathUtils,
} from 'three'
import { useEffect, useRef } from 'react'
import { useThree, extend } from '@react-three/fiber'
import { a, useSpringValue } from '@react-spring/three'
import getShaderInjectors from '@/three/utils/injectShader'

// TODO: create useFontsReady hook
// import useFontsReady from 'hooks/useFontsReady'
import {
  MeshDiscardMaterial,
  // useHelper,
  useTexture,
} from '@react-three/drei'
import { usePalette, palette } from '@/styles/theme'
import MouseOrbiter from '@/three/components/MouseOrbiter'

// @ts-ignore
import fragmentPars from '../../shaders/pars.frag'
// @ts-ignore
import fragmentMain from '../../shaders/main.frag'

import paperNormal from '../../textures/paper-normal.jpg'
import { useThreeContext } from '@/three/context'

extend({
  Group,
  Mesh,
  MeshPhysicalMaterial,
  DirectionalLight,
  AmbientLight,
})

// TODO: clean up this file

// Recycled Geometries
const BOX_GEOMETRY = new BoxGeometry()
const PLANE_GEOMETRY = new PlaneGeometry()

export type TCardProps = {
  name: string
  map: Texture
  width?: number
  height?: number
  depth?: number
  mapWidth?: number
  mapHeight?: number
  mapX?: number
  mapY?: number
  mapBorderRadius?: number
  title: string
  meta: string[]
  overlayMap?: Texture
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

export default function Card({
  name,
  map,
  width: widthProp = 300,
  height: heightProp = 200,
  depth = 8,
  mapWidth,
  mapHeight,
  mapX,
  mapY,
  mapBorderRadius = 0,
  title,
  meta,
  overlayMap,
  ...restProps
}: TCardProps) {
  const aspect = widthProp / heightProp
  const { width, height } = useContainSize(widthProp, heightProp)
  const { inView, inViewSpring } = useThreeContext()
  const ambientLightColor = usePalette(palette.main.background.bottom)
  const backgroundColor = ambientLightColor // usePalette(palette.accent[0])
  const textColor = usePalette(palette.main.text)

  const lightRef = useRef<DirectionalLight>(null)
  // useHelper(
  //   // @ts-ignore
  //   lightRef,
  //   DirectionalLightHelper,
  //   '#0ff'
  // )

  const hardLightMap = useTexture(paperNormal.src, (t) => {
    const textures = Array.isArray(t) ? t : [t]
    textures.map((t) => {
      t.wrapS = RepeatWrapping
      t.wrapT = RepeatWrapping
      t.repeat.x = 4.0
      t.repeat.y = 4.0 / aspect
    })
  })

  map.minFilter = NearestFilter
  map.magFilter = NearestFilter

  const uniforms = useRef({
    // TODO: remove unused
    ...UniformsLib['fog'],
    uTime: { value: 0 },
    uResolution: { value: new Vector2(width, height) },
    uAspect: { value: aspect },
    uMap: { value: map },
    uMapSize: {
      value: new Vector2(mapWidth ?? width, mapHeight ?? height),
    },
    uMapPosition: {
      value: new Vector2(mapX || 0, mapY || 0),
    },
    uMapBorderRadius: { value: 0 },
    uOverlayMap: { value: new Texture() },
    uOverlayBackgroundColor: { value: new Color() },
    uOverlayTextColor: { value: new Color() },
    // uTitleMap: { value: titleMap },
    uMouse: { value: new Vector2(0) },
    uMouseHover: { value: 0 },
    uHardLightMap: { value: hardLightMap },
  })

  useEffect(() => {
    if (overlayMap) {
      uniforms.current.uOverlayMap.value = overlayMap
    }
    uniforms.current.uOverlayBackgroundColor.value.set(backgroundColor)
    uniforms.current.uOverlayTextColor.value.set(textColor)
    uniforms.current.uResolution.value.x = width
    uniforms.current.uResolution.value.y = height
    uniforms.current.uAspect.value = aspect
    uniforms.current.uMapSize.value.x = mapWidth ?? width
    uniforms.current.uMapSize.value.y = mapHeight ?? height
    uniforms.current.uMapPosition.value.x = mapX || 0
    uniforms.current.uMapPosition.value.y = mapY || 0
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
    overlayMap,
    textColor,
  ])

  // Play video textures when in view
  useEffect(() => {
    if (inView) {
      // console.log('playing', map.source.data.src.split('/').pop())
      map.source.data.play?.()
    } else {
      // console.log('pausing', map.source.data.src.split('/').pop())
      map.source.data.pause?.()
    }
  }, [inView, map])

  const cardFlip = useSpringValue(0)

  return (
    <group {...restProps}>
      <ambientLight color={ambientLightColor} />
      <a.directionalLight
        ref={lightRef}
        color="#fff"
        position-z={600}
        // position-y={200}
        // @ts-ignore
        intensity={inViewSpring.to((p) => MathUtils.lerp(0.3, 0.9, p))}
      />

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
          onClick={(e) => {
            const dir = Math.sign(e.uv!.x - 0.5) || 1
            cardFlip.start(cardFlip.goal + dir)
          }}
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
          rotation-y={cardFlip.to((p) => MathUtils.lerp(0, Math.PI, p % 2))}
          position-z={cardFlip.to(
            (p) => Math.sin(Math.abs(p % 1) * Math.PI) * -200
          )}
          scale={[width, height, depth]}
        >
          <mesh rotation-y={Math.PI * -0.5} geometry={BOX_GEOMETRY}>
            <meshPhysicalMaterial
              attach="material"
              map={map}
              roughnessMap={hardLightMap}
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
