import { type JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { type Mesh } from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube_1: Mesh
    Cube_2: Mesh
  }
  materials: {}
}

export function VideoCardBox(
  props: JSX.IntrinsicElements['group'] & { children: JSX.Element[] }
) {
  const { nodes } = useGLTF('/models/roundedBox.gltf') as GLTFResult
  return (
    <group {...props} dispose={null} scale-y={-1}>
      <mesh scale={0.5} geometry={nodes.Cube_1.geometry}>
        {props.children[1]}
      </mesh>
      <mesh scale={0.5} geometry={nodes.Cube_2.geometry}>
        {props.children[0]}
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/roundedBox.gltf')
