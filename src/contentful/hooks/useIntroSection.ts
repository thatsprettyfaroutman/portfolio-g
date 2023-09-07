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
              title
              url
              width
              height
            }
          }
          brandsTitle
          brands: brandsCollection(limit: 8) {
            items {
              sys {
                id
              }
              title
              url
              width
              height
            }
          }
        }
      }
    }
  `)

  const introSection = introSectionCollection.items[0]

  return {
    ...introSection,
    brands: introSection.brands.items,
  } as TIntroSection
}
