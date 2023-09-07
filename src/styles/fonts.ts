import { Fasthand, Inconsolata, Karla, Montserrat } from 'next/font/google'

const fontFasthand = Fasthand({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
})
const fontInconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
})
const fontKarla = Karla({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: true,
})
const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  preload: true,
})

const FONT = {
  Fasthand: fontFasthand.style.fontFamily,
  Inconsolata: fontInconsolata.style.fontFamily,
  Karla: fontKarla.style.fontFamily,
  Montserrat: fontMontserrat.style.fontFamily,
}

export default FONT
