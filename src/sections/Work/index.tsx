import { Heading2, BigParagraph } from '@/components/Text'
import WorkItem from '@/components/WorkItem'
import { Wrapper, Head, WorkItems } from './styled'
import useWorkSection from '@/contentful/hooks/useWorkSection'

export default async function Work({ ...restProps }) {
  const workSection = await useWorkSection()

  return (
    <Wrapper {...restProps}>
      <Head>
        <Heading2>{workSection.title}</Heading2>
        {workSection.body && <BigParagraph>{workSection.body}</BigParagraph>}
      </Head>
      <WorkItems>
        {workSection.workItems.map((work) => (
          <WorkItem key={work.sys.id} item={work} />
        ))}
      </WorkItems>
    </Wrapper>
  )
}
