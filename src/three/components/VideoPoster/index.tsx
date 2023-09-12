import { useEffect, useRef } from 'react'
import { useVideoTexture } from '@react-three/drei'
import { NearestFilter, Vector2 } from 'three'
import { useThreeContext } from '@/three/context'

// TODO: add poster shader effect

// import getShaderInjectors from '@/three/utils/injectShader'

type TVideoPosterProps = {
  width?: number
  height?: number
  src: string
}

/**
 * WIP - This component renders a 3d video poster using @react-three/fiber.
 */
export default function VideoPoster({
  width = 400,
  height = 600,
  src,
}: TVideoPosterProps) {
  const { inView } = useThreeContext()

  const map = useVideoTexture(src, { start: false })
  map.minFilter = NearestFilter
  map.magFilter = NearestFilter

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new Vector2() },
  })

  // Play video textures when in view
  useEffect(() => {
    if (inView) {
      map.source.data.play?.()
    } else {
      map.source.data.pause?.()
    }
  }, [inView, map])

  return (
    <group>
      <mesh>
        <planeGeometry args={[width, height, width, height]} />
        <meshStandardMaterial
          map={map}
          onBeforeCompile={(shaderObject) => {
            shaderObject.uniforms = {
              ...shaderObject.uniforms,
              ...uniforms.current,
            }

            // console.log(shaderObject.fragmentShader)
            // console.log(shaderObject.vertexShader)

            // Inject fragment shader code to specific positions
            // const { fragment } = getShaderInjectors(shaderObject)
            // fragment('#include <clipping_planes_pars_fragment>', fragmentPars)
            // fragment('#include <map_fragment>', fragmentMain)
          }}
        />
      </mesh>
    </group>
  )
}
