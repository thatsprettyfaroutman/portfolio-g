import { type CSSProperties } from 'react'
import { a } from 'react-spring'
import styled from 'styled-components'
import { type TRichAsset } from '@/contentful/types'

type TProfilePictureProps = {
  photo: TRichAsset
  width?: number
  style?: CSSProperties
}

const Wrapper = styled(a.div)`
  display: block;
  width: 100%;
  transform-origin: 0 0;
  border-radius: 50%;
  background-size: cover;
`

export default function ProfilePicture({
  photo,
  style,
  ...restProps
}: TProfilePictureProps) {
  const aspectRatio = photo.width / photo.height
  return (
    <Wrapper
      {...restProps}
      style={{
        aspectRatio,
        backgroundImage: `url(${photo.url})`,
        ...style,
      }}
    ></Wrapper>
  )
}
