import { useEffect, useRef } from 'react'
import { a, useSpring } from '@react-spring/three'
import { useVideoTexture, useTexture } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import lerp from 'lerp'
import {
  type DirectionalLight,
  type Group,
  NearestFilter,
  RepeatWrapping,
} from 'three'
import { useControls } from '@/hooks/useControls'
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
  const ref = useRef<Group>(null)
  const lightRef = useRef<DirectionalLight>(null)
  const ambientLightColor = useColor('ambientLight')

  const videoTexture = useVideoTexture(src, { start: false })
  videoTexture.minFilter = NearestFilter
  videoTexture.magFilter = NearestFilter
  const paperTexture = useTexture(paperNormal.src)
  paperTexture.wrapS = RepeatWrapping
  paperTexture.wrapT = RepeatWrapping
  paperTexture.repeat.x = 5.0
  paperTexture.repeat.y = 5.0 / aspect

  // Play video textures when in view
  useEffect(() => {
    if (inView) {
      videoTexture.source.data.play?.()
    } else {
      videoTexture.source.data.pause?.()
    }
  }, [inView, videoTexture])

  // Handle light position
  useFrame((s) => {
    if (!lightRef.current) {
      return
    }
    const { position } = lightRef.current
    position.x = lerp(position.x, s.mouse.x * width, 0.1)
    position.y = lerp(
      position.y,
      mousePresent ? s.mouse.y * height * 0.5 : height * 0.5,
      0.1
    )
    position.z = 400
  })

  // Uncomment to enable poster rotation on mouse hover
  // Handle poster rotation
  // useFrame((s) => {
  //   if (!ref.current) {
  //     return
  //   }
  //   const { rotation } = ref.current
  //   const speed = mousePresent ? 0.1 : 0.05
  //   rotation.x = lerp(rotation.x, mousePresent ? -s.mouse.y * 0.1 : 0, speed)
  //   rotation.y = lerp(rotation.y, mousePresent ? s.mouse.x * 0.1 : 0, speed)
  // })

  const { opacity } = useSpring({
    config: {
      precision: 0.0001,
    },
    from: { opacity: 0 },
    opacity: 1,
  })

  const levaProps = useControls({
    roughness: {
      value: 1.0,
      min: 0,
      max: 2,
    },
    metalness: {
      value: 0.0,
      min: 0,
      max: 1,
    },
    bumpScale: {
      value: 0.25,
      min: 0,
      max: 1,
    },
    flatShading: false,
  } as const)

  const widthSegments = (levaProps.flatShading ? 0.01 : 0.1) * width
  const heightSegments = (levaProps.flatShading ? 0.01 : 0.2) * height

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

      <a.group ref={ref} scale={opacity.to((o) => lerp(0.9, 1.0, o))}>
        <mesh scale={[width, width, 1000]}>
          <planeGeometry
            args={[1, 1 / aspect, widthSegments, heightSegments]}
          />

          {/* @ts-ignore some mismatch with styled components and a-tag :| */}
          <AVideoPosterMaterial
            key={levaProps.flatShading ? 'flat' : 'smooth'}
            map={videoTexture}
            width={width}
            height={height}
            roughnessMap={paperTexture}
            bumpMap={paperTexture}
            transparent
            opacity={opacity}
            {...levaProps}
          />
        </mesh>
      </a.group>
    </group>
  )
}
