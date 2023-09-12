import { type SpringValue } from '@react-spring/three'
import constate from 'constate'

export type TPassToThreeContextProps = {
  debug?: boolean
  keepDefaultCamera?: boolean
  dpr?: number
}

export type TUseThreeContextProps = TPassToThreeContextProps & {
  renderEnabled: boolean
  inView: boolean
  inViewSpring: SpringValue<number>
  windowSize: { width: number; height: number }
  mousePresent: boolean
}

const useThreeContextHook = (props: TUseThreeContextProps) => props

export const [ThreeContextProvider, useThreeContext] =
  constate(useThreeContextHook)
