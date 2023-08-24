import Main from '@/components/Main'
import Intro from '@/sections/Intro'
import Work from '@/sections/Work'

export default async function Home() {
  return (
    <Main>
      <Intro />
      <Work />
    </Main>
  )
}
