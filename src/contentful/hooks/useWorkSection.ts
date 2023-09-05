import { fetchContent } from '@/contentful'
import { TWorkSection } from '@/contentful/types'
import addRichAssetPlaceholders from '../lib/addRichAssetPlaceholders'

export default async function useWorkSection() {
  const { workSectionCollection } = await fetchContent(/* GraphQL */ `
    query WorkQuery {
      workSectionCollection(limit: 1) {
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
              body {
                json
                links {
                  entries {
                    block {
                      __typename
                      sys {
                        id
                      }
                      ... on ImageList {
                        images: imagesCollection(limit: 5) {
                          items {
                            sys {
                              id
                            }
                            title
                            url(
                              transform: {
                                width: 2000
                                format: JPG_PROGRESSIVE
                              }
                            )
                            width
                            height
                          }
                        }
                      }
                    }
                    inline {
                      __typename
                      sys {
                        id
                      }
                      ... on Emoji {
                        emojiImage {
                          sys {
                            id
                          }
                          title
                          url(transform: { width: 128 })
                          width
                          height
                        }
                      }
                    }
                  }
                }
              }
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

  return addRichAssetPlaceholders<TWorkSection>(workSection)
}
