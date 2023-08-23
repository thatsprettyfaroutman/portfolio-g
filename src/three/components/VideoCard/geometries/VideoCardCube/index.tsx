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
  const { nodes } = useGLTF('/models/normalroundedcube.gltf') as GLTFResult
  return (
    <group {...props} dispose={null} scale-y={-1}>
      <mesh geometry={nodes.Cube_1.geometry}>{props.children[1]}</mesh>
      <mesh geometry={nodes.Cube_2.geometry}>{props.children[0]}</mesh>
    </group>
  )
}

useGLTF.preload('/models/normalroundedcube.gltf')
