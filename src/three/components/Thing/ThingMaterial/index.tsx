import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import chroma from 'chroma-js'
// @ts-ignore
import vertexShader from './vertex.glsl'
// @ts-ignore
import fragmentShader from './fragment.glsl'

type TThingMaterialProps = {
  // TODO: remove not used
  /**
   * @deprecated
   */
  pointSize?: number
  color?: string
  // TODO: remove not used
  /**
   * @deprecated
   */
  ambientColor?: string
  contrast?: number
  resolution?: number
  r0?: number
  r1?: number
}

export default function ThingMaterial({
  pointSize = 2.0,
  color = '#f0f',
  ambientColor = '#000',
  contrast = 1.4,
  resolution = 256,
  r0 = 0,
  r1 = 1,
  ...restProps
}: TThingMaterialProps) {
  const { viewport } = useThree()

  // const map = useTexture("/cards/circle.png");

  const uniforms = useRef({
    uTime: { value: 3 },
    // @ts-ignore
    uColor: { value: new THREE.Color(...chroma(color).gl()) },
    // @ts-ignore
    uAmbientColor: { value: new THREE.Color(...chroma(ambientColor).gl()) },
    // uMap: { value: map },
    uPointSize: { value: pointSize },
    uContrast: { value: contrast },
    uBendX: { value: 1.0 },
    uBendY: { value: 1.0 },
    uFade: { value: 0.0 },
    uOpacity: { value: chroma(color).alpha() },
    uR0: { value: r0 },
    uR1: { value: r1 },
    uResolution: { value: resolution },
  })

  useEffect(() => {
    const glColor = chroma(color).gl()
    uniforms.current.uColor.value.r = glColor[0]
    uniforms.current.uColor.value.g = glColor[1]
    uniforms.current.uColor.value.b = glColor[2]
  }, [color])

  useEffect(() => {
    const glColor = chroma(ambientColor).gl()
    uniforms.current.uAmbientColor.value.r = glColor[0]
    uniforms.current.uAmbientColor.value.g = glColor[1]
    uniforms.current.uAmbientColor.value.b = glColor[2]
  }, [ambientColor])

  useEffect(() => {
    uniforms.current.uContrast.value = contrast
  }, [contrast])

  useEffect(() => {
    uniforms.current.uPointSize.value = pointSize * viewport.dpr
  }, [pointSize, viewport.dpr])

  useEffect(() => {
    uniforms.current.uOpacity.value = chroma(color).alpha()
  }, [color])

  useFrame((s) => {
    uniforms.current.uTime.value = s.clock.getElapsedTime() + 3
  })

  return (
    <shaderMaterial
      transparent
      uniforms={uniforms.current}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  )
}
