import { useRef } from 'react'
import { Group, Mesh, RingGeometry, ShaderMaterial, Color } from 'three'
import { useThree, useFrame, extend } from '@react-three/fiber'
import clamp from 'ramda/src/clamp'
import chroma from 'chroma-js'

// @ts-ignore
import vertexShader from './shaders/vertex.glsl'
// @ts-ignore
import fragmentShader from './shaders/fragment.glsl'

extend({
  Group,
  Mesh,
  RingGeometry,
  ShaderMaterial,
})

// TODO: try with sheen material and light

type TThingProps = {
  color0?: string
  color1?: string
  baseOpacity?: number
  onFirstRender?: () => void
}

export default function AuroraDisc({
  color0 = '#f0f',
  color1 = '#0ff',
  baseOpacity = 0.125,
  onFirstRender,
  ...restProps
}: TThingProps) {
  const { size } = useThree()
  const minRadius = 80
  const maxRadius = 256
  const padding = 64
  const radius = Math.min(size.width, size.height) * 0.5
  const scale = clamp(minRadius, maxRadius, radius - padding)

  const uniforms = useRef({
    uTime: { value: 0 },
    uColor0: { value: new Color(color0) },
    uColor1: { value: new Color(color1) },
    uBaseOpacity: { value: baseOpacity },
  })

  uniforms.current.uBaseOpacity.value = baseOpacity

  // Update color uniforms
  const glColor0 = chroma(color0).gl()
  uniforms.current.uColor0.value.r = glColor0[0]
  uniforms.current.uColor0.value.g = glColor0[1]
  uniforms.current.uColor0.value.b = glColor0[2]
  const glColor1 = chroma(color1).gl()
  uniforms.current.uColor1.value.r = glColor1[0]
  uniforms.current.uColor1.value.g = glColor1[1]
  uniforms.current.uColor1.value.b = glColor1[2]

  useFrame((s) => {
    uniforms.current.uTime.value = s.clock.getElapsedTime()
  })

  const firstRender = useRef(true)
  useFrame(() => {
    if (firstRender.current) {
      firstRender.current = false
      if (typeof onFirstRender === 'function') {
        onFirstRender()
      }
    }
  })

  return (
    <group {...restProps}>
      <mesh scale={[scale, scale, 100]}>
        <ringGeometry args={[0.7, 1, 360, 16]} />
        <shaderMaterial
          {...restProps}
          transparent
          uniforms={uniforms.current}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  )
}
