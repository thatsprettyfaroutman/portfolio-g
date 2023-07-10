import constate from 'constate'

export type TUseThreeContextProps = {
  inView: boolean
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
