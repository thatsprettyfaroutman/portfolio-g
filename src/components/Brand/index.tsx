'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { TRichAsset } from '@/contentful/types'
import { useColorBrightness } from '@/styles/theme'

type TBrandProps = {
  children: TRichAsset
}

const Wrapper = styled.div``

export default function Brand({ children, ...restProps }: TBrandProps) {
  const filter = useColorBrightness('main-text') > 0.5 ? 'invert()' : undefined
  return (
    <Wrapper {...restProps}>
      <Image
        src={children.url}
        width={children.width / 6}
        height={children.height / 6}
        alt={children.title}
        style={{ filter }}
      />
    </Wrapper>
  )
}
