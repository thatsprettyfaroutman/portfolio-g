import constate from 'constate'
import { type SpringValue } from 'react-spring'

export type TUseThreeContextProps = {
  debug?: boolean
  renderEnabled: boolean
  inView: boolean
  inViewSpring: SpringValue<number>
  windowSize: { width: number; height: number }
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

const useThreeContextHook = (props: TUseThreeContextProps) => props

export const [ThreeContextProvider, useThreeContext] =
  constate(useThreeContextHook)
