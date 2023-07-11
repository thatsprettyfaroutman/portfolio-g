import { useRef } from 'react'
import { Group } from 'three'
import { useFrame, extend } from '@react-three/fiber'

extend({ Group })

type TStickyProps = {
  height: number
}

export default function Sticky({ height = 0, ...restProps }: TStickyProps) {
  const ref = useRef<Group>(null)

  // useFrame(({ camera,size }) => {
  //   const {position} = ref.current
  //   const scrollY = camera.position.y

  //   const maxY = size.height * 0.5 + scrollY

  //   if (position.y + height * 0.5 > maxY) {
  //     position.y =maxY
  //   }

  // })

  return <group ref={ref} {...restProps} />
}
