'use client'

import styled from 'styled-components'
import Text from '@/components/Text'
import GridSection from '@/components/GridSection'
import WorkItem from '@/components/WorkItem'

import content from './dummyContent.json'

const WORK = content
  .filter((x) => !!x.card)
  .sort((a, b) =>
    a.endDate === b.endDate ? 0 : a.endDate < b.endDate ? 1 : -1
  )

// TODO: better texts
// TODO: lazy load three

const Wrapper = styled(GridSection)`
  position: relative;
  grid-row-gap: calc(var(--col) * 4);
  padding-bottom: calc(var(--col) * 4);
`

const WorkItems = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-gap: max(50vh, calc(var(--col) * 4));
`

export default function Work({ ...restProps }) {
  return (
    <Wrapper {...restProps}>
      <Text.HeadingBlock>
        <Text.Heading2>Recent Work</Text.Heading2>
        <Text.BigParagraph>
          Here&apos;s some of my favorite projects
        </Text.BigParagraph>
      </Text.HeadingBlock>
      <WorkItems>
        {WORK.map((item, i) => (
          <WorkItem key={i}>
            <WorkItem.Title
              altTitle={item.altTitle}
              startDate={item.startDate}
              endDate={item.endDate}
            >
              {item.title}
            </WorkItem.Title>
            <WorkItem.Client {...item.client} />
            <WorkItem.Card
              src={item.card}
              label={item.title}
              labelImageSrc={item.client.logo}
              // TODO: 1st impact to the backside?
            />
            <WorkItem.Tldr>{item.tldr}</WorkItem.Tldr>
            <WorkItem.Impacts>{item.impacts}</WorkItem.Impacts>
            <WorkItem.Techs>{item.techs}</WorkItem.Techs>
          </WorkItem>
        ))}
      </WorkItems>
    </Wrapper>
  )
}
