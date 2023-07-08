import { type FC, type PropsWithChildren } from 'react'
import styled from 'styled-components'
import GridSection from '@/components/GridSection'

import Title from './components/Title'
import Client from './components/Client'
import Card from './components/Card'
import Tldr from './components/Tldr'
import Impacts from './components/Impacts'
import Techs from './components/Techs'

type TWorkItemProps = PropsWithChildren

// WorkItem is a compound component

type TWorkItem = FC<TWorkItemProps> & {
  Title: typeof Title
  Client: typeof Client
  Card: typeof Card
  Tldr: typeof Tldr
  Impacts: typeof Impacts
  Techs: typeof Techs
}

// TODO: grid-template-areas
// ti ti ti ti ti ti ti ti ti __ ca ca ca ca ca ca ca ca ca ca
// cl cl cl cl cl cl cl cl cl __ ca ca ca ca ca ca ca ca ca ca
// tl tl tl tl tl __ __ __ __ __ ca ca ca ca ca ca ca ca ca ca
// im im im im im im im im im __ ca ca ca ca ca ca ca ca ca ca
// te te te te te te te te te __ ca ca ca ca ca ca ca ca ca ca
// hmmm, maybe as css vars ->
// titleArea  = css`grid-column: 1 / 9;`
// cardArea   = css`grid-column: 10 / -1;grid-row: 1 / 6;`
// clientArea = css`grid-column: 1 / 6;`

const Wrapper = styled(GridSection).attrs({ as: 'div' })`
  grid-column: 1 / -1;
  padding-left: 0;
  padding-right: 0;
`
const WorkItem = ((props: TWorkItemProps) => (
  <Wrapper {...props} />
)) as TWorkItem

WorkItem.Title = Title
WorkItem.Client = Client
WorkItem.Card = Card
WorkItem.Tldr = Tldr
WorkItem.Impacts = Impacts
WorkItem.Techs = Techs

export default WorkItem
