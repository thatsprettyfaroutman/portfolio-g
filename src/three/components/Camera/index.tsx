import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import useUpdateScrollPerspective, {
  type TUseUpdateScrollPerspectiveProps,
} from './hooks/useUpdateScrollPerspective'

// Inspired by this thread https://discourse.threejs.org/t/solved-how-do-we-size-something-using-screen-pixels/1177/6

type TCameraProps = Pick<
  TUseUpdateScrollPerspectiveProps,
  'bounds' | 'offsetX' | 'offsetY'
> & {
  perspective?: number
  keepScrollPerspective?: boolean
}

export default function Camera({
  bounds,
  offsetX,
  offsetY,
  perspective = 800,
  keepScrollPerspective = false,
  ...restProps
}: TCameraProps) {
  const ref = useRef()
  const { size } = useThree()
  const aspect = size.width / size.height
  const fov = (180 * (2 * Math.atan(size.height / 2 / perspective))) / Math.PI

  useUpdateScrollPerspective({
    bounds,
    offsetX,
    offsetY,
    active: keepScrollPerspective,
  })

  return (
    <PerspectiveCamera
      {...restProps}
      manual
      makeDefault
      ref={ref}
      fov={fov}
      aspect={aspect}
      position-z={perspective}
    />
  )
}
