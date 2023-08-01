import { fetchContent } from '@/contentful'
import { TWork, TClient, TTech, TImpact } from '@/contentful/types'

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

  return (workCollection.items as TWork[]).map((work) => ({
    ...work,
    client: work.client as TClient,
    // @ts-ignore
    techs: (work.techsCollection?.items || []) as TTech[],
    // @ts-ignore
    impacts: (work.impactsCollection?.items || []) as TImpact[],
  }))
}

export type TWorkItem = Awaited<ReturnType<typeof useWorkItems>>[0]
