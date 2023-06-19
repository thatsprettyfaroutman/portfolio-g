import { useRef, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Color, ShaderMaterial } from 'three'
import chroma from 'chroma-js'
// @ts-ignore
import vertexShader from './vertex.glsl'
// @ts-ignore
import fragmentShader from './fragment.glsl'

extend({ ShaderMaterial })

export type TThingMaterialProps = {
  resolution?: number
  color0?: string
  color1?: string
  baseOpacity?: number
}

export default function ThingMaterial({
  resolution = 256,
  color0 = '#f0f',
  color1 = '#0ff',
  baseOpacity = 0.125,
  ...restProps
}: TThingMaterialProps) {
  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: resolution },
    uColor0: { value: new Color(color0) },
    uColor1: { value: new Color(color1) },
    uBaseOpacity: { value: baseOpacity },
  })

  useEffect(() => {
    uniforms.current.uResolution.value = resolution
  }, [resolution])

  useEffect(() => {
    const glColor = chroma(color0).gl()
    uniforms.current.uColor0.value.r = glColor[0]
    uniforms.current.uColor0.value.g = glColor[1]
    uniforms.current.uColor0.value.b = glColor[2]
  }, [color0])

  useEffect(() => {
    const glColor = chroma(color1).gl()
    uniforms.current.uColor1.value.r = glColor[0]
    uniforms.current.uColor1.value.g = glColor[1]
    uniforms.current.uColor1.value.b = glColor[2]
  }, [color1])

  useEffect(() => {
    uniforms.current.uBaseOpacity.value = baseOpacity
  }, [baseOpacity])

  useFrame((s) => {
    uniforms.current.uTime.value = s.clock.getElapsedTime()
  })

  return (
    <shaderMaterial
      {...restProps}
      transparent
      uniforms={uniforms.current}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  )
}
