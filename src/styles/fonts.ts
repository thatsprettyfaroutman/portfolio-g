import { Fasthand, Inconsolata, Karla, Montserrat } from 'next/font/google'

const fontFasthand = Fasthand({
  subsets: ['latin'],
  weight: ['400'],
})
const fontInconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400'],
})
const fontKarla = Karla({
  subsets: ['latin'],
  weight: ['400', '700'],
})
const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
})

const FONT = {
  Fasthand: fontFasthand.style.fontFamily,
  Inconsolata: fontInconsolata.style.fontFamily,
  Karla: fontKarla.style.fontFamily,
  Montserrat: fontMontserrat.style.fontFamily,
}

export default FONT
