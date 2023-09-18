import Footer from '@/asyncComponents/Footer'
import HeroGhost from '@/asyncComponents/HeroGhost'
import IntroSection from '@/asyncComponents/IntroSection'
import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import WorkSection from '@/asyncComponents/WorkSection'
import Header from '@/components/Header'
import Logo from '@/components/Logo'
import Main from '@/components/Main'
import Favicon from '@/three/components/Favicon/lazy'

export default async function Home() {
  return (
    <Main>
      <Favicon />
      <Header absolute>
        <Logo>Viljami.dev</Logo>
        <SocialMediaLinks stealthMode />
      </Header>
      <HeroGhost />
      <IntroSection />
      <WorkSection />
      <Footer />
    </Main>
  )
}
