import Image from 'next/image'
import * as Styled from './styled'

export default function LoadingHero({ ...restProps }) {
  return (
    <Styled.Hero {...restProps}>
      <Image
        src="/thing-loading-tinified.png"
        alt="Ever changing graphical element"
        width={560}
        height={524}
      />
    </Styled.Hero>
  )
}
