import { fetchContent } from '@/contentful'
import { TIntroSection } from '@/contentful/types'

export default async function useIntroSection() {
  const { introSectionCollection } = await fetchContent(/* GraphQL */ `
    query IntroQuery {
      introSectionCollection(limit: 1) {
        items {
          title
          body
          author {
            name
            bio
            photo {
              url
              width
              height
            }
          }
        }
      }
    }
  `)

  return introSectionCollection.items[0] as TIntroSection
}
