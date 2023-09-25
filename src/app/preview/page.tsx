import Footer from '@/asyncComponents/Footer'
import HeroGhost from '@/asyncComponents/HeroGhost'
import IntroSection from '@/asyncComponents/IntroSection'
import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import WorkSection from '@/asyncComponents/WorkSection'
import Header from '@/components/Header'
import Logo from '@/components/Logo'
import Main from '@/components/Main'

export default async function Home() {
  return (
    <Main>
      <Header absolute>
        <Logo />
        <SocialMediaLinks stealthMode />
      </Header>
      <HeroGhost />
      <IntroSection />
      <WorkSection />
      <Footer />
    </Main>
  )
}
