import { type PropsWithChildren, useRef, useEffect } from 'react'
import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { mergeRefs } from 'react-merge-refs'

type TBorderedGridProps = PropsWithChildren

const Wrapper = styled.div`
  position: relative;
  display: grid;
`

/**
 * Removes double borders from cells
 *
 * ```
 * ┌───┬┬───┐
 * │ a ││ b │
 * ├───┼┼───┤ ◄─┬─ Double borders, boo!
 * ├───┼┼───┤   │
 * │ c ││ d │   │
 * └───┴┴───┘   │
 *      ▲       │
 *      └───────┘
 *
 *    vs.
 *
 * ┌───┬───┐
 * │ a │ b │
 * ├───┼───┤ ◄──── Solo borders, yiss!
 * │ c │ d │
 * └───┴───┘
 *
 * ```
 */

export default function BorderedGrid(props: TBorderedGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [measureRef, bounds] = useMeasure()

  // Update child borders when size or children changes
  useEffect(() => {
    if (!ref.current) {
      return
    }
    const children = Array.from(ref.current.children) as HTMLElement[]

    // Set top and left borders to none if child isn't in first col or row
    children.forEach((child) => {
      child.style.borderLeft = child.offsetLeft === 0 ? '' : 'none'
      child.style.borderTop = child.offsetTop === 0 ? '' : 'none'
    })
  }, [bounds.width, props.children])

  return <Wrapper ref={mergeRefs([ref, measureRef])} {...props} />
}
