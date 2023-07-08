'use client'

import Hero from '@/sections/Hero'
import Intro from '@/sections/Intro'
import * as Styled from './styled'

export default function Home() {
  return (
    <Styled.Main>
      <Hero />
      <Intro />
    </Styled.Main>
  )
}
