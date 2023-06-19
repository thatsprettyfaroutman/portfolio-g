import Image from 'next/image'
import * as Styled from './styled'
import Text from '@/components/Text'

export default function LoadingHero({ ...restProps }) {
  return (
    <Styled.Hero {...restProps}>
      <Text.MainHeading>Hi Ghost</Text.MainHeading>
      <Image
        src="/thing-loading-tinified.png"
        alt="Ever changing graphical element"
        width={560}
        height={524}
      />
    </Styled.Hero>
  )
}
