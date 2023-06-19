import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { PropsWithChildren, useRef } from 'react'

const ZERO_UV = new THREE.Vector2(0)

type TMouseOrbiterProps = {
  areaSize?: 'full' | 'half'
}

export default function MouseOrbiter({
  areaSize = 'full',
  children,
  ...restProps
}: PropsWithChildren<TMouseOrbiterProps>) {
  const { size } = useThree()

  const ref = useRef<THREE.Group>(null)

  const mouseRef = useRef({
    position: new THREE.Vector2(0),
    hover: 0,
  })

  useFrame((s) => {
    if (!ref.current) {
      return
    }

    const rx = mouseRef.current.position.y * -0.06125 * Math.PI
    const ry = mouseRef.current.position.x * 0.125 * Math.PI

    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      rx,
      0.025
    )
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      ry,
      0.05
    )
  })

  const scale = areaSize === 'half' ? 0.5 : 1.0

  return (
    <group {...restProps}>
      <group ref={ref}>{children}</group>
      <mesh
        onPointerMove={(e) => {
          const uv = e.uv || ZERO_UV
          mouseRef.current.position.set(uv.x * 2 - 1, uv.y * 2 - 1)
          mouseRef.current.hover = 1
        }}
        onPointerEnter={() => {
          mouseRef.current.hover = 1
        }}
        onPointerLeave={() => {
          mouseRef.current.hover = 0
          mouseRef.current.position.set(0, 0)
        }}
      >
        <planeGeometry args={[size.width * scale, size.height * scale]} />
        {/* TODO: create InvisibleMaterial component */}
        <shaderMaterial
          vertexShader={'void main() {gl_Position = vec4(999.0);}'}
        />
      </mesh>
    </group>
  )
}
