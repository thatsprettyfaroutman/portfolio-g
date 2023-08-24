import { fetchContent } from '@/contentful'
import { TWorkSection } from '@/contentful/types'

export default async function useWorkSection() {
  const { workSectionCollection } = await fetchContent(`
  query WorkQuery {
    workSectionCollection(limit:1) {
      items {
        title
        body
        workItemsCollection(limit: 10) {
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
            cardBackText
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
    }
  }
`)

  const workSection = workSectionCollection.items[0]
  workSection.workItems = workSection.workItemsCollection.items.map(
    (work: Record<string, unknown>) => ({
      ...work,
      client: work.client,
      // @ts-ignore
      techs: work.techsCollection?.items || [],
      // @ts-ignore
      impacts: work.impactsCollection?.items || [],
    })
  )

  return workSection as TWorkSection
}
