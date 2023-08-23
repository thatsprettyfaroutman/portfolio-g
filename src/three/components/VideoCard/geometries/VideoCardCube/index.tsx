import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh
    Cube_2: THREE.Mesh
  }
  materials: {}
}

export function VideoCardCube(
  props: JSX.IntrinsicElements['group'] & { children: JSX.Element[] }
) {
  const { nodes } = useGLTF('/models/normalroundedcube2.gltf') as GLTFResult
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

useGLTF.preload('/models/normalroundedcube2.gltf')
