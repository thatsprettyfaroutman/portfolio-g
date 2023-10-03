import { useRef, useEffect } from 'react'
import {
  type MeshPhysicalMaterialProps,
  useFrame,
  useThree,
} from '@react-three/fiber'
import lerp from 'lerp'
import clamp from 'ramda/src/clamp'
import { Vector2 } from 'three'
import { useThreeContext } from '@/three/context'
import getShaderInjectors from '@/three/utils/injectShader'
// @ts-ignore
import vertexMain from './shaders/main.vert'
// @ts-ignore
import vertexPars from './shaders/pars.vert'

export type TVideoPosterMaterial = MeshPhysicalMaterialProps & {
  width: number
  height: number
}

export default function VideoPosterMaterial({
  width,
  height,
  ...restProps
}: TVideoPosterMaterial) {
  const aspect = width / height
  const { mousePresent } = useThreeContext()
  const { size } = useThree()

  //
  // Uniforms
  const uniforms = useRef({
    uTime: { value: 0 },
    uAspect: { value: aspect },
    uMouse: { value: new Vector2(0) },
    uMouseHover: { value: 0 },
  })

  useEffect(() => {
    uniforms.current.uAspect.value = aspect
  }, [aspect])

  const xRatio = size.width / width
  const yRatio = size.height / height

  useFrame((s) => {
    uniforms.current.uTime.value = s.clock.getElapsedTime()

    const { uMouse, uMouseHover } = uniforms.current
    uMouse.value.x = lerp(uMouse.value.x, clamp(-1, 1, s.mouse.x * xRatio), 0.4)
    uMouse.value.y = lerp(uMouse.value.y, clamp(-1, 1, s.mouse.y * yRatio), 0.4)

    uMouseHover.value = lerp(
      uMouseHover.value,
      mousePresent &&
        Math.abs(s.mouse.x * xRatio) < 1 &&
        Math.abs(s.mouse.y * yRatio) < 1
        ? 1
        : 0,
      0.4
    )
  })

  return (
    <meshPhysicalMaterial
      onBeforeCompile={(shaderObject) => {
        shaderObject.uniforms = {
          ...shaderObject.uniforms,
          ...uniforms.current,
        }

        // Inject fragment shader code to specific positions
        const { vertex } = getShaderInjectors(shaderObject)
        vertex('#include <clipping_planes_pars_vertex>', vertexPars)
        vertex('#include <begin_vertex>', vertexMain)
      }}
      {...restProps}
    />
  )
}
