import { useThree } from '@react-three/fiber'
import { palette, usePalette } from '@/styles/theme'

export default function CameraFog({ near = 0, far = 0, ...restProps }) {
  const { camera } = useThree()
  const cameraDistance = Math.abs(camera.position.z)
  const fogColor = usePalette(palette.main.bg)

  return (
    <fog
      color={fogColor}
      {...restProps}
      near={cameraDistance + near}
      far={cameraDistance + far}
      attach="fog"
    />
  )
}
