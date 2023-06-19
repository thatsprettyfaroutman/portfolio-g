import { Cabin, Blinker, Barlow } from 'next/font/google'

// TODO: remove unused fonts and weights

const fontCabin = Cabin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const fontBlinker = Blinker({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})
const fontBarlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const FONT = {
  Cabin: fontCabin.style.fontFamily,
  Blinker: fontBlinker.style.fontFamily,
  Barlow: fontBarlow.style.fontFamily,
}

export default FONT
