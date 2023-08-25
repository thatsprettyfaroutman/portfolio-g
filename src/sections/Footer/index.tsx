import dynamic from 'next/dynamic'
import { Paragraph } from '@/components/Text'
import { Wrapper, ThreeWrapper } from './styled'

const Scene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default async function Footer({ ...restProps }) {
  return (
    <Wrapper {...restProps}>
      <Paragraph>That's all folks!</Paragraph>
      <ThreeWrapper>
        <Scene />
      </ThreeWrapper>
    </Wrapper>
  )
}
