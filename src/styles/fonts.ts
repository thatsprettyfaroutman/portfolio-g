import { Inconsolata, Montserrat, Karla, Fasthand } from 'next/font/google'

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
const fontFasthand = Fasthand({
  subsets: ['latin'],
  weight: ['400'],
})

const FONT = {
  Inconsolata: fontInconsolata.style.fontFamily,
  Karla: fontKarla.style.fontFamily,
  Montserrat: fontMontserrat.style.fontFamily,
  Fasthand: fontFasthand.style.fontFamily,
}

export default FONT
