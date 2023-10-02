import useIntroSection from '@/contentful/hooks/useIntroSection'
import Drawer from './components/Drawer/lazy'
import { Wrapper } from './styled'

type TProfileDrawerProps = {}

export default async function ProfileDrawer({
  ...restProps
}: TProfileDrawerProps) {
  const { author } = await useIntroSection()

  return (
    <Wrapper {...restProps}>
      <Drawer profile={author} />
    </Wrapper>
  )
}
