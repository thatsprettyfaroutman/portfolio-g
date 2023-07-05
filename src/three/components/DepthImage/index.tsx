import {
  Texture,
  Group,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  MathUtils,
  Vector2,
  UniformsLib,
  DoubleSide,
} from 'three'
import { useRef, useState, useCallback, useMemo } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { a } from '@react-spring/three'
import { useControls } from 'leva'

import PerlinNoisePlaneGeometry from './geometries/PerlinNoisePlaneGeometry'
// @ts-ignore
import vertexShader from './shaders/vertex.glsl'
// @ts-ignore
import fragmentShader from './shaders/fragment.glsl'
import paperNormal from './textures/paper-normal.jpg'

extend({ Group, Mesh, PlaneGeometry, ShaderMaterial, PerlinNoisePlaneGeometry })

const TEMP_TEXTURE = new Texture()

type TDepthImageProps = {
  src: string
  depthSrc: string
  detail?: number
  onClick?: () => void
  vAlign?: 'middle' | 'top' | 'bottom'
}

export default function DepthImage({
  src,
  depthSrc,
  detail = 128,
  onClick,
  vAlign = 'middle',
  ...restProps
}: TDepthImageProps) {
  const ref = useRef<Mesh>(null)
  const mouseRef = useRef({
    position: new Vector2(0),
    hover: 0,
  })
  const [hovering, setHovering] = useState(false)
  const [aspect, setAspect] = useState(1)

  const { size } = useThree()

  const normalMap = useTexture(paperNormal.src)

  const uniforms = useRef({
    ...UniformsLib['fog'],
    uTime: { value: 0 },
    // uResolution: { value: new Vector2(0) },
    uAspect: { value: 1 },
    uMap: { value: TEMP_TEXTURE },
    uDepthMap: { value: TEMP_TEXTURE },
    uDepthBend: { value: new Vector2(0) },
    uDepthMid: { value: 0 },
    uNormalMap: { value: normalMap },
    uMouse: { value: new Vector2(0) },
    uMouseHover: { value: 0 },
  })

  const [{ depth, offsetY }, setControls] = useControls(() => ({
    // depth: { value: 180, min: 0, max: 800 },
    // depth: { value: 800, min: 0, max: 1600 },
    // depth: { value: 220, min: -1600, max: 1600 },
    // depth: { value: -200, min: -1600, max: 1600 },
    depth: { value: -800, min: -1600, max: 1600 },
    depthBend: {
      // value: 0.4,
      // value: 0.14,
      value: 0,
      min: -1,
      max: 1,
      step: 0.001,
      onChange(amount) {
        uniforms.current.uDepthBend.value.y = amount
      },
    },
    depthMid: {
      // value: -0.8,
      // value: -0.65,
      value: 0.48,
      min: -2,
      max: 2,
      step: 0.001,
      onChange(amount) {
        uniforms.current.uDepthMid.value = amount
      },
    },
    offsetY: {
      // value: -0.09,
      value: 0,
      min: -1,
      max: 1,
      step: 0.001,
    },
  }))

  const handleTextures = useCallback(
    (textures: Texture | Texture[]) => {
      if (!Array.isArray(textures)) {
        throw new Error('`textures` must be array')
      }
      const [map, depthMap] = textures
      const { width, height } = map.source.data
      const aspect = width / height

      setAspect(aspect)

      // Update uniforms
      // uniforms.current.uResolution.value.x = window.innerWidth
      // uniforms.current.uResolution.value.y = window.innerWidth / aspect
      // console.log(uniforms.current.uResolution.value)
      uniforms.current.uAspect.value = aspect
      uniforms.current.uMap.value = map
      uniforms.current.uDepthMap.value = depthMap

      // Update geometry based on maps
      if (ref.current) {
        // const geometry = new PerlinNoisePlaneGeometry(
        //   1,
        //   1,
        //   detail,
        //   Math.floor(detail / aspect),
        //   500
        // )

        const geometry = new PlaneGeometry(
          1,
          1,
          detail,
          Math.floor(detail / aspect)
        )
        ref.current.geometry.copy(geometry)
      }
    },
    [detail]
  )
  useTexture([src, depthSrc], handleTextures)

  useFrame((s) => {
    const t = s.clock.getElapsedTime()
    uniforms.current.uTime.value = t

    // TODO: move to vertex shader
    // setControls({ depth: Math.sin(t * 0.01) * 600 + 100 })

    // uniforms.current.uMouse.value.lerp(mouseRef.current.position, 0.125)
    // ref.current.rotation.y = uniforms.current.uMouse.value.x * 0.05;
    // ref.current.rotation.x = -uniforms.current.uMouse.value.y * 0.05;

    uniforms.current.uMouseHover.value = MathUtils.lerp(
      uniforms.current.uMouseHover.value,
      mouseRef.current.hover,
      0.1
    )

    if (!hovering && uniforms.current.uMouseHover.value > 0.001) {
      setHovering(true)
    }
    if (hovering && uniforms.current.uMouseHover.value < 0.001) {
      setHovering(false)
    }
  })

  const width = Math.max(size.width, 720)
  const height = width / aspect

  const alignmentY = useMemo(() => {
    const mid = height - size.height
    if (vAlign === 'top') {
      return mid * -0.5
    }
    if (vAlign === 'bottom') {
      return mid * 0.5
    }
    // Middle by default
    return 0
  }, [vAlign, size.height, height])

  const y = alignmentY + offsetY * height

  return (
    <a.group {...restProps}>
      {/* Hover mesh */}
      {/* <mesh
        onClick={onClick}
        geometry={LOW_POLY_PLANE}
        scale={width}
        onPointerMove={(e) => {
          // TODO: fix this in the same way as in MouseOrbiter
          // @ts-ignore
          mouseRef.current.position.set(e.uv.x * 2 - 1, e.uv.y * 2 - 1)
          mouseRef.current.hover = 1
        }}
        onPointerEnter={(e) => {
          // set mouse position instantly when hovering starts
          // uniforms.current.uMouse.value.set(e.uv.x * 2 - 1, e.uv.y * 2 - 1);
          mouseRef.current.hover = 1
          // if (map?.source?.data?.play) {
          //   map.source.data.play();
          // }
        }}
        onPointerLeave={() => {
          mouseRef.current.hover = 0
          // if (map?.source?.data?.pause) {
          //   map.source.data.pause();
          // }
        }}
      >
        <meshBasicMaterial wireframe color="#f0f" transparent opacity={0} />
      </mesh> */}

      <mesh ref={ref} scale={[width, height, depth]} position-y={y}>
        <planeGeometry />
        <shaderMaterial
          // wireframe
          transparent
          uniforms={uniforms.current}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={DoubleSide}
          fog
        />
      </mesh>
    </a.group>
  )
}
