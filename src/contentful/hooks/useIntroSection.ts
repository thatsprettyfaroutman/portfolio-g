import { fetchContent } from '@/contentful'
import { TIntroSection } from '@/contentful/types'
import addRichAssetPlaceholders from '../lib/addRichAssetPlaceholders'

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
        }
      }
    }
  `)

  return addRichAssetPlaceholders<TIntroSection>(
    introSectionCollection.items[0]
  )
}
