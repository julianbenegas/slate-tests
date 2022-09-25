import { Editor as SlateEditor, Range } from 'slate'
import { Editable, Slate } from 'slate-react'

import { BlockMenu } from './block-menu'
import { RenderElement } from './element'
import { handleHotkeysOnKeyDown } from './hotkeys'
import { RenderLeaf } from './leaf'
import { Toolbar } from './toolbar'
import { BlockType, CustomElement } from './types'
import { useEditor } from './use-editor'

export const Editor = () => {
  const editor = useEditor()

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <Toolbar />
        <BlockMenu />
        <Editable
          className="prose dark:prose-invert"
          renderElement={RenderElement}
          renderLeaf={RenderLeaf}
          /**
           * Inspired by this great article from https://twitter.com/_jkrsp
           * https://jkrsp.com/slate-js-placeholder-per-line/
           **/
          decorate={([node, path]) => {
            if (editor.selection != null) {
              if (
                !SlateEditor.isEditor(node) &&
                SlateEditor.string(editor, [path[0] ?? 0]) === '' &&
                Range.includes(editor.selection, path) &&
                Range.isCollapsed(editor.selection)
              ) {
                return [
                  {
                    ...editor.selection,
                    placeholder: 'Type something here…'
                  }
                ]
              }
            }

            return []
          }}
          onKeyDown={(event) => {
            handleHotkeysOnKeyDown(event, editor)
          }}
        />
      </Slate>
    </div>
  )
}

const initialValue: CustomElement[] = [
  {
    id: 'sarasa',
    type: BlockType.Paragraph,
    children: [{ text: '' }]
  }
]
