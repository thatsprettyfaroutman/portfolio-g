import styled, { css } from 'styled-components'
import { palette } from '@/styles/theme'
import photo from './photo.png'

export const cssMaxWidth = css`
  calc(var(--maxCol) * 3)
`

const ProfilePicture = styled.div`
  width: 100%;
  max-width: ${cssMaxWidth};
  aspect-ratio: 1;
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid ${palette.main.border};
  padding: calc(var(--maxCol) / 8);

  ::after {
    content: ' ';
    display: block;
    background-image: url(${photo.src});
    background-size: cover;
    background-position: center center;
    width: 100%;
    aspect-ratio: inherit;
    border-radius: inherit;
    overflow: hidden;
  }
`

export default ProfilePicture
