import { type CSSProperties } from 'react'
import { a } from 'react-spring'
import styled from 'styled-components'
import { type TRichAsset } from '@/contentful/types'
import { palette } from '@/styles/theme'

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
  box-shadow: 0 calc(var(--space) / 8) calc(var(--space) / 8)
    ${palette.main.text.alpha(0.15)};
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
