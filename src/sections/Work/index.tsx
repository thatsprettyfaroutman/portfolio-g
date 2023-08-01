import { Heading2, BigParagraph, HeadingBlock } from '@/components/Text'
import WorkItem from '@/components/WorkItem'
import { Wrapper, WorkItems } from './styled'
import useWorkItems from '@/contentful/hooks/useWorkItems'

// TODO: lazy load three

export default async function Work({ ...restProps }) {
  const works = await useWorkItems()

  return (
    <Wrapper {...restProps}>
      {/* TODO: contentful headings */}
      <HeadingBlock>
        <Heading2>Recent Work</Heading2>
        <BigParagraph>Here&apos;s some of my favorite projects</BigParagraph>
      </HeadingBlock>
      <WorkItems>
        {works.map((work) => (
          <WorkItem key={work.sys.id} item={work} />
        ))}
      </WorkItems>
    </Wrapper>
  )
}
