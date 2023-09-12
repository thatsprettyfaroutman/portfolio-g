'use client'

import { Edges, MeshDiscardMaterial } from '@react-three/drei'
import { type CanvasProps, Canvas, extend } from '@react-three/fiber'
import { Group, Mesh, BoxGeometry } from 'three'
import Camera from '@/three/components/Camera'
import ViewSizeHelper from '@/three/components/ViewSizeHelper'
import { useThreeContext } from '@/three/context'

extend({ Group, Mesh, BoxGeometry })

export default function CustomCanvas({ children, ...restProps }: CanvasProps) {
  const { renderEnabled, dpr, debug, keepDefaultCamera } = useThreeContext()

  return (
    <Canvas
      frameloop={renderEnabled ? 'always' : 'never'}
      linear
      flat
      dpr={dpr}
      {...restProps}
    >
      {!keepDefaultCamera && <Camera />}
      {children}
      {debug && (
        <>
          <mesh scale={100} rotation={[0, Math.PI * 0.25, 0]}>
            <boxGeometry />
            <MeshDiscardMaterial />
            <Edges color="#0ff" />
          </mesh>
          <ViewSizeHelper />
        </>
      )}
    </Canvas>
  )
}
