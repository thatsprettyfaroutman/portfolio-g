import Footer from '@/asyncComponents/Footer'
import IntroSection from '@/asyncComponents/IntroSection'
import WorkSection from '@/asyncComponents/WorkSection'
import Main from '@/components/Main'
import Favicon from '@/three/components/Favicon/lazy'

export default async function Home() {
  return (
    <Main>
      <Favicon />
      <IntroSection />
      <WorkSection />
      <Footer />
    </Main>
  )
}
