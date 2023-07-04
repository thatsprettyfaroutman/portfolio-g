import { type ReactNode, useMemo } from 'react'
import { type Mesh, Material } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import useCubeMaterialProps, {
  type TUseCubeMaterialProps,
} from './hooks/useCubeMaterialProps'

type TCubeProps = JSX.IntrinsicElements['group'] & TUseCubeMaterialProps

type TGltfResult = GLTF & {
  nodes: {
    Cube001: Mesh // Front Mesh
    Cube001_1: Mesh // Edge Mesh
    Cube001_2: Mesh // Back Mesh
  }
}

export default function Cube({ ...restProps }: TCubeProps) {
  const { nodes } = useGLTF('/models/normalcube2.gltf') as TGltfResult

  // Figure out materials for each mesh (face)
  const materialProps = useCubeMaterialProps(restProps)

  return (
    <group {...restProps}>
      <group scale={0.5}>
        {/* Front */}
        <mesh geometry={nodes.Cube001.geometry} {...materialProps.front} />

        {/* Edge */}
        <mesh geometry={nodes.Cube001_1.geometry} {...materialProps.edge} />

        {/* Back */}
        <mesh geometry={nodes.Cube001_2.geometry} {...materialProps.back} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/normalcube2.gltf')
