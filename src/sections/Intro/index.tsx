'use client'

import styled from 'styled-components'
import GridSection from '@/components/GridSection'
import { MEDIA } from '@/styles/media'
import ProfilePicture from '@/components/ProfilePicture'
import Text from '@/components/Text'
import { cssMaxWidth as cssProfilePictureMaxWidth } from '@/components/ProfilePicture'

// TODO: get texts via staticProps
// TODO: better texts

const Wrapper = styled(GridSection)`
  padding-top: calc(var(--col) * 2);
  padding-bottom: calc(var(--col) * 2);
  grid-template-rows: auto 1fr;
`

const Picture = styled(ProfilePicture)`
  ${MEDIA.tablet} {
    grid-column: 1 / 6;
  }
  ${MEDIA.desktop} {
    grid-column: 1 / 3;
  }
`

const Info = styled.div`
  display: grid;
  grid-gap: calc(var(--col) / 2);
  align-content: start;

  ${MEDIA.tablet} {
    grid-column: 1 / 7;
  }

  ${MEDIA.desktop} {
    grid-column: 4 / 8;
  }
`

const IntroText = styled.div`
  display: grid;
  align-content: start;

  ${MEDIA.tablet} {
    grid-column: 9 / -1;
    grid-row: 1 / 3;

    // Middle align IntroText with ProfilePicture
    padding-top: calc(
      (
          min(
              // Profile pic col width
              var(--col) * 5,
              // Max profile pic width
              ${cssProfilePictureMaxWidth}
            )
            // BigParagraph size adjustment
          - 24px
        ) / 2
    );
  }

  ${MEDIA.desktop} {
    grid-column: 10 / -2;
    grid-row: 1;
    padding-top: 0;
  }
`

export default function Intro({ ...restProps }) {
  return (
    <Wrapper {...restProps}>
      <Picture />
      <Info>
        <Text.Heading3>Hulabalo Balo</Text.Heading3>
        <Text.ParagraphBlock>
          <Text.Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Graccho,
            eius fere, aequalí? Maximus dolor, inquit, brevis est. Tuo vero id
            quidem, inquam, arbitratu. Que Manilium, ab iisque M. Quod equidem
            non reprehendo;
          </Text.Paragraph>
          <Text.Paragraph>
            Utilitatis causa amicitia est quaesita. Duo Reges: constructio
            interrete. Qualem igitur hominem natura inchoavit? Inquit, dasne
            adolescenti veniam?
          </Text.Paragraph>
        </Text.ParagraphBlock>
      </Info>
      <IntroText>
        <Text.BigParagraphBlock>
          <Text.BigParagraph>
            Quid, quod homines infima fortuna, nulla spe rerum gerendarum,
            opifices denique delectantur historia? Etenim nec iustitia nec
            amicitia esse omnino poterunt, nisi ipsae per se expetuntur. Hunc
            vos beatum; Quae tamen a te agetur non melior, quam illae sunt, quas
            interdum optines. Ubi ut eam caperet aut quando? Si verbum sequimur,
            primum longius verbum praepositum quam bonum.
          </Text.BigParagraph>
        </Text.BigParagraphBlock>
      </IntroText>
    </Wrapper>
  )
}
