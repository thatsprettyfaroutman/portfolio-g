import { Montserrat, Karla } from 'next/font/google'

const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
})
const fontKarla = Karla({
  subsets: ['latin'],
  weight: ['400'],
})

const FONT = {
  Montserrat: fontMontserrat.style.fontFamily,
  Karla: fontKarla.style.fontFamily,
}

export default FONT
