'use client'

import dynamic from 'next/dynamic'
import { MeshBasicMaterial, BoxGeometry, Mesh } from 'three'
import { extend } from '@react-three/fiber'
import useDetectImageSize from '@/hooks/useDetectImageSize'
import Text from '@/components/Text'
import Styled from './styled'

const Three = dynamic(() => import('@/three'), {
  ssr: false,
  loading: () => <>Loading Three</>,
})

const DepthImage = dynamic(() => import('@/three/components/DepthImage'), {
  ssr: false,
  loading: () => (
    <mesh scale={100} rotation-x={1} rotation-y={1.34}>
      <boxGeometry />
      <meshBasicMaterial color="#f0f" wireframe />
    </mesh>
  ),
})

const ViewSizeDebug = dynamic(
  () => import('@/three/components/ViewSizeDebug'),
  {
    ssr: false,
    loading: () => (
      <mesh scale={100}>
        <boxGeometry />
      </mesh>
    ),
  }
)

extend({
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
})

// TODO: get texts via staticProps
// TODO: better texts

export default function Intro({ ...restProps }) {
  // const fog = usePalette(palette.main.background.bottom)

  // TODO: get these dynamically
  // const imageAspectRatio = 5386 / 3226
  // const imageWidth = 2048 //window.innerWidth * 1.25

  const { ready, aspect } = useDetectImageSize('/zion-depth.png')

  return (
    <Styled.Intro {...restProps}>
      <Text.Block>
        <Text.MainHeading>{"I'm Viljami"}</Text.MainHeading>
        <Text.Paragraph>
          Quid de Platone aut de Democrito loquar? Et nemo nimium beatus est;
          Quis istud, quaeso, nesciebat? Peccata paria.
        </Text.Paragraph>
      </Text.Block>

      <div
        style={{
          position: 'relative',
          padding: '0 32px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Three keepScrollPerspective>
          <DepthImage
            src="/zion.jpg"
            depthSrc="/zion-depth.png"
            vAlign="bottom"
          />
        </Three>
      </div>

      <Text.Block>
        <Text.Paragraph>
          Duo Reges: constructio interrete. Iam in altera philosophiae parte.
          Nulla erit controversia. Ita nemo beato beatior. Haec dicuntur
          inconstantissime. Prioris generis est docilitas, memoria; At iam
          decimum annum in spelunca iacet.
        </Text.Paragraph>
      </Text.Block>
    </Styled.Intro>
  )
}
