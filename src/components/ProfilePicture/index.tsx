import styled from 'styled-components'

const ProfilePicture = styled.div<{ src: string }>`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center center;
`

export default ProfilePicture
