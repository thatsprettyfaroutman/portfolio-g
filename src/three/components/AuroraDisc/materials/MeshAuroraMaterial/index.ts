import { shaderMaterial } from '@react-three/drei'
import { Color, ShaderMaterial } from 'three'
// @ts-ignore
import fragmentShader from './shaders/fragment.glsl'
// @ts-ignore
import vertexShader from './shaders/vertex.glsl'

const MATERIAL_UNIFORM_DEFAULTS = {
  uTime: 0,
  uColor0: new Color('#f0f'),
  uColor1: new Color('#0ff'),
  uBaseOpacity: 0.125,
  uOpacity: 1,
}

export type TMeshAuroraMaterial = {
  key: string
} & typeof MATERIAL_UNIFORM_DEFAULTS &
  ShaderMaterial

const MeshAuroraMaterial = shaderMaterial(
  MATERIAL_UNIFORM_DEFAULTS,
  vertexShader,
  fragmentShader
) as unknown as TMeshAuroraMaterial

export default MeshAuroraMaterial
