import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useCallback } from 'react'

// TODO: dry this more?

export type TUseUpdateScrollPerspectiveProps = {
  bounds: { width: number; height: number; y: number }
  active?: boolean
  offsetX: number
  offsetY: number
}

export default function useUpdateScrollPerspective({
  bounds,
  active = true,
  offsetX = 0,
  offsetY = 0,
}: TUseUpdateScrollPerspectiveProps) {
  const { camera } = useThree()

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
    if (!active) {
      return
    }
    const scrollY = bounds.y - window.scrollY
    updateCamera(bounds.width, bounds.height, offsetX, offsetY, scrollY)
  })
}
