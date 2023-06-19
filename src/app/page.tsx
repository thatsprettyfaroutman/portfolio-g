import dynamic from 'next/dynamic'
import * as Styled from './styled'
import LoadingHero from '@/sections/Hero/Loading'

const Hero = dynamic(() => import('@/sections/Hero'), {
  ssr: false,
  loading: LoadingHero,
})

export default function Home() {
  return (
    <Styled.Main>
      <Hero />
    </Styled.Main>
  )
}
