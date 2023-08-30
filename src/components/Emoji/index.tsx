import Image from 'next/image'
import styled from 'styled-components'
import { TEmoji } from '@/contentful/types'

type TEmojiProps = {
  children: TEmoji
}

const Wrapper = styled(Image)`
  display: inline-block;
  margin: 0;
`

export default function Emoji({ children, ...restProps }: TEmojiProps) {
  return (
    <Wrapper
      {...restProps}
      src={children.emojiImage.url}
      alt={children.emojiImage.title}
      width={24}
      height={24}
    />
  )
}
