import Footer from '@/asyncComponents/Footer'
import Header from '@/asyncComponents/Header'
import IntroSection from '@/asyncComponents/IntroSection'
import WorkSection from '@/asyncComponents/WorkSection'
import Main from '@/components/Main'
import Favicon from '@/three/components/Favicon/lazy'

export default async function Home() {
  return (
    <Main>
      <Favicon />
      <Header />
      <IntroSection />
      <WorkSection />
      <Footer />
    </Main>
  )
}
