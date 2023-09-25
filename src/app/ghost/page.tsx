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
      <Header absolute>
        <Logo>/ Ghost</Logo>
        <SocialMediaLinks stealthMode />
      </Header>
      <HeroGhost title="Hello Ghost" />
      <IntroSection />
      <WorkSection />
      <Footer />
    </Main>
  )
}
