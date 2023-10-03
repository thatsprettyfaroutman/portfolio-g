import { useEffect, useRef } from 'react'
import { a, useSpring } from '@react-spring/three'
import { useVideoTexture, useTexture } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import lerp from 'lerp'
import { type DirectionalLight, NearestFilter, RepeatWrapping } from 'three'
import { useColor } from '@/styles/theme'
import { useThreeContext } from '@/three/context'
import VideoPosterMaterial from './materials/VideoPosterMaterial'
import paperNormal from './textures/paper-normal.jpg'

type TVideoPosterProps = GroupProps & {
  width?: number
  height?: number
  src: string
}

// Preload textures
useTexture.preload(paperNormal.src)

const AVideoPosterMaterial = a(VideoPosterMaterial)

/**
 * This component renders a 3d video poster that gets wrinkled when hovering with mouse.
 */
export default function VideoPoster({
  width = 400,
  height = 600,
  src,
  ...restProps
}: TVideoPosterProps) {
  const aspect = width / height
  const { inView, mousePresent } = useThreeContext()

  const lightRef = useRef<DirectionalLight>(null)
  const ambientLightColor = useColor('ambientLight')

  const videoTexture = useVideoTexture(src, { start: false })
  videoTexture.minFilter = NearestFilter
  videoTexture.magFilter = NearestFilter

  const paperTexture = useTexture(paperNormal.src)
  paperTexture.wrapS = RepeatWrapping
  paperTexture.wrapT = RepeatWrapping
  paperTexture.repeat.x = 4.0
  paperTexture.repeat.y = 4.0 / aspect

  // Play video textures when in view
  useEffect(() => {
    if (inView) {
      videoTexture.source.data.play?.()
    } else {
      videoTexture.source.data.pause?.()
    }
  }, [inView, videoTexture])

  useFrame((s) => {
    if (!lightRef.current) {
      return
    }

    const { position } = lightRef.current

    position.x = lerp(position.x, s.mouse.x * width, 0.1)
    position.y = lerp(
      position.y,
      mousePresent ? s.mouse.y * height : height * 0.5,
      0.1
    )
    position.z = 400
  })
  const { opacity } = useSpring({
    config: {
      precision: 0.0001,
    },
    from: { opacity: 0 },
    opacity: 1,
  })

  return (
    <group {...restProps}>
      <ambientLight color={ambientLightColor} intensity={0.25} />
      <directionalLight
        ref={lightRef}
        color={ambientLightColor}
        position-z={600}
        intensity={0.82}
      >
        {/* Light debug box */}
        {/* <mesh>
          <boxGeometry args={[10, 10, 10]} />
        </mesh> */}
      </directionalLight>

      <a.group scale={opacity.to((o) => lerp(0.9, 1.0, o))}>
        <mesh scale={[width, width, 100]}>
          <planeGeometry args={[1, 1 / aspect, width * 0.1, height * 0.2]} />

          {/* @ts-ignore some mismatch with styled components and a-tag :| */}
          <AVideoPosterMaterial
            map={videoTexture}
            width={width}
            height={height}
            roughnessMap={paperTexture}
            roughness={1.1}
            bumpMap={paperTexture}
            bumpScale={0.25}
            transparent
            opacity={opacity}
          />
        </mesh>
      </a.group>
    </group>
  )
}
