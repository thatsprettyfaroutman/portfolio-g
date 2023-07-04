'use client'

// TODO: get rid of 'use client'

import Hero from '@/sections/Hero'
import Work from '@/sections/Work'
import * as Styled from './styled'

export default function Home() {
  return (
    <Styled.Main>
      <Hero />
      <Work />
    </Styled.Main>
  )
}
