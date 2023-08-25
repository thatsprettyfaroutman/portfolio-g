import constate from 'constate'
import { type SpringValue } from '@react-spring/three'

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
  offsetX?: number
  offsetY?: number
  keepDefaultCamera?: boolean
  dpr?: number
  shadows?: boolean
}

const useThreeContextHook = (props: TUseThreeContextProps) => props

export const [ThreeContextProvider, useThreeContext] =
  constate(useThreeContextHook)
