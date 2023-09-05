import { useEffect, useCallback } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useThreeContext } from '@/three/context'

export default function useUpdateScrollPerspective() {
  const { camera, viewport } = useThree()

  const { keepScrollPerspective, offsetX, offsetY, scrollCompensatedBounds } =
    useThreeContext()

  const bounds = scrollCompensatedBounds || viewport

  const updateCamera = useCallback(
    (width = 0, height = 0, offsetX = 0, offsetY = 0, scrollY = 0) => {
      camera.setViewOffset(
        width,
        height,
        offsetX * width,
        offsetY * height + scrollY,
        width,
        height
      )
      camera.position.y = scrollY
    },
    [camera]
  )

  useEffect(() => {
    updateCamera(bounds.width, bounds.height, offsetX, offsetY)
  }, [updateCamera, bounds.width, bounds.height, offsetX, offsetY])

  useFrame(() => {
    if (!keepScrollPerspective) {
      return
    }
    const scrollY = bounds.y - window.scrollY - bounds.height * 0.25
    updateCamera(bounds.width, bounds.height, offsetX, offsetY, scrollY)
  })
}
