import Footer from '@/asyncComponents/Footer'
import IntroSection from '@/asyncComponents/IntroSection'
import ProfileDrawer from '@/asyncComponents/ProfileDrawer'
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
      <IntroSection />
      <WorkSection />
      <Footer />
      <ProfileDrawer />
    </Main>
  )
}
