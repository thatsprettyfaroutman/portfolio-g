import { Barlow, Blinker, Cabin, Montserrat } from 'next/font/google'

// TODO: remove unused fonts and weights

const fontBarlow = Barlow({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})
const fontBlinker = Blinker({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '600', '700'],
})
const fontCabin = Cabin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

const FONT = {
  Barlow: fontBarlow.style.fontFamily,
  Blinker: fontMontserrat.style.fontFamily,
  Cabin: fontCabin.style.fontFamily,
  Montserrat: fontMontserrat.style.fontFamily,
}

export default FONT
