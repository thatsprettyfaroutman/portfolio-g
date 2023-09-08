import { Fasthand, Karla, Montserrat } from 'next/font/google'

const fontFasthand = Fasthand({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
})
const fontKarla = Karla({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  preload: true,
})
const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  preload: true,
})

const FONT = {
  Fasthand: fontFasthand.style.fontFamily,
  Karla: fontKarla.style.fontFamily,
  Montserrat: fontMontserrat.style.fontFamily,
}

export default FONT
