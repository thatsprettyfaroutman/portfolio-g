import { useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

// Perspective camera that mimics Css's camera.
// It has the same the pixel ratio as the rest of the site, making it easier to position and scale 3d elements so they match rest of the site.
// 100 3d-measurement-units === 100px

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
