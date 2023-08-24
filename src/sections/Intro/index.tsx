import useIntroSection from '@/contentful/hooks/useIntroSection'
import { BigMarkdown } from '@/components/Text'
import Author from '@/components/Author'
import { Wrapper, IntroFooter } from './styled'

// TODO: move hero inside intro section

export default async function Intro({ ...restProps }) {
  const intro = await useIntroSection()

  return (
    <Wrapper {...restProps}>
      <BigMarkdown>{intro.body}</BigMarkdown>
      <IntroFooter>
        <Author>{intro.author}</Author>
      </IntroFooter>
    </Wrapper>
  )
}
