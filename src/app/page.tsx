import Main from '@/components/Main'
import Intro from '@/sections/Intro'
import Work from '@/sections/Work'
import Footer from '@/sections/Footer'

export default async function Home() {
  return (
    <Main>
      <Intro />
      <Work />
      <Footer />
    </Main>
  )
}
