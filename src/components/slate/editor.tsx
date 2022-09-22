import { isHotkey } from 'is-hotkey'
import { Editor as SlateEditor, Range } from 'slate'
import { Editable, Slate } from 'slate-react'

import { RenderElement } from './element'
import { HOTKEYS } from './hotkeys'
import { RenderLeaf } from './leaf'
import { Toolbar } from './toolbar'
import { BlockType, CustomElement } from './types'
import { useEditor } from './use-editor'
import { toggleMark } from './utils'

export const Editor = () => {
  const editor = useEditor()

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <Toolbar />
        <Editable
          className="prose dark:prose-invert"
          renderElement={RenderElement}
          renderLeaf={RenderLeaf}
          placeholder="Enter some text..."
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
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event) && editor.selection) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                if (!mark) return
                toggleMark(editor, mark)
              }
            }
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
    children: [
      {
        text: 'This example shows how you can make a hovering menu appear above your content, which you can use to make text '
      },
      { text: 'bold', bold: true },
      { text: ', ' },
      { text: 'italic', italic: true },
      { text: ', or anything else you might want to do!' }
    ]
  },
  {
    id: 'sarasa2',
    type: BlockType.Paragraph,
    children: [
      { text: 'Try it out yourself! Just ' },
      { text: 'select any piece of text and the menu will appear', bold: true },
      { text: '.' }
    ]
  }
]
