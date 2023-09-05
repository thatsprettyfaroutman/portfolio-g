'use client'

import { type PropsWithChildren } from 'react'
import isEmpty from 'ramda/src/isEmpty'
import styled from 'styled-components'
import { type TWorkItem } from '@/contentful/types'
import { MEDIA } from '@/styles/media'
import Body from './components/Body'
import Card from './components/Card'
import Client from './components/Client'
import Impacts from './components/Impacts'
import Techs from './components/Techs'
import Title from './components/Title'

type TWorkItemProps = PropsWithChildren<{
  item: TWorkItem
}>

const Wrapper = styled.div`
  display: grid;
  grid-gap: var(--space);
  align-items: start;

  > ${Card} {
    grid-row: 2;
  }

  ${MEDIA.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'Title Title'
      'Client Client'
      'Body Card'
      'Impacts Card'
      'Techs Techs';
    grid-template-rows: auto auto 1fr;

    > ${Title} {
      grid-area: Title;
    }
    > ${Client} {
      grid-area: Client;
    }
    > ${Body} {
      grid-area: Body;
      max-width: calc(var(--space) * 8);
    }
    > ${Card} {
      grid-row: initial;
      grid-area: Card;
    }
    > ${Impacts} {
      grid-area: Impacts;
      max-width: calc(var(--space) * 8);
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
      <Body>{item.body}</Body>
      <Card
        src={item.cardVideo.url}
        backText={
          (isEmpty(item.cardBackText) ? null : item.cardBackText) ??
          item.impacts[0]?.body ??
          item.title
        }
      />
      <Impacts>{item.impacts}</Impacts>
      <Techs>{item.techs}</Techs>
    </Wrapper>
  )
}
