import { useMemo } from 'react'
import clap from '../icons/clap.png'
import duck from '../icons/duck.png'
import hands from '../icons/hands.png'
import icecream from '../icons/icecream.png'
import party from '../icons/party.png'

const ICONS = [clap, duck, hands, icecream, party]

const createStringIndexToNumber = (str: string) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  return (i: number) =>
    Math.max(1, letters.indexOf(str[i % letters.length])) / letters.length
}

export default function useGetIcon(seed: string) {
  const getIcon = useMemo(() => {
    const stringIndexToNumber = createStringIndexToNumber(seed)
    const icons = ICONS.map(
      (x, i) => [stringIndexToNumber(i), x] as [number, typeof x]
    )
      .sort((a, b) => a[0] - b[0])
      .map((x) => x[1])
    return (i: number) => icons[i % icons.length]
  }, [seed])

  return getIcon
}
