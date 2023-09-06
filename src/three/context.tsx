import { type SpringValue } from '@react-spring/three'
import constate from 'constate'

export type TUseThreeContextProps = {
  debug?: boolean
  renderEnabled: boolean
  inView: boolean
  inViewSpring: SpringValue<number>
  windowSize: { width: number; height: number }
  mousePresent: boolean

  /**
   * @deprecated This is a hack to compensate for scroll position which shouldn't be needed anymore
   */
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
}

const useThreeContextHook = (props: TUseThreeContextProps) => props

export const [ThreeContextProvider, useThreeContext] =
  constate(useThreeContextHook)
