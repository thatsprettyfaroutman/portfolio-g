'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  SpotLight,
  useAnimations,
  useDepthBuffer,
  useGLTF,
  useFBX,
  PresentationControls,
} from '@react-three/drei'
import { type GroupProps, useThree, useFrame } from '@react-three/fiber'
import range from 'ramda/src/range'
import { Group } from 'three'
import { palette, usePalette } from '@/styles/theme'

const MODEL = '/models/me-swinging.fbx'

type TMeProps = GroupProps & {}

export default function Dancer({ ...restProps }: TMeProps) {
  const { viewport, camera } = useThree()
  const levaProps = { roughness: 0.98, metalness: 0.1 }
  const ref = useRef<Group>(null)
  const rotateGroupRef = useRef<Group>(null)
  const model = useFBX(MODEL)
  if (model?.children[0]) {
    model.children[0].castShadow = true
    model.children[0].receiveShadow = true
  }
  const { actions } = useAnimations(model.animations, ref)
  const currentActionIndexRef = useRef(-1)
  const toggleAnimation = useCallback(() => {
    const actionList = Object.values(actions)
    const fromAction = actionList[currentActionIndexRef.current]
    currentActionIndexRef.current++
    if (currentActionIndexRef.current > actionList.length - 1) {
      currentActionIndexRef.current = 0
    }
    const toAction = actionList[currentActionIndexRef.current]
    if (!toAction) {
      return
    }
    if (!fromAction) {
      toAction.fadeIn(0.42)
    } else {
      toAction.crossFadeFrom(fromAction, 0.42, true)
    }
    toAction.enabled = true
    toAction.play()
  }, [actions])

  useEffect(() => {
    toggleAnimation()
  }, [toggleAnimation])

  const depthBuffer = useDepthBuffer({
    size: 1024 * 2.0,
  })

  const ambientColor = usePalette(palette.shade.background)
  const lightColor = usePalette(palette.accents[2])

  camera.position.z = 10
  camera.position.y = 0

  useFrame((s) => {
    if (!rotateGroupRef.current) {
      return
    }

    const t = s.clock.getElapsedTime()
    rotateGroupRef.current.rotation.y = t * 0.25
  })

  return (
    <>
      <fog attach="fog" args={[ambientColor, 5, 10]} />
      <ambientLight color={ambientColor} intensity={1} />
      <group {...restProps}>
        <PresentationControls
          global
          snap
          polar={[Math.PI * -0.1, Math.PI * 0.1]}
          azimuth={[Math.PI * -0.1, Math.PI * 0.1]}
        >
          <group dispose={null} ref={ref} position-y={-1}>
            <group ref={rotateGroupRef}>
              {/* Dancer */}
              <group dispose={null} scale={0.01}>
                <primitive object={model}>
                  <meshStandardMaterial
                    attach="children-0-material"
                    color="#000"
                    // map={diffuse}
                    {...levaProps}
                  />
                </primitive>
              </group>
            </group>

            {/* Platform */}
            <mesh
              receiveShadow
              rotation-x={Math.PI * -0.5}
              position-y={-viewport.height * 0.5}
            >
              <boxGeometry args={[40, 4, viewport.height]} />
              <meshStandardMaterial
                color="#f0f"
                emissive="#202"
                emissiveIntensity={3}
              />
            </mesh>

            {/* Lights */}
            {range(0, 3).map((_, i, { length }) => {
              const p = Math.cos((i / (length - 1)) * Math.PI)
              const absP = Math.abs(p)
              const offsetX = (length - 1) * -0.5
              const x = (i + offsetX) * 4
              const y = (1 - absP) * 1 + 2
              const z = absP * -0.5 - 0.5
              const targetX = i + offsetX

              return (
                // @ts-ignore
                <SpotLight
                  key={i}
                  // color="#a600ff"
                  color={lightColor}
                  position={[x, y, z]}
                  target-position-x={targetX}
                  target-position-z={z}
                  depthBuffer={depthBuffer}
                  castShadow
                  penumbra={7.5}
                  distance={y * 4}
                  angle={Math.PI * 0.3}
                  attenuation={6}
                  anglePower={3}
                  intensity={(1 - absP) * 5 + 5}
                />
              )
            })}
          </group>
        </PresentationControls>
      </group>
    </>
  )
}

useGLTF.preload(MODEL)
