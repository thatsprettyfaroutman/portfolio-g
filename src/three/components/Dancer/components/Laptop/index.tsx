/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { type JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Group, Mesh, MeshStandardMaterial } from 'three'
import { GLTF } from 'three-stdlib'

extend({ Group, Mesh, MeshStandardMaterial })

type GLTFResult = GLTF & {
  nodes: {
    Cube145: Mesh
    Cube145_1: Mesh
    Cube144: Mesh
    Cube144_1: Mesh
    Cube608: Mesh
  }
  materials: {
    cassis: MeshStandardMaterial
    trackpad: MeshStandardMaterial
    screen: MeshStandardMaterial
    keys: MeshStandardMaterial
  }
}

export default function Laptop(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/laptop.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.417, 0.044, 0.156]}
        rotation={[Math.PI, -0.404, Math.PI]}
        scale={[1, 0.041, 0.711]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube145.geometry}
          material={materials.cassis}
        />
        <mesh
          receiveShadow
          geometry={nodes.Cube145_1.geometry}
          material={materials.trackpad}
        />
      </group>
      <group
        position={[0, 0.702, -0.821]}
        rotation={[1.121, 0.184, 2.78]}
        scale={[1, 0.02, 0.711]}
      >
        <mesh geometry={nodes.Cube144.geometry} material={materials.screen} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube144_1.geometry}
          material={materials.cassis}
        />
      </group>
      <mesh
        receiveShadow
        geometry={nodes.Cube608.geometry}
        material={materials.keys}
        position={[-0.366, 0.08, 0.463]}
        rotation={[Math.PI, -0.404, Math.PI]}
        scale={[0.05, 0.01, 0.05]}
      />
    </group>
  )
}

useGLTF.preload('/models/laptop.gltf')
