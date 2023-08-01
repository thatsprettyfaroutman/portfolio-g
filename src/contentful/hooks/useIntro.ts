import { fetchContent } from '@/contentful'
import { TIntroSection } from '@/contentful/types'

export default async function useIntro() {
  const { introCollection } = await fetchContent(`
  query IntroQuery {
    introCollection(limit:1) {
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

  return introCollection.items[0] as TIntroSection
}
