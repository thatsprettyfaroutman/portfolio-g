'use client'

import styled from 'styled-components'
import { MEDIA } from '@/styles/media'
import GridSection from '@/components/GridSection'
import ProfilePicture from '@/components/ProfilePicture'
import { cssMaxWidth as cssProfilePictureMaxWidth } from '@/components/ProfilePicture'

export const Wrapper = styled(GridSection)`
  padding-top: calc(var(--col) * 2);
  padding-bottom: calc(var(--col) * 4);
  grid-template-rows: auto 1fr;
`

export const Picture = styled(ProfilePicture)`
  ${MEDIA.tablet} {
    grid-column: 1 / 6;
  }
  ${MEDIA.desktop} {
    grid-column: 1 / 3;
  }
`

export const Info = styled.div`
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

export const IntroText = styled.div`
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
    grid-column: 10 / -1;
    grid-row: 1;
    padding-top: 0;
  }
`
