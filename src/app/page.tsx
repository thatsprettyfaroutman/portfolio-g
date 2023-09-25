import Footer from '@/asyncComponents/Footer'
import IntroSection from '@/asyncComponents/IntroSection'
import SocialMediaLinks from '@/asyncComponents/SocialMediaLinks'
import WorkSection from '@/asyncComponents/WorkSection'
import Header from '@/components/Header'
import Hero from '@/components/Hero/lazy'
import Logo from '@/components/Logo'
import Main from '@/components/Main'

export default async function Home() {
  return (
    <Main>
      <Header absolute>
        <Logo />
        <SocialMediaLinks stealthMode />
      </Header>
      <Hero />
      <IntroSection />
      <WorkSection />
      <Footer />
    </Main>
  )
}
