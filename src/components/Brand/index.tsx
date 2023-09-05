'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { TRichAsset } from '@/contentful/types'

type TBrandProps = {
  children: TRichAsset
}

const Wrapper = styled.div``

export default function Brand({ children, ...restProps }: TBrandProps) {
  return (
    <Wrapper {...restProps}>
      <Image
        src={children.url}
        width={children.width / 6}
        height={children.height / 6}
        alt={children.title}
      />
    </Wrapper>
  )
}
