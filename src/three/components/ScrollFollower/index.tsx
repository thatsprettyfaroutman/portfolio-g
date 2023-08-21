import { type PropsWithChildren, useRef } from 'react'
import { Group } from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useThreeContext } from '@/three/context'
import lerp from 'lerp'

extend({ Group })

type TScrollFollowerProps = PropsWithChildren<{
  amount?: number
}>

export default function ScrollFollower({
  amount = 1,
  ...restProps
}: TScrollFollowerProps) {
  const ref = useRef<Group>(null)
  const { scrollCompensatedBounds: bounds } = useThreeContext()

  useFrame(() => {
    if (!ref.current) {
      return
    }

    const scrollProgress =
      -(bounds.y - window.innerHeight - window.scrollY) /
      (bounds.height + window.innerHeight)
    const range = bounds.height * 0.5 * amount
    const y = lerp(range, -range, scrollProgress)

    ref.current.position.y = y
  })

  return <group ref={ref} {...restProps} />
}
