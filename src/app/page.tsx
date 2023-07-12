'use client'

import styled from 'styled-components'
import GridHelper from '@/components/GridHelper'
import Hero from '@/sections/Hero'
import Intro from '@/sections/Intro'
import Work from '@/sections/Work'

const Wrapper = styled.main`
  display: grid;
`

export default function Home() {
  return (
    <>
      <Wrapper>
        <Hero />
        <Intro />
        <Work />
      </Wrapper>
      {/* <GridHelper /> */}
    </>
  )
}
