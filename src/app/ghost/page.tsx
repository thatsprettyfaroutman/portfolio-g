import Footer from '@/asyncComponents/Footer'
import IntroSection from '@/asyncComponents/IntroSection'
import WorkSection from '@/asyncComponents/WorkSection'
import Main from '@/components/Main'

export default async function Home() {
  return (
    <Main>
      <IntroSection />
      <WorkSection />
      <Footer />
    </Main>
  )
}
