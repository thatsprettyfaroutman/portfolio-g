import useIntro from '@/contentful/hooks/useIntro'
import { BigMarkdown } from '@/components/Text'
import Author from '@/components/Author'
import { Wrapper, IntroFooter } from './styled'

export default async function Intro({ ...restProps }) {
  const intro = await useIntro()

  return (
    <Wrapper {...restProps}>
      <BigMarkdown>{intro.body}</BigMarkdown>
      <IntroFooter>
        <Author>{intro.author}</Author>
      </IntroFooter>
    </Wrapper>
  )
}
