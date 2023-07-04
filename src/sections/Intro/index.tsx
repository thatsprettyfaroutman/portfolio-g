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
          I am a passionate programmer with 14 years of experience, specializing
          in React coding and frontend development. Bringing designs to life and
          creating captivating user interfaces is my true passion.
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
          What you wrote about your company and your work culture really
          resonated with me so I decided to make this site to demo a bit what I
          do. I love to get inspired by design and bring something beautiful to
          life. And I’m in search of a place that appreciates that. Maybe it
          could be Ghost!
        </Text.Paragraph>
      </Text.Block>
    </Styled.Intro>
  )
}
