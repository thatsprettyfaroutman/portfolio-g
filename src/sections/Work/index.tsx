'use client'

import dynamic from 'next/dynamic'
import { MeshBasicMaterial, BoxGeometry, Mesh } from 'three'
import { extend } from '@react-three/fiber'
import Text from '@/components/Text'
import Styled from './styled'
import content from './dummyContent.json'

extend({
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
})

const WORK = content
  .filter((x) => !!x.card)
  .sort((a, b) => (a.endDate < b.endDate ? 1 : -1))

const Three = dynamic(() => import('@/three'), {
  ssr: false,
  loading: () => <>Loading Three</>,
})

// TODO: move lazyloading to a file next to the component
const Card = dynamic(() => import('@/three/components/Card/components/Video'), {
  ssr: false,
  loading: () => (
    <mesh scale={100}>
      <boxGeometry />
    </mesh>
  ),
})

// TODO: better texts
// TODO: lazy load three

export default function Work({ ...restProps }) {
  const scale = 1.5

  const cardW = (375 - 32) * scale
  const cardH = cardW / (2 / 3)

  return (
    <Styled.Work {...restProps}>
      <Text.Block>
        <Text.MainHeading>{'Here’s some of my work'}</Text.MainHeading>
      </Text.Block>

      <Styled.WorkItems>
        {WORK.map((item, i) => (
          <Styled.WorkItem key={i}>
            <Three
              keepScrollPerspective
              dpr={2}
              style={{
                width: cardW + 64,
                height: cardH + 64,
              }}
            >
              {/* @ts-ignore */}
              <Card
                name={item.name!}
                width={cardW}
                height={cardH}
                src={item.card!}
                title={item.title}
                meta={[item.client, item.startDate]}
              />
            </Three>
            <Text.Block className="content">
              <Text.Heading>{item.title}</Text.Heading>
              <Text.Paragraph>{item.tldr}</Text.Paragraph>
            </Text.Block>
          </Styled.WorkItem>
        ))}
      </Styled.WorkItems>
    </Styled.Work>
  )
}
