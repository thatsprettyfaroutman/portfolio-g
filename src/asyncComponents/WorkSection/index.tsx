import Brands from '@/asyncComponents/Brands'
import WorkItem from '@/components/WorkItem'
import useWorkSection from '@/contentful/hooks/useWorkSection'
import { Wrapper, WorkItems } from './styled'

export default async function WorkSection({ ...restProps }) {
  const workSection = await useWorkSection()

  return (
    <Wrapper {...restProps} id="work">
      <Brands />
      <WorkItems>
        {workSection.workItems.map((work) => (
          <WorkItem key={work.sys.id} item={work} />
        ))}
      </WorkItems>
    </Wrapper>
  )
}
