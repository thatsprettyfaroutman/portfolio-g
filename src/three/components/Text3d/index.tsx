import { useMemo } from 'react'
import { extend } from '@react-three/fiber'
import { FontLoader, TextGeometry } from 'three-stdlib'
import { Mesh, MeshStandardMaterial } from 'three'
import FontJson from './GhostMontserrat.json'
import { Center } from '@react-three/drei'

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
        height: 1,
      }),
    [children]
  )

  return (
    <Center {...restProps}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} />
      </mesh>
    </Center>
  )
}
