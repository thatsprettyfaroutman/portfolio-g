import { useThree, extend } from '@react-three/fiber'
import { Fog } from 'three'
import { palette, usePalette } from '@/styles/theme'

extend({ Fog })

export default function CameraFog({ near = 0, far = 0, ...restProps }) {
  const { camera } = useThree()
  const cameraDistance = Math.abs(camera.position.z)
  const fogColor = usePalette(palette.main.background.bottom)

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
