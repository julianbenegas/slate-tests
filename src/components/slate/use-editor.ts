import * as React from 'react'
import { createEditor, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'

import { CreateNewBlockFromBlock } from './element/block'
import { BlockType, CustomElement } from './types'
import { makeNodeId, withNodeId, withShortcuts } from './utils'

export const useEditor = () => {
  const editor = React.useMemo(
    () => withShortcuts(withNodeId(withHistory(withReact(createEditor())))),
    []
  )
  React.useEffect(() => {
    const { insertBreak } = editor
    // Override editor to insert paragraph or element after inserting new line
    editor.insertBreak = () => {
      if (editor.selection) {
        const previousBlock = editor.children[
          editor.selection.anchor.path[0] ?? 0
        ] as CustomElement

        let newBlock

        // Default paragraph new line
        const paragraphBlock: CustomElement = {
          type: BlockType.Paragraph,
          children: [{ text: '' }],
          id: makeNodeId()
        }

        // If caret at position 0, convert previous block to empty paragraph
        if (editor.selection.anchor.offset === 0) {
          Transforms.setNodes(editor, paragraphBlock, {
            at: editor.selection
          })

          // Pass state of old block to new block
          newBlock = previousBlock
        }

        // Create different current element on new line if set in Block.tsx
        if (
          !newBlock &&
          previousBlock?.type &&
          Object.keys(CreateNewBlockFromBlock).includes(previousBlock?.type)
        ) {
          newBlock = CreateNewBlockFromBlock[previousBlock.type]?.()
        }

        if (!newBlock) {
          newBlock = paragraphBlock
        }

        insertBreak()
        Transforms.setNodes(editor, newBlock as any, {
          at: editor.selection
        })
      } else {
        insertBreak()
      }
    }
  }, [editor])

  return editor
}
