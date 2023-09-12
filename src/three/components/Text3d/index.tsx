import { useMemo } from 'react'
import { Center } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Mesh, MeshStandardMaterial } from 'three'
import { FontLoader, TextGeometry } from 'three-stdlib'
import FontJson from './montserratviljamidev.json'

extend({ Mesh, MeshStandardMaterial })
const fl = new FontLoader()
const font = fl.parse(
  // @ts-ignore
  FontJson
)

type TText3dProps = {
  color?: string
  children?: string
}

/**
 * This component renders a 3d text.
 */
export default function Text3d({
  children = 'Hi',
  color = '#fff',
  ...restProps
}: TText3dProps) {
  const geometry = useMemo(
    () =>
      new TextGeometry(children, {
        font,
        size: 1,
        height: 0.5,
      }),
    [children]
  )

  return (
    <Center {...restProps}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.01}
        />
      </mesh>
    </Center>
  )
}
