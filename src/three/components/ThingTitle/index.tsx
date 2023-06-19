import { useMemo } from 'react'
import { FontLoader, TextGeometry } from 'three-stdlib'
import { usePalette, palette } from '@/styles/theme'
import BlinkerFont from './BlinkerGhost.json'
import { Center } from '@react-three/drei'

const fl = new FontLoader()
const font = fl.parse(
  // @ts-ignore
  BlinkerFont
)

export default function ThingTitle({ children = 'Hi', ...restProps }) {
  const geometry = useMemo(
    () => new TextGeometry(children, { font, size: 1, height: 1 }),
    [children]
  )

  const color = usePalette(palette.main.fg)

  return (
    <>
      <Center {...restProps}>
        <mesh geometry={geometry}>
          <meshStandardMaterial color={color} />
        </mesh>
      </Center>
    </>
  )
}
