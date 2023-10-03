import { Karla, Montserrat } from 'next/font/google'

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
  Karla: fontKarla.style.fontFamily,
  Montserrat: fontMontserrat.style.fontFamily,
}

export default FONT
