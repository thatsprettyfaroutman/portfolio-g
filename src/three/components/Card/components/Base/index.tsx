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

  // const bumpCanvasRef = useRef(document.createElement('canvas'))
  // const bumpMap = useMemo(() => {
  //   const canvas = bumpCanvasRef.current
  //   canvas.width = width * dpr
  //   // canvas.height = Math.floor(canvas.width / ASPECT_RATIO);
  //   canvas.height = height * dpr

  //   canvas.style.border = '1px solid #0ff'
  //   canvas.style.width = `${width}px`
  //   canvas.style.height = 'auto'

  //   const ctx = canvas.getContext('2d')

  //   if (!ctx) {
  //     // TODO: throw error or something?
  //     return
  //   }

  //   const hMargin = 16 * dpr
  //   const vMargin = 16 * dpr
  //   const bannerWidth = canvas.width - hMargin * 2.0
  //   const bannerHeight = 64 * dpr
  //   // const bannerHeight = canvas.height - vMargin * 2.0;
  //   const bannerX = hMargin
  //   const bannerY = canvas.height - bannerHeight - vMargin
  //   // const bannerY = vMargin;
  //   const hPadding = 32 * dpr

  //   // ctx.fillStyle = "#4442";
  //   // // ctx.fillStyle = "#010A2D";
  //   // ctx.roundRect(bannerX, bannerY, bannerWidth, bannerHeight, 4 * dpr);
  //   // ctx.fill();
  //   // ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);

  //   // ctx.fillStyle = "#fff";
  //   // ctx.roundRect(
  //   //   bannerX + hPadding,
  //   //   bannerY + bannerHeight * 0.5 - hPadding,
  //   //   bannerWidth - hPadding * 2,
  //   //   hPadding * 2,
  //   //   4 * dpr
  //   // );
  //   // ctx.fill();

  //   ctx.save()
  //   ctx.fillStyle = '#888'
  //   ctx.fillRect(0, 0, canvas.width, canvas.height)
  //   ctx.restore()

  //   ctx.save()
  //   ctx.fillStyle = '#000'
  //   ctx.strokeStyle = '#fff'
  //   ctx.roundRect(
  //     bannerX + hPadding,
  //     bannerY + bannerHeight * 0.5 - hPadding,
  //     bannerWidth - hPadding * 2,
  //     hPadding * 2,
  //     4 * dpr
  //   )
  //   ctx.fill()
  //   // ctx.stroke()
  //   ctx.restore()

  //   ctx.fillStyle = '#fff'
  //   ctx.textBaseline = 'middle'

  //   // if (!canvas.isConnected) {
  //   //   document.body.prepend(canvas)
  //   //   if (canvas.nextSibling.nodeName === 'CANVAS') {
  //   //     canvas.nextSibling.remove()
  //   //   }
  //   // }

  //   ctx.font = `500 ${20 * dpr}px Blinker, sans-serif`

  //   meta.forEach((text, i) => {
  //     const textMeasure = ctx.measureText(text)
  //     const padding = 16 * dpr
  //     const hMargin = 16 * dpr
  //     const x =
  //       i === 0
  //         ? hMargin
  //         : canvas.width - textMeasure.width - padding * 2 - hMargin
  //     const y = 16 * dpr

  //     const width = padding * 2 + textMeasure.width
  //     const height = 32 * dpr

  //     ctx.save()
  //     ctx.fillStyle = '#000'
  //     ctx.strokeStyle = '#fff'
  //     ctx.roundRect(x, y, width, height, 4 * dpr)
  //     ctx.fill()
  //     // ctx.stroke()
  //     ctx.restore()
  //   })

  //   // Render texts last or they are not showng

  //   meta.forEach((text, i) => {
  //     const textMeasure = ctx.measureText(text)
  //     const padding = 16 * dpr
  //     const hMargin = 16 * dpr
  //     const x =
  //       i === 0
  //         ? hMargin
  //         : canvas.width - textMeasure.width - padding * 2 - hMargin
  //     const y = 16 * dpr
  //     const height = 32 * dpr
  //     ctx.save()
  //     ctx.fillStyle = '#fff'
  //     ctx.textBaseline = 'middle'
  //     ctx.fillText(text, x + padding, y + height * 0.5)
  //     ctx.restore()
  //   })

  //   ctx.font = `500 ${20 * dpr}px Blinker, sans-serif`

  //   const textMeasure = ctx.measureText(title)
  //   const titleX = bannerX + (bannerWidth - textMeasure.width) * 0.5
  //   const titleY = bannerY + bannerHeight * 0.5
  //   ctx.fillText(title, titleX, titleY)

  //   const texture = new THREE.CanvasTexture(canvas)
  //   texture.flipY = false
  //   return texture

  //   // eslint-disable-next-line
  // }, [fontsLoaded, title, meta.join(), width, dpr])

  // const emissiveCanvasRef = useRef(document.createElement('canvas'))
  // const emissiveMap = useMemo(() => {
  //   const canvas = emissiveCanvasRef.current
  //   canvas.width = width * dpr
  //   // canvas.height = Math.floor(canvas.width / ASPECT_RATIO);
  //   canvas.height = height * dpr

  //   canvas.style.border = '1px solid #0ff'
  //   canvas.style.width = `${width}px`
  //   canvas.style.height = 'auto'

  //   const ctx = canvas.getContext('2d')

  //   if (!ctx) {
  //     // TODO: throw error or something?
  //     return
  //   }

  //   const hMargin = 16 * dpr
  //   const vMargin = 16 * dpr
  //   const bannerWidth = canvas.width - hMargin * 2.0
  //   const bannerHeight = 64 * dpr
  //   // const bannerHeight = canvas.height - vMargin * 2.0;
  //   const bannerX = hMargin
  //   const bannerY = canvas.height - bannerHeight - vMargin
  //   // const bannerY = vMargin;
  //   const hPadding = 32 * dpr

  //   // ctx.fillStyle = "#4442";
  //   // // ctx.fillStyle = "#010A2D";
  //   // ctx.roundRect(bannerX, bannerY, bannerWidth, bannerHeight, 4 * dpr);
  //   // ctx.fill();
  //   // ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);

  //   // ctx.fillStyle = "#fff";
  //   // ctx.roundRect(
  //   //   bannerX + hPadding,
  //   //   bannerY + bannerHeight * 0.5 - hPadding,
  //   //   bannerWidth - hPadding * 2,
  //   //   hPadding * 2,
  //   //   4 * dpr
  //   // );
  //   // ctx.fill();

  //   ctx.save()
  //   ctx.fillStyle = '#fff'
  //   ctx.fillRect(0, 0, canvas.width, canvas.height)
  //   ctx.restore()

  //   ctx.save()
  //   ctx.fillStyle = '#000'
  //   ctx.strokeStyle = '#fff'
  //   ctx.roundRect(
  //     bannerX + hPadding,
  //     bannerY + bannerHeight * 0.5 - hPadding,
  //     bannerWidth - hPadding * 2,
  //     hPadding * 2,
  //     4 * dpr
  //   )
  //   ctx.fill()
  //   // ctx.stroke()
  //   ctx.restore()

  //   ctx.fillStyle = '#fff'
  //   ctx.textBaseline = 'middle'

  //   // if (!canvas.isConnected) {
  //   //   document.body.prepend(canvas)
  //   //   if (canvas.nextSibling.nodeName === 'CANVAS') {
  //   //     canvas.nextSibling.remove()
  //   //   }
  //   // }

  //   ctx.font = `500 ${20 * dpr}px Blinker, sans-serif`

  //   meta.forEach((text, i) => {
  //     const textMeasure = ctx.measureText(text)
  //     const padding = 16 * dpr
  //     const hMargin = 16 * dpr
  //     const x =
  //       i === 0
  //         ? hMargin
  //         : canvas.width - textMeasure.width - padding * 2 - hMargin
  //     const y = 16 * dpr

  //     const width = padding * 2 + textMeasure.width
  //     const height = 32 * dpr

  //     ctx.save()
  //     ctx.fillStyle = '#000'
  //     ctx.strokeStyle = '#fff'
  //     ctx.roundRect(x, y, width, height, 4 * dpr)
  //     ctx.fill()
  //     // ctx.stroke()
  //     ctx.restore()
  //   })

  //   // Render texts last or they are not showng

  //   meta.forEach((text, i) => {
  //     const textMeasure = ctx.measureText(text)
  //     const padding = 16 * dpr
  //     const hMargin = 16 * dpr
  //     const x =
  //       i === 0
  //         ? hMargin
  //         : canvas.width - textMeasure.width - padding * 2 - hMargin
  //     const y = 16 * dpr
  //     const height = 32 * dpr
  //     ctx.save()
  //     ctx.fillStyle = '#fff'
  //     ctx.textBaseline = 'middle'
  //     ctx.fillText(text, x + padding, y + height * 0.5)
  //     ctx.restore()
  //   })

  //   ctx.font = `500 ${20 * dpr}px Blinker, sans-serif`

  //   const textMeasure = ctx.measureText(title)
  //   const titleX = bannerX + (bannerWidth - textMeasure.width) * 0.5
  //   const titleY = bannerY + bannerHeight * 0.5
  //   ctx.fillText(title, titleX, titleY)

  //   const texture = new THREE.CanvasTexture(canvas)
  //   texture.flipY = false
  //   return texture

  //   // eslint-disable-next-line
  // }, [fontsLoaded, title, meta.join(), width, dpr])

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
