'use client'

import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { type TWorkItem } from '@/contentful/types'
import { MEDIA } from '@/styles/media'
import { palette } from '@/styles/theme'

import Title from './components/Title'
import Client from './components/Client'
import Card from './components/Card'
import Tldr from './components/Tldr'
import Impacts from './components/Impacts'
import Techs from './components/Techs'

type TWorkItemProps = PropsWithChildren<{
  item: TWorkItem
}>

const Wrapper = styled.div`
  display: grid;
  grid-gap: var(--maxCol);
  align-items: start;

  > ${Card} {
    grid-row: 2;
  }

  ${MEDIA.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'Title Title'
      'Client Client'
      'Tldr Card'
      'Impacts Card'
      'Techs Techs';
    grid-template-rows: auto auto 1fr;

    > ${Title} {
      grid-area: Title;
    }
    > ${Client} {
      grid-area: Client;
    }
    > ${Tldr} {
      grid-area: Tldr;
      max-width: calc(var(--maxCol) * 8);
    }
    > ${Card} {
      grid-row: initial;
      grid-area: Card;
    }
    > ${Impacts} {
      grid-area: Impacts;
      max-width: calc(var(--maxCol) * 8);
    }
    > ${Techs} {
      grid-area: Techs;
    }
  }

  ${MEDIA.desktop} {
    grid-template-columns: 1fr auto;
    > ${Card} {
      min-width: 400px;
    }
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
