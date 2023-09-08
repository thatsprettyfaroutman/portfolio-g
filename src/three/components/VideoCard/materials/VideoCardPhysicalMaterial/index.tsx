import { type MutableRefObject, useEffect, useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Color, Texture, Vector2, RepeatWrapping } from 'three'
import { usePalette, palette } from '@/styles/theme'
import getShaderInjectors from '@/three/utils/injectShader'
// @ts-ignore
import fragmentMain from './shaders/main.frag'
// @ts-ignore
import fragmentPars from './shaders/pars.frag'
import paperNormal from './textures/paper-normal.jpg'

export type TVideoCardPhysicalMaterialProps = {
  map: Texture
  width: number
  height: number
  iconMap?: Texture
  iconWidth?: number
  iconHeight?: number
  attach?: string
  mouseRef?: MutableRefObject<{
    hover: number
    position: Vector2
  }>
  backside?: boolean
  overlayMap?: Texture
}

export default function VideoCardPhysicalMaterial({
  map,
  width,
  height,
  iconMap,
  iconWidth = 40,
  iconHeight = 40,
  mouseRef,
  backside = false,
  overlayMap,
  ...restProps
}: TVideoCardPhysicalMaterialProps) {
  const aspect = width / height

  //
  // Colors
  const iconBackgroundColor = usePalette(palette.shade.background)
  const iconForegroundColor = usePalette(palette.shade.text)

  //
  // Maps
  const roughnessMap = useTexture(paperNormal.src)
  roughnessMap.wrapS = RepeatWrapping
  roughnessMap.wrapT = RepeatWrapping
  roughnessMap.repeat.x = 4.0
  roughnessMap.repeat.y = 4.0 / aspect

  //
  // Uniforms
  const uniforms = useRef({
    uResolution: { value: new Vector2(width, height) },
    uAspect: { value: aspect },
    uMap: { value: map },
    uIconMap: { value: new Texture() },
    uIconMapResolution: { value: new Vector2(iconWidth, iconHeight) },
    uIconMapColorBackground: { value: new Color(iconBackgroundColor) },
    uIconMapColorForeground: { value: new Color(iconForegroundColor) },
    uMixIcon: { value: !!iconMap },
    uMouse: { value: new Vector2() },
    uMouseHover: { value: 0 },
    uFlipMouseY: { value: false },
    uBackside: { value: backside },
    uOverlayMap: { value: overlayMap },
  })

  useEffect(() => {
    uniforms.current.uResolution.value.x = width
    uniforms.current.uResolution.value.y = height
    uniforms.current.uAspect.value = aspect
    uniforms.current.uMixIcon.value = !!iconMap
    if (iconMap) {
      uniforms.current.uIconMap.value = iconMap
      uniforms.current.uIconMapResolution.value.x = iconWidth
      uniforms.current.uIconMapResolution.value.y = iconHeight
    }
    uniforms.current.uIconMapColorBackground.value.set(iconBackgroundColor)
    uniforms.current.uIconMapColorForeground.value.set(iconForegroundColor)
    uniforms.current.uBackside.value = backside
    uniforms.current.uOverlayMap.value = overlayMap
  }, [
    aspect,
    iconBackgroundColor,
    width,
    height,
    iconMap,
    iconForegroundColor,
    iconWidth,
    iconHeight,
    backside,
    overlayMap,
  ])

  useFrame(() => {
    if (!mouseRef?.current) {
      return
    }
    uniforms.current.uMouse.value.x = mouseRef.current.position.x
    uniforms.current.uMouse.value.y = mouseRef.current.position.y
    uniforms.current.uMouseHover.value = mouseRef.current.hover
  })

  return (
    <meshPhysicalMaterial
      map={map}
      roughnessMap={roughnessMap}
      roughness={1.1}
      bumpMap={overlayMap}
      bumpScale={0.25}
      onBeforeCompile={(shaderObject) => {
        shaderObject.uniforms = {
          ...shaderObject.uniforms,
          ...uniforms.current,
        }

        // Inject fragment shader code to specific positions
        const { fragment } = getShaderInjectors(shaderObject)
        fragment('#include <clipping_planes_pars_fragment>', fragmentPars)
        fragment('#include <map_fragment>', fragmentMain)
      }}
      {...restProps}
    />
  )
}

// Preload textures
useTexture.preload(paperNormal.src)
