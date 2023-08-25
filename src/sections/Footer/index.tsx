import dynamic from 'next/dynamic'
import { Paragraph, HeadingBlock } from '@/components/Text'
import { Wrapper, ThreeWrapper } from './styled'

const Scene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default async function Footer({ ...restProps }) {
  return (
    <Wrapper {...restProps}>
      <HeadingBlock>
        <Paragraph>That's all folks!</Paragraph>
      </HeadingBlock>
      <ThreeWrapper>
        <Scene />
      </ThreeWrapper>
    </Wrapper>
  )
}
