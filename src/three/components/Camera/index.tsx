import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import useUpdateScrollPerspective from './hooks/useUpdateScrollPerspective'

// Inspired by this thread https://discourse.threejs.org/t/solved-how-do-we-size-something-using-screen-pixels/1177/6

type TCameraProps = {
  perspective?: number
}

export default function Camera({
  perspective = 800,
  ...restProps
}: TCameraProps) {
  const ref = useRef()
  const { size } = useThree()
  const aspect = size.width / size.height
  const fov = (180 * (2 * Math.atan(size.height / 2 / perspective))) / Math.PI

  useUpdateScrollPerspective()

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
