import { fetchContent } from '@/contentful'
import { TSocialMediaLink } from '@/contentful/types'

export default async function useSocialMediaLinks() {
  const { socialMediaLinkCollection } = await fetchContent(/* GraphQL */ `
    query SocialMediaLinksQuery {
      socialMediaLinkCollection(limit: 5) {
        items {
          sys {
            id
          }
          name
          href
          icon {
            title
            url
            width
            height
          }
        }
      }
    }
  `)

  return socialMediaLinkCollection.items as TSocialMediaLink[]
}
