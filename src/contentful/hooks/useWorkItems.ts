import { fetchContent } from '@/contentful'
import { TWorkItem } from '@/contentful/types'

export default async function useWorkItems() {
  const { workCollection } = await fetchContent(`
  query WorkQuery {
    workCollection {
      items {
        sys {
          id
        }
        title
        altTitle
        startDate
        endDate
        tldr
        client {
          name
          logoMap {
            url
          }
        }
        cardVideo {
          url
        }
        techsCollection(limit: 20) {
          items {
            sys {
              id
            }
            name
            icon {
              url
            }
          }
        }
        impactsCollection(limit: 10) {
          items {
            sys {
              id
            }
            body
          }
        }
      }
    }
  }
  
`)

  return workCollection.items.map((work: Record<string, unknown>) => ({
    ...work,
    client: work.client,
    // @ts-ignore
    techs: work.techsCollection?.items || [],
    // @ts-ignore
    impacts: work.impactsCollection?.items || [],
  })) as TWorkItem
}
