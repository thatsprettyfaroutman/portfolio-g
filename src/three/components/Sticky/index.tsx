import {
  type PropsWithChildren,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { Box3, Group, Vector3 } from 'three'
import { extend, useThree, useFrame } from '@react-three/fiber'
import clamp from 'ramda/src/clamp'
import { useThreeContext } from '@/three/context'

extend({ Group })

type TStickyProps = PropsWithChildren<{
  topMargin?: number
  bottomMargin?: number
}>

export default function Sticky({
  topMargin = 0,
  bottomMargin = 0,
  ...restProps
}: TStickyProps) {
  const ref = useRef<Group>(null)
  const { camera } = useThree()
  const { scrollCompensatedBounds: bounds } = useThreeContext()

  const [contentSize, setContentSize] = useState(
    null as null | { width: number; height: number; depth: number }
  )

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const box = new Box3().setFromObject(ref.current)
    const size = box.getSize(new Vector3())
    setContentSize({ width: size.x, height: size.y, depth: size.z })
  }, [bounds.width, bounds.height])

  const offsetCameraView = useCallback(
    (width = 0, height = 0, y = 0) => {
      camera.setViewOffset(width, height, 0, y, width, height)
    },
    [camera]
  )

  useFrame(() => {
    if (!contentSize?.height) {
      return
    }

    const deltaScrollY = bounds.y - window.scrollY
    const range = (bounds.height - contentSize.height) * 0.5
    const topY = range - topMargin + deltaScrollY
    const y = clamp(-(range - bottomMargin), range - topMargin, topY)

    offsetCameraView(bounds.width, bounds.height, y)
  })

  return <group ref={ref} {...restProps} />
}
