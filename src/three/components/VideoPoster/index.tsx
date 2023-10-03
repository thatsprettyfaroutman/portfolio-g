import { useEffect, useRef } from 'react'
import { useVideoTexture, useTexture } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { type Mesh, DoubleSide, NearestFilter, RepeatWrapping } from 'three'
import { useColor } from '@/styles/theme'
import { useThreeContext } from '@/three/context'
import VideoPosterMaterial from './materials/VideoPosterMaterial'
import paperNormal from './textures/paper-normal.jpg'

// TODO: add poster shader effect

// import getShaderInjectors from '@/three/utils/injectShader'

type TVideoPosterProps = GroupProps & {
  width?: number
  height?: number
  src: string
}

// Preload textures
useTexture.preload(paperNormal.src)

/**
 * WIP - This component renders a 3d video poster using @react-three/fiber.
 */
export default function VideoPoster({
  width = 400,
  height = 600,
  src,
  ...restProps
}: TVideoPosterProps) {
  const { inView } = useThreeContext()

  const ref = useRef<Mesh>(null)
  const ambientLightColor = useColor('ambientLight')

  const videoTexture = useVideoTexture(src, { start: false })
  videoTexture.minFilter = NearestFilter
  videoTexture.magFilter = NearestFilter

  const paperTexture = useTexture(paperNormal.src)
  paperTexture.wrapS = RepeatWrapping
  paperTexture.wrapT = RepeatWrapping
  paperTexture.repeat.x = 4.0
  paperTexture.repeat.y = 4.0 // / aspect

  // Play video textures when in view
  useEffect(() => {
    if (inView) {
      videoTexture.source.data.play?.()
    } else {
      videoTexture.source.data.pause?.()
    }
  }, [inView, videoTexture])

  return (
    <group {...restProps}>
      <ambientLight color={ambientLightColor} intensity={0.25} />
      <directionalLight
        color={ambientLightColor}
        position-z={600}
        intensity={0.82}
      />

      <mesh ref={ref} scale={[width, height, 100]}>
        <planeGeometry args={[1, 1, width * 0.1, height * 0.1]} />
        <VideoPosterMaterial
          map={videoTexture}
          width={width}
          height={height}
          // emissive="#f9f"
          // emissiveIntensity={1}
          roughnessMap={paperTexture}
          roughness={1.1}
          bumpMap={paperTexture}
          bumpScale={0.25}
          // side={DoubleSide}
          // wireframe
        />
      </mesh>
    </group>
  )
}
