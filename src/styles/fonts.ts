import { Blinker, Barlow } from 'next/font/google'

const fontBlinker = Blinker({ subsets: ['latin'], weight: ['400'] })
const fontBarlow = Barlow({ subsets: ['latin'], weight: ['400'] })

export const FONT = {
  Blinker: fontBlinker.style.fontFamily,
  Barlow: fontBarlow.style.fontFamily,
}
