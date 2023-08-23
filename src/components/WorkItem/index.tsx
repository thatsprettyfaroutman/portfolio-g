'use client'

import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import GridSection from '@/components/GridSection'
import { type TWorkItem } from '@/contentful/types'
import Section from '@/components/Section'

import Title from './components/Title'
import Client from './components/Client'
import Card from './components/Card'
import Tldr from './components/Tldr'
import Impacts from './components/Impacts'
import Techs from './components/Techs'

type TWorkItemProps = PropsWithChildren<{
  item: TWorkItem
}>

// const Wrapper = styled(GridSection).attrs({ as: 'div' })`
//   grid-column: 1 / -1;
//   grid-template-rows: auto auto 1fr;
//   grid-row-gap: calc(var(--maxCol) * 0.5);
//   padding-left: 0;
//   padding-right: 0;
// `

const Wrapper = styled.div`
  display: grid;
  grid-gap: calc(var(--maxCol) / 2);

  > ${Card} {
    grid-row: 3;
  }
`

export default function WorkItem({ item, ...restProps }: TWorkItemProps) {
  return (
    <Wrapper {...restProps}>
      <Title
        startDate={item.startDate}
        endDate={item.endDate}
        altTitle={item.altTitle}
      >
        {item.title}
      </Title>
      <Client>{item.client}</Client>
      <Tldr>{item.tldr}</Tldr>
      <Card
        src={item.cardVideo.url}
        iconSrc={item.client.logoMap.url}
        backText={item.cardBackText ?? item.impacts[0]?.body ?? item.title}
      />
      <Impacts>{item.impacts}</Impacts>
      <Techs>{item.techs}</Techs>
    </Wrapper>
  )
}
