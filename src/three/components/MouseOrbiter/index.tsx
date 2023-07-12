import { PropsWithChildren, useRef } from 'react'
import {
  Vector2,
  Vector3,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  MathUtils,
  Group,
} from 'three'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { MeshDiscardMaterial } from '@react-three/drei'
import { useThreeContext } from '@/three/context'

extend({
  Group,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
})

const TEMP_VEC3 = new Vector3()

type TMouseOrbiterProps = {
  hoverWidth?: number
  hoverHeight?: number
  hideCursor?: boolean
  speed?: number
  moveAmount?: number
  maxAngle?: number
}

export default function MouseOrbiter({
  hoverWidth,
  hoverHeight,
  hideCursor = false,
  children,
  speed = 0.025,
  moveAmount = 0,
  maxAngle = Math.PI * 0.025,
  ...restProps
}: PropsWithChildren<TMouseOrbiterProps>) {
  const { size } = useThree()
  const { inView } = useThreeContext()

  const w = hoverWidth || size.width
  const h = hoverHeight || size.height
  const aspect = w / h

  const ref = useRef<Group>(null)

  const mouseRef = useRef({
    position: new Vector2(0),
    hover: {
      target: 0,
      value: 0,
    },
  })

  useFrame((s) => {
    if (!ref.current) {
      return
    }

    const { position, hover } = mouseRef.current
    const speedSpeed = MathUtils.lerp(speed * 0.1, speed, hover.target)
    hover.value = MathUtils.lerp(hover.value, hover.target, speed)
    ref.current.rotation.x = MathUtils.lerp(
      ref.current.rotation.x,
      hover.target * position.y * -maxAngle,
      speedSpeed
    )
    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      hover.target * position.x * (maxAngle / aspect),
      speedSpeed
    )

    if (moveAmount) {
      TEMP_VEC3.x = position.x * moveAmount
      TEMP_VEC3.y = position.y * moveAmount
      ref.current.position.lerp(TEMP_VEC3, speedSpeed)
    }
  })

  return (
    <group {...restProps}>
      <group ref={ref}>{children}</group>
      <mesh
        onPointerEnter={() => {
          mouseRef.current.hover.target = 1

          if (inView && hideCursor) {
            document.body.style.cursor = 'none'
          }
        }}
        onPointerMove={(e) => {
          mouseRef.current.position.set(e.uv!.x * 2 - 1, e.uv!.y * 2 - 1)
        }}
        onPointerLeave={() => {
          mouseRef.current.hover.target = 0
          mouseRef.current.position.set(0, 0)

          if (hideCursor) {
            document.body.style.cursor = ''
          }
        }}
      >
        <planeGeometry
          args={[hoverWidth || size.width, hoverHeight || size.height]}
        />
        <MeshDiscardMaterial />
      </mesh>
    </group>
  )
}
