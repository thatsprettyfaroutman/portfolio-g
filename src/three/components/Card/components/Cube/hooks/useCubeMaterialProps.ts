import { type ReactNode, useMemo } from 'react'
import { Material } from 'three'

/**
 * useCubeMaterialProps solves materials for each face:
 * `front`, `edge`, and `back`.
 *
 * Based on following rules:
 *
 * a) Prefer child material:
 * ```jsx
 *   <Cube>
 *     <meshSomeMaterial attach="material" />
 *   </Cube>
 * ```
 *
 * b) Otherwise support `material`, `edgeMaterial`, and `backMaterial` props with
 * ReactNode or THREE.Material as value
 *
 * */

export type TUseCubeMaterialProps = {
  material?: ReactNode | Material
  edgeMaterial?: ReactNode | Material
  backMaterial?: ReactNode | Material
} & JSX.IntrinsicElements['group']

const useCubeMaterialProps = (props: TUseCubeMaterialProps) =>
  useMemo(() => {
    const materialChild: ReactNode = (
      Array.isArray(props.children) ? props.children : [props.children]
    )
      .filter(Boolean)
      .find((x) => x.props?.attach === 'material')

    const front =
      // Check if has `materialChild`
      materialChild
        ? { children: materialChild }
        : // Check `material` prop
        props.material instanceof Material
        ? { material: props.material }
        : { children: props.material }

    // Optional material, fallback to `front`
    const edge = props.edgeMaterial
      ? props.edgeMaterial instanceof Material
        ? { material: props.edgeMaterial }
        : { children: props.edgeMaterial }
      : front

    // Optional material, fallback to `edge` (or `front` if no `edge`)
    const back = props.backMaterial
      ? props.backMaterial instanceof Material
        ? { material: props.backMaterial }
        : { children: props.backMaterial }
      : edge

    return { front, edge, back }
  }, [props.children, props.material, props.edgeMaterial, props.backMaterial])

export default useCubeMaterialProps
