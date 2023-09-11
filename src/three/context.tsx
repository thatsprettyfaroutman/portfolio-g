import { type SpringValue } from '@react-spring/three'
import constate from 'constate'

export type TUseThreeContextProps = {
  debug?: boolean
  renderEnabled: boolean
  inView: boolean
  inViewSpring: SpringValue<number>
  windowSize: { width: number; height: number }
  mousePresent: boolean
  keepScrollPerspective?: boolean
  offsetX?: number
  offsetY?: number
  keepDefaultCamera?: boolean
  dpr?: number
}

const useThreeContextHook = (props: TUseThreeContextProps) => props

export const [ThreeContextProvider, useThreeContext] =
  constate(useThreeContextHook)
