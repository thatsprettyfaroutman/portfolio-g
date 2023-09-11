import { ReactNode } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { type Node, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import Emoji from '@/components/Emoji'
import ImageList from '@/components/ImageList'
import { ListItem, MediumParagraph, UnorderedList } from '@/components/Text'
import { TDocument, TEmoji, TImageList } from '@/contentful/types'

export type TRichTextProps = {
  children: TDocument
}

export const getRichTextOptions = (links: TDocument['links']) => {
  const blockEntryMap = new Map<string, TImageList>()
  const inlineEntryMap = new Map<string, TEmoji>()

  if (links?.entries?.block) {
    for (const entry of links.entries.block) {
      if (entry) {
        blockEntryMap.set(entry.sys.id, entry)
      }
    }
  }

  if (links?.entries?.inline) {
    for (const entry of links.entries.inline) {
      if (entry) {
        inlineEntryMap.set(entry.sys.id, entry)
      }
    }
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (children: ReactNode) => <strong>{children}</strong>,
    },
    renderNode: {
      [BLOCKS.UL_LIST]: (node: Node, children: ReactNode) => (
        <UnorderedList>{children}</UnorderedList>
      ),
      [BLOCKS.LIST_ITEM]: (node: Node, children: ReactNode) => (
        <ListItem>{children}</ListItem>
      ),
      [BLOCKS.PARAGRAPH]: (node: Node, children: ReactNode) => (
        <MediumParagraph>{children}</MediumParagraph>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        const entry = blockEntryMap.get(node.data.target.sys.id)
        switch (entry?.__typename) {
          case 'ImageList':
            return <ImageList>{entry}</ImageList>
        }

        return null
      },
      [INLINES.EMBEDDED_ENTRY]: (node: Node) => {
        const entry = inlineEntryMap.get(node.data.target.sys.id)
        switch (entry?.__typename) {
          case 'Emoji':
            return <Emoji>{entry}</Emoji>
        }

        return null
      },
    },
  }
}

const RichText = ({ children }: TRichTextProps) => {
  return documentToReactComponents(
    // @ts-ignore Type should be correct 🤔
    children.json,
    getRichTextOptions(children.links)
  )
}

export default RichText
