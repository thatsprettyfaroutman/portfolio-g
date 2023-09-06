import GradedFullHeight from '@/components/GradedFullHeight'
import Main from '@/components/Main'
import Dancer from '@/three/components/Dancer/lazy'
import Favicon from '@/three/components/Favicon/lazy'
import Three from '@/three/lazy'
import { Global } from './styled'

export default async function Home() {
  return (
    <>
      <Global />
      <Three keepDefaultCamera>
        <Dancer />
      </Three>
    </>
  )
}
