import Dancer from '@/three/components/Dancer/lazy'
import Favicon from '@/three/components/Favicon/lazy'
import Three from '@/three/lazy'
import { GlobalStyle } from './styled'

export default async function Home() {
  return (
    <>
      <GlobalStyle />
      <Favicon />
      <Three keepDefaultCamera>
        <Dancer />
      </Three>
    </>
  )
}
