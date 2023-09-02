import Image from 'next/image'
import styled from 'styled-components'
import Magnet from '@/components/Magnet'
import { TEmoji } from '@/contentful/types'

type TEmojiProps = {
  children: TEmoji
}

const Wrapper = styled.span`
  display: inline-block;

  img {
    display: block;
    margin: 0;
  }
`

export default function Emoji({ children, ...restProps }: TEmojiProps) {
  return (
    <Wrapper {...restProps}>
      <Magnet moveAmountFactor={0.1}>
        <Image
          src={children.emojiImage.url}
          alt={children.emojiImage.title}
          width={24}
          height={24}
        />
      </Magnet>
    </Wrapper>
  )
}
