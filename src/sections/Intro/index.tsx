import useIntro from '@/contentful/hooks/useIntro'
import {
  Heading3,
  Paragraph,
  ParagraphBlock,
  BigMarkdown,
} from '@/components/Text'
import { Wrapper, Picture, Info, IntroText } from './styled'

export default async function Intro({ ...restProps }) {
  const intro = await useIntro()

  return (
    <Wrapper {...restProps}>
      <Picture />
      {/* TODO: Author component */}
      <Info>
        <Heading3>Hulabalo Balo</Heading3>
        <ParagraphBlock allowEndBleed>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Graccho,
            eius fere, aequalí? Maximus dolor, inquit, brevis est. Tuo vero id
            quidem, inquam, arbitratu. Que Manilium, ab iisque M. Quod equidem
            non reprehendo;
          </Paragraph>
          <Paragraph>
            Utilitatis causa amicitia est quaesita. Duo Reges: constructio
            interrete. Qualem igitur hominem natura inchoavit? Inquit, dasne
            adolescenti veniam?
          </Paragraph>
        </ParagraphBlock>
      </Info>
      <IntroText>
        <BigMarkdown>{intro.body}</BigMarkdown>
      </IntroText>
    </Wrapper>
  )
}
