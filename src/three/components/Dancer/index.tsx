'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  SpotLight,
  useAnimations,
  useDepthBuffer,
  useGLTF,
  useFBX,
  PresentationControls,
  Center,
} from '@react-three/drei'
import { type GroupProps, useThree, useFrame } from '@react-three/fiber'
import chroma from 'chroma-js'
import range from 'ramda/src/range'
import { Group, DoubleSide } from 'three'
import Text3d from '@/three/components/Text3d'
import Laptop from './components/Laptop'
import Mug from './components/Mug'

const DEG = Math.PI / 180
const MODEL = '/models/swinging.fbx'

type TMeProps = GroupProps & {}

export default function Dancer({ ...restProps }: TMeProps) {
  const { viewport, camera, gl } = useThree()
  gl.shadowMap.enabled = true
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

  camera.position.z = 8
  camera.position.y = 0

  useFrame((s) => {
    if (!rotateGroupRef.current) {
      return
    }

    const t = s.clock.getElapsedTime()
    rotateGroupRef.current.rotation.y = t * 0.25

    s.camera.position.y = Math.sin(t * 0.1) * 2 + 2
    s.camera.position.x = Math.cos(t * 0.07) * 4
    s.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <fog attach="fog" args={['#404', 10, 12]} />
      <ambientLight color="#404" intensity={1} />
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
                    side={DoubleSide}
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
              <boxGeometry args={[6, 6, viewport.height]} />
              <meshStandardMaterial color="#404" />
            </mesh>

            <Center rotation-x={-90 * DEG} position-z={2} scale={0.125}>
              <Text3d>{'V  I  L  J  A  M  I  .  D  E  V'}</Text3d>
            </Center>

            <Laptop scale={0.2} position-x={-1} />
            <Mug scale={0.2} position-x={-1.2} position-z={0.2} />

            {/* Lights */}
            {range(0, 5).map((_, i, { length }) => {
              const p = Math.cos((i / (length - 1)) * Math.PI)
              const absP = Math.abs(p)
              const offsetX = (length - 1) * -0.5
              const x = (i + offsetX) * 2
              const y = (1 - absP) * 1 + 3
              const z = absP * -2 - 0.5
              const targetX = i + offsetX
              const lightColor = chroma
                .scale(['#8ff', '#0bf'])
                .mode('hsl')(absP)
                .hex()

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
                  intensity={(1 - absP) * 5 + 1}
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
