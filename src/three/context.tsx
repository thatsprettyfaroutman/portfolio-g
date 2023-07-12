import constate from 'constate'
import { type SpringValue } from 'react-spring'

export type TUseThreeContextProps = {
  renderEnabled: boolean
  inView: boolean
  inViewSpring: SpringValue<number>
  scrollCompensatedBounds: {
    x: number
    y: number
    width: number
    height: number
  }
  keepScrollPerspective?: boolean
  dpr?: number
  offsetX?: number
  offsetY?: number
}

const useThreeContextHook = (props: TUseThreeContextProps) => {
  return props
}

export const [ThreeContextProvider, useThreeContext] =
  constate(useThreeContextHook)
