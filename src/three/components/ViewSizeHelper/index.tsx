import { useThree } from '@react-three/fiber'

export default function ViewSizeHelper({ ...restProps }) {
  const { size } = useThree()

  return (
    <mesh {...restProps} scale={[size.width, size.height, 1]}>
      <planeGeometry />
      <meshBasicMaterial wireframe color="#f0f" />
    </mesh>
  )
}
