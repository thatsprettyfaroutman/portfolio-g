import { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import { Heading1 } from '@/components/Text'
import { Wrapper } from './styled'

const Scene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default async function Hero(props: PropsWithChildren) {
  const intro = await useIntroSection()

  return (
    <Wrapper {...props} tag="section">
      <Scene />
      <Heading1>{intro.title}</Heading1>
    </Wrapper>
  )
}
