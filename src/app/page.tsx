// import GridHelper from '@/components/GridHelper'
import Main from '@/components/Main'
import Hero from '@/sections/Hero'
import Intro from '@/sections/Intro'
import Work from '@/sections/Work'

export default async function Home() {
  return (
    <>
      <Main>
        <Hero />
        <Intro />
        <Work />
      </Main>
      {/* <GridHelper /> */}
    </>
  )
}
