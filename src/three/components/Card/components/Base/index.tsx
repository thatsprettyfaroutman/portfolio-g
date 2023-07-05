import * as THREE from 'three'
import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { a, useSpringValue } from '@react-spring/three'
import getShaderInjectors from '@/three/utils/injectShader'

// TODO: create useFontsReady hook
// import useFontsReady from 'hooks/useFontsReady'
import { MeshDiscardMaterial, useHelper, useTexture } from '@react-three/drei'
import { usePalette, palette } from '@/styles/theme'
import MouseOrbiter from '@/three/components/MouseOrbiter'

import Cube from '../Cube'

// @ts-ignore
import fragmentPars from '../../shaders/pars.frag'
// @ts-ignore
import fragmentMain from '../../shaders/main.frag'

import paperNormal from '../../textures/paper-normal.jpg'

// TODO: clean up this file

const LOW_POLY_PLANE = new THREE.PlaneGeometry(1, 1, 1, 1)
const EDGE_MATERIAL = new THREE.MeshStandardMaterial({ color: '#f0f' })

export type TCardProps = {
  name: string
  map: THREE.Texture
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
}

export default function Card({
  name,
  map,
  width = 400,
  height = 600,
  depth = 8,
  mapWidth,
  mapHeight,
  mapX,
  mapY,
  mapBorderRadius = 0,
  title,
  meta,
  ...restProps
}: TCardProps) {
  const aspect = width / height

  const lightRef = useRef<THREE.DirectionalLight>(null)
  useHelper(
    // @ts-ignore
    lightRef,
    THREE.DirectionalLightHelper,
    '#0ff'
  )

  const ambientLight = usePalette(palette.main.background.bottom)
  const { viewport } = useThree()
  const { dpr } = viewport

  // const fontsLoaded = true
  // const fontsLoaded = useFontsReady()

  const [titleMap, bumpMap] = useTexture(
    [`/work/${name}-title.png`, `/work/${name}-bump.png`],
    (t) => {
      // @ts-ignore
      t.forEach((x) => (x.flipY = false))
    }
  )

  const hardLightMap = useTexture(paperNormal.src, (t) => {
    const textures = Array.isArray(t) ? t : [t]

    textures.map((t) => {
      t.wrapS = THREE.RepeatWrapping
      t.wrapT = THREE.RepeatWrapping
      t.repeat.x = 3.0
      t.repeat.y = 3.0 / aspect
      t.flipY = false
    })
  })

  map.minFilter = THREE.NearestFilter
  map.magFilter = THREE.NearestFilter
  map.flipY = false

  const uniforms = useRef({
    // TODO: remove unused
    ...THREE.UniformsLib['fog'],
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(width, height) },
    uAspect: { value: aspect },
    uMap: { value: map },
    uMapSize: {
      value: new THREE.Vector2(mapWidth ?? width, mapHeight ?? height),
    },
    uMapPosition: {
      value: new THREE.Vector2(mapX || 0, mapY || 0),
    },
    uMapBorderRadius: { value: 0 },
    uOverlayMap: { value: bumpMap },
    uTitleMap: { value: titleMap },
    uMouse: { value: new THREE.Vector2(0) },
    uMouseHover: { value: 0 },
    uHardLightMap: { value: hardLightMap },
  })

  uniforms.current.uOverlayMap.value = bumpMap
  uniforms.current.uResolution.value.x = width
  uniforms.current.uResolution.value.y = height
  uniforms.current.uAspect.value = aspect
  uniforms.current.uMapSize.value.x = mapWidth ?? width
  uniforms.current.uMapSize.value.y = mapHeight ?? height
  uniforms.current.uMapPosition.value.x = mapX || 0
  uniforms.current.uMapPosition.value.y = mapY || 0
  uniforms.current.uMapBorderRadius.value = mapBorderRadius

  const flip = useSpringValue(0)

  return (
    <group {...restProps}>
      <ambientLight color={ambientLight} />
      <directionalLight
        ref={lightRef}
        color="#fff"
        position-z={600}
        position-y={200}
        intensity={0.9}
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
          geometry={LOW_POLY_PLANE}
          scale-x={width}
          scale-y={height}
          onClick={(e) => {
            const dir = Math.sign(e.uv!.x - 0.5) || 1
            flip.start(flip.goal + dir)
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
          rotation-y={flip.to((p) => THREE.MathUtils.lerp(0, Math.PI, p % 2))}
          position-z={flip.to(
            (p) => Math.sin(Math.abs(p % 1) * Math.PI) * -200
          )}
          scale={[width, height, depth]}
        >
          <Cube rotation-y={Math.PI * -0.5} edgeMaterial={EDGE_MATERIAL}>
            <meshPhysicalMaterial
              attach="material"
              map={map}
              roughnessMap={hardLightMap}
              onBeforeCompile={(shaderObject) => {
                shaderObject.uniforms = {
                  ...shaderObject.uniforms,
                  ...uniforms.current,
                }

                const { fragment } = getShaderInjectors(shaderObject)
                fragment(
                  '#include <clipping_planes_pars_fragment>',
                  fragmentPars
                )
                fragment('#include <map_fragment>', fragmentMain)
              }}
            />
          </Cube>
        </a.group>
      </MouseOrbiter>
    </group>
  )
}
